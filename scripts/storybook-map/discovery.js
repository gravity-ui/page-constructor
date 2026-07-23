const path = require('path');

const ts = require('typescript');

const PUBLIC_BARRELS = [
    {relativePath: 'src/blocks/index.ts', kind: 'block'},
    {relativePath: 'src/sub-blocks/index.ts', kind: 'sub-block'},
    {relativePath: 'src/components/index.ts', kind: 'component'},
];

function createProgram(repoRoot) {
    const configPath = path.join(repoRoot, 'tsconfig.json');
    const config = ts.readConfigFile(configPath, ts.sys.readFile);

    if (config.error) {
        throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'));
    }

    const parsedConfig = ts.parseJsonConfigFileContent(
        config.config,
        ts.sys,
        repoRoot,
        undefined,
        configPath,
    );

    if (parsedConfig.errors.length > 0) {
        throw new Error(
            parsedConfig.errors
                .map((error) => ts.flattenDiagnosticMessageText(error.messageText, '\n'))
                .join('\n'),
        );
    }

    return ts.createProgram({
        options: parsedConfig.options,
        projectReferences: parsedConfig.projectReferences,
        rootNames: parsedConfig.fileNames,
    });
}

function unwrapExpression(node) {
    let current = node;
    while (
        ts.isAsExpression(current) ||
        ts.isTypeAssertionExpression(current) ||
        ts.isParenthesizedExpression(current) ||
        ts.isSatisfiesExpression(current)
    ) {
        current = current.expression;
    }
    return current;
}

function canonicalSymbol(checker, nodeOrSymbol) {
    let symbol =
        nodeOrSymbol && typeof nodeOrSymbol.kind === 'number'
            ? checker.getSymbolAtLocation(nodeOrSymbol)
            : nodeOrSymbol;
    const visited = new Set();

    while (symbol && !visited.has(symbol)) {
        visited.add(symbol);

        if (symbol.flags === ts.SymbolFlags.Alias) {
            const aliased = checker.getAliasedSymbol(symbol);
            if (aliased && aliased !== symbol) {
                symbol = aliased;
                continue;
            }
        }

        const declaration = symbol.valueDeclaration || symbol.declarations?.[0];
        if (
            declaration &&
            ts.isExportAssignment(declaration) &&
            !declaration.isExportEquals &&
            ts.isIdentifier(unwrapExpression(declaration.expression))
        ) {
            const identifierSymbol = checker.getSymbolAtLocation(
                unwrapExpression(declaration.expression),
            );
            if (identifierSymbol && identifierSymbol !== symbol) {
                symbol = identifierSymbol;
                continue;
            }
        }

        return symbol;
    }

    return undefined;
}

function getCanonicalDeclaration(symbol) {
    return symbol.valueDeclaration || symbol.declarations?.[0];
}

function isTypeOnlyExport(symbol) {
    return Boolean(
        symbol.declarations?.some((declaration) => {
            if (ts.isExportSpecifier(declaration)) {
                const exportDeclaration = declaration.parent.parent;
                return declaration.isTypeOnly || exportDeclaration.isTypeOnly;
            }
            return ts.isExportDeclaration(declaration) && declaration.isTypeOnly;
        }),
    );
}

function isProductionFile(fileName, repoRoot) {
    const sourceDirectory = path.join(repoRoot, 'src');
    const relativePath = path.relative(sourceDirectory, fileName).replace(/\\/g, '/');
    return (
        relativePath !== '' &&
        !relativePath.startsWith('../') &&
        !path.isAbsolute(relativePath) &&
        !/(^|\/)(__stories__|__tests__|__fixtures__|stories|tests|fixtures)(\/|$)/.test(
            relativePath,
        ) &&
        !/\.(stories|story|test|spec)\.[^.]+$/.test(relativePath)
    );
}

function discoverSignificantElements(program, repoRoot) {
    const checker = program.getTypeChecker();
    const significant = [];
    const implementationOwners = new Map();

    for (const {relativePath, kind} of PUBLIC_BARRELS) {
        const barrelPath = path.join(repoRoot, relativePath);
        const sourceFile = program.getSourceFile(barrelPath);
        if (!sourceFile) throw new Error(`${relativePath}: designated public barrel is required`);

        const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
        if (!moduleSymbol) throw new Error(`${relativePath}: module exports could not be resolved`);

        for (const exportSymbol of checker.getExportsOfModule(moduleSymbol)) {
            if (isTypeOnlyExport(exportSymbol)) continue;

            const symbol = canonicalSymbol(checker, exportSymbol);
            if (!symbol) {
                throw new Error(
                    `${relativePath}: runtime export ${exportSymbol.name} could not be resolved`,
                );
            }

            // eslint-disable-next-line no-bitwise
            if (!(symbol.flags & ts.SymbolFlags.Value)) continue;

            const declaration = getCanonicalDeclaration(symbol);
            if (!declaration) {
                throw new Error(
                    `${relativePath}: runtime export ${exportSymbol.name} could not be resolved`,
                );
            }
            if (!isProductionFile(declaration.getSourceFile().fileName, repoRoot)) {
                throw new Error(
                    `${relativePath}: runtime export ${exportSymbol.name} is not production source`,
                );
            }

            const identity = `${kind}:${exportSymbol.name}`;
            const previous = implementationOwners.get(symbol);
            if (previous) {
                throw new Error(
                    `${relativePath}: ${identity} resolves to the same implementation as ${previous}`,
                );
            }
            implementationOwners.set(symbol, identity);
            significant.push({
                id: identity,
                kind,
                exportName: exportSymbol.name,
                label: exportSymbol.name,
                symbol,
            });
        }
    }

    const kindOrder = {block: 0, 'sub-block': 1, component: 2};
    return significant.sort(
        (left, right) =>
            kindOrder[left.kind] - kindOrder[right.kind] || left.label.localeCompare(right.label),
    );
}

module.exports = {canonicalSymbol, createProgram, discoverSignificantElements};
