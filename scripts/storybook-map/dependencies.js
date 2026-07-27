const path = require('path');

const ts = require('typescript');

const {canonicalSymbol} = require('./discovery');

function getDeclaration(symbol) {
    return symbol.valueDeclaration || symbol.declarations?.[0];
}

function isWithinDirectory(fileName, directory) {
    const relativePath = path.relative(directory, fileName);
    return (
        relativePath === '' ||
        (!relativePath.startsWith(`..${path.sep}`) && !path.isAbsolute(relativePath))
    );
}

function isProductionFile(fileName, repoRoot) {
    if (!isWithinDirectory(fileName, repoRoot)) return false;

    const relativePath = path.relative(repoRoot, fileName).replace(/\\/g, '/');
    return (
        !/(^|\/)node_modules(\/|$)/.test(relativePath) &&
        !/(^|\/)(__stories__|__tests__|__fixtures__|stories|tests|fixtures)(\/|$)/.test(
            relativePath,
        ) &&
        !/\.(stories|story|test|spec)\.[^.]+$/.test(relativePath)
    );
}

function containsJsx(node) {
    let found = false;

    function visit(current) {
        if (found) return;
        if (
            ts.isJsxElement(current) ||
            ts.isJsxSelfClosingElement(current) ||
            ts.isJsxFragment(current)
        ) {
            found = true;
            return;
        }
        ts.forEachChild(current, visit);
    }

    visit(node);
    return found;
}

function isFunctionLike(node) {
    return (
        ts.isArrowFunction(node) ||
        ts.isFunctionDeclaration(node) ||
        ts.isFunctionExpression(node) ||
        ts.isMethodDeclaration(node) ||
        ts.isGetAccessorDeclaration(node) ||
        ts.isSetAccessorDeclaration(node)
    );
}

function getJsxTagRoot(tagName) {
    let root = tagName;
    while (ts.isPropertyAccessExpression(root)) root = root.expression;
    return root;
}

function buildEdges(program, repoRoot, components) {
    const checker = program.getTypeChecker();
    const significantBySymbol = new Map();
    const edges = new Map();

    for (const component of components) {
        const symbol = canonicalSymbol(checker, component.symbol);
        if (symbol) significantBySymbol.set(symbol, component);
    }

    function addEdge(source, target) {
        if (source.id === target.id) return;
        const key = `${source.id}\0${target.id}`;
        edges.set(key, {source: source.id, target: target.id});
    }

    function isRepositorySymbol(symbol) {
        const declaration = getDeclaration(symbol);
        return Boolean(
            declaration && isProductionFile(declaration.getSourceFile().fileName, repoRoot),
        );
    }

    function canIgnoreUnresolvedJsxTag(tagName) {
        if (ts.isJsxNamespacedName(tagName)) return true;

        if (ts.isIdentifier(tagName) && /^[a-z]/.test(tagName.text)) return true;

        const root = getJsxTagRoot(tagName);
        const rootSymbol = canonicalSymbol(checker, root);
        return Boolean(rootSymbol && getDeclaration(rootSymbol) && !isRepositorySymbol(rootSymbol));
    }

    function followSymbol(nodeOrSymbol, root, visited) {
        const symbol = canonicalSymbol(checker, nodeOrSymbol);
        if (!symbol || !getDeclaration(symbol)) {
            if (typeof nodeOrSymbol.kind === 'number' && !canIgnoreUnresolvedJsxTag(nodeOrSymbol)) {
                const sourcePath = path
                    .relative(repoRoot, nodeOrSymbol.getSourceFile().fileName)
                    .replace(/\\/g, '/');
                throw new Error(
                    `${sourcePath}: JSX component reference "${nodeOrSymbol.getText()}" could not be resolved; check its import or export`,
                );
            }
            return false;
        }

        const significant = significantBySymbol.get(symbol);
        if (significant) {
            addEdge(root, significant);
            return true;
        }

        if (visited.has(symbol) || !isRepositorySymbol(symbol)) return false;
        visited.add(symbol);
        walkDeclaration(symbol, root, visited);
        return false;
    }

    function followRenderHelper(nodeOrSymbol, root, visited) {
        const symbol = canonicalSymbol(checker, nodeOrSymbol);
        if (!symbol) return false;
        if (significantBySymbol.has(symbol)) return followSymbol(symbol, root, visited);
        if (visited.has(symbol)) return false;

        const declaration = getDeclaration(symbol);
        if (
            !declaration ||
            !containsJsx(declaration) ||
            !isProductionFile(declaration.getSourceFile().fileName, repoRoot)
        ) {
            return false;
        }

        visited.add(symbol);
        walkDeclaration(symbol, root, visited);
        return false;
    }

    function walkFunction(functionNode, root, visited) {
        if (functionNode.body) walkNode(functionNode.body, root, visited);
    }

    function walkDeclaration(symbol, root, visited) {
        const declaration = getDeclaration(symbol);
        if (!declaration) return;

        if (
            ts.isVariableDeclaration(declaration) ||
            ts.isPropertyAssignment(declaration) ||
            ts.isExportAssignment(declaration)
        ) {
            const initializer = ts.isExportAssignment(declaration)
                ? declaration.expression
                : declaration.initializer;
            if (initializer) {
                if (isFunctionLike(initializer)) {
                    walkFunction(initializer, root, visited);
                } else {
                    walkNode(initializer, root, visited);
                }
            }
            return;
        }

        if (isFunctionLike(declaration)) {
            walkFunction(declaration, root, visited);
            return;
        }

        if (ts.isClassDeclaration(declaration) || ts.isClassExpression(declaration)) {
            for (const member of declaration.members) {
                if (ts.isMethodDeclaration(member) && member.name?.getText() === 'render') {
                    walkFunction(member, root, visited);
                }
            }
            return;
        }

        walkNode(declaration, root, visited);
    }

    function walkJsxChildren(children, root, visited) {
        for (const child of children) {
            if (ts.isJsxExpression(child)) {
                if (child.expression) walkNode(child.expression, root, visited);
            } else if (
                ts.isJsxElement(child) ||
                ts.isJsxSelfClosingElement(child) ||
                ts.isJsxFragment(child)
            ) {
                walkNode(child, root, visited);
            }
        }
    }

    function isCallbackArgument(call, argumentIndex) {
        const signature = checker.getResolvedSignature(call);
        const parameters = signature?.getParameters() || [];
        let parameter = parameters[argumentIndex];

        if (!parameter && parameters.length > 0) {
            const lastParameter = parameters.at(-1);
            const declaration = getDeclaration(lastParameter);
            if (declaration && ts.isParameter(declaration) && declaration.dotDotDotToken) {
                parameter = lastParameter;
            }
        }

        if (!parameter) return false;

        const declaration = getDeclaration(parameter);
        let parameterType = checker.getTypeOfSymbolAtLocation(parameter, call);
        if (declaration && ts.isParameter(declaration) && declaration.dotDotDotToken) {
            parameterType =
                checker.getIndexTypeOfType(parameterType, ts.IndexKind.Number) || parameterType;
        }
        if (parameterType.flags === ts.TypeFlags.Any) return false;

        return (
            checker.getSignaturesOfType(
                checker.getNonNullableType(parameterType),
                ts.SignatureKind.Call,
            ).length > 0
        );
    }

    function walkCall(call, root, visited) {
        followRenderHelper(call.expression, root, visited);

        for (const [argumentIndex, argument] of call.arguments.entries()) {
            if (isFunctionLike(argument)) {
                if (isCallbackArgument(call, argumentIndex)) {
                    walkFunction(argument, root, visited);
                }
            } else if (
                ts.isIdentifier(argument) ||
                ts.isPropertyAccessExpression(argument) ||
                ts.isElementAccessExpression(argument)
            ) {
                if (isCallbackArgument(call, argumentIndex)) {
                    followRenderHelper(argument, root, visited);
                }
            } else {
                walkNode(argument, root, visited);
            }
        }
    }

    function walkNode(node, root, visited) {
        if (ts.isJsxElement(node)) {
            followSymbol(node.openingElement.tagName, root, visited);
            walkJsxChildren(node.children, root, visited);
            return;
        }

        if (ts.isJsxSelfClosingElement(node)) {
            followSymbol(node.tagName, root, visited);
            return;
        }

        if (ts.isJsxFragment(node)) {
            walkJsxChildren(node.children, root, visited);
            return;
        }

        if (ts.isCallExpression(node)) {
            walkCall(node, root, visited);
            return;
        }

        ts.forEachChild(node, (child) => {
            if (!isFunctionLike(child)) walkNode(child, root, visited);
        });
    }

    for (const component of components) {
        const rootSymbol = canonicalSymbol(checker, component.symbol);
        if (!rootSymbol) continue;

        const visited = new Set([rootSymbol]);
        walkDeclaration(rootSymbol, component, visited);
    }

    return [...edges.values()].sort(
        (left, right) =>
            left.source.localeCompare(right.source) || left.target.localeCompare(right.target),
    );
}

module.exports = {buildEdges};
