#!/usr/bin/env node
/**
 * Анализатор import-зависимостей (упрощённая версия без glob)
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');

const IMPORT_PATTERNS = [
    /import\s+.*?\s+from\s+['"]([^'"]+)['"];?/g,
    /import\s+['"]([^'"]+)['"];?/g,
    /export\s+.*?\s+from\s+['"]([^'"]+)['"];?/g,
];

function findFiles(dir, files = []) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (
                item === 'node_modules' ||
                item === 'build' ||
                item === 'dist' ||
                item === '__stories__' ||
                item === '__tests__' ||
                item === 'demo'
            ) {
                continue;
            }
            findFiles(fullPath, files);
        } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
            if (!item.includes('.test.') && !item.includes('.spec.') && !item.endsWith('.d.ts')) {
                files.push(fullPath);
            }
        }
    }
    return files;
}

function resolveImport(sourcePath, importPath) {
    if (
        importPath.endsWith('.scss') ||
        importPath.endsWith('.css') ||
        importPath.endsWith('.sass') ||
        importPath.endsWith('.less')
    ) {
        return null;
    }

    if (!importPath.startsWith('.') && !importPath.startsWith('src/')) {
        return {type: 'external', path: importPath};
    }

    let resolved;
    if (importPath.startsWith('src/')) {
        resolved = path.join(PROJECT_ROOT, importPath);
    } else {
        resolved = path.resolve(path.dirname(sourcePath), importPath);
    }

    const extensions = ['.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js'];

    for (const ext of extensions) {
        const fullPath = resolved + ext;
        if (fs.existsSync(fullPath)) {
            return {type: 'internal', path: path.relative(PROJECT_ROOT, fullPath)};
        }
    }

    return {type: 'internal', path: path.relative(PROJECT_ROOT, resolved)};
}

function parseImports(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const imports = new Set();

    for (const pattern of IMPORT_PATTERNS) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
            const importPath = match[1];
            const resolved = resolveImport(filePath, importPath);
            if (resolved) {
                imports.add(JSON.stringify(resolved));
            }
        }
    }

    return Array.from(imports).map((i) => JSON.parse(i));
}

function analyze() {
    console.log('🔍 Scanning files...');
    const files = findFiles(SRC_DIR);
    console.log(`📁 Found ${files.length} files`);

    const nodes = new Map();
    const edges = [];
    const externalDeps = new Set();

    for (const file of files) {
        const relativePath = path.relative(PROJECT_ROOT, file);
        const dir = path.dirname(relativePath);
        const category = dir.split('/')[1] || 'other';

        nodes.set(relativePath, {
            id: relativePath,
            path: relativePath,
            category,
            name: path.basename(relativePath, path.extname(relativePath)),
            imports: [],
        });

        const imports = parseImports(file);
        for (const imp of imports) {
            if (imp.type === 'external') {
                externalDeps.add(imp.path);
            } else {
                const targetPath = path.join(PROJECT_ROOT, imp.path);
                const exists =
                    fs.existsSync(targetPath) ||
                    fs.existsSync(targetPath + '.ts') ||
                    fs.existsSync(targetPath + '.tsx');

                if (exists) {
                    const targetRel = path.relative(PROJECT_ROOT, targetPath);
                    if (
                        nodes.has(targetRel) ||
                        files.some((f) => path.relative(PROJECT_ROOT, f) === targetRel)
                    ) {
                        edges.push({source: relativePath, target: imp.path});
                        nodes.get(relativePath).imports.push(imp.path);
                    }
                }
            }
        }
    }

    console.log(`📊 ${nodes.size} nodes, ${edges.length} edges`);
    return {nodes: Array.from(nodes.values()), edges, externalDeps: Array.from(externalDeps)};
}

function generateHTML(data) {
    const categories = [...new Set(data.nodes.map((n) => n.category))];
    const categoryColors = {
        blocks: '#FF6B6B',
        subBlocks: '#4ECDC4',
        components: '#45B7D1',
        editor: '#96CEB4',
        'editor-v2': '#96CEB4',
        containers: '#FFEAA7',
        models: '#DDA0DD',
        hooks: '#98D8C8',
        common: '#F7DC6F',
        navigation: '#BB8FCE',
        form: '#85C1E9',
        schema: '#F8C471',
        other: '#AAB7B8',
    };

    const totalImports = data.edges.length;
    const cycles = [];

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Import Dependencies - Page Constructor</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #1a1a2e;
            color: #fff;
            overflow: hidden;
        }
        #app { display: flex; height: 100vh; }
        #sidebar {
            width: 320px;
            background: #16213e;
            border-right: 1px solid #0f3460;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        #graph { flex: 1; position: relative; }
        .header { padding: 20px; border-bottom: 1px solid #0f3460; }
        .header h1 { font-size: 18px; margin-bottom: 12px; color: #e94560; }
        .stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        .stat { background: #0f3460; padding: 10px; border-radius: 6px; text-align: center; }
        .stat-value { font-size: 24px; font-weight: bold; color: #e94560; }
        .stat-label { font-size: 11px; color: #8b9dc3; margin-top: 4px; }
        .search-section { padding: 15px 20px; border-bottom: 1px solid #0f3460; }
        .search-input {
            width: 100%;
            padding: 10px 14px;
            border: 1px solid #0f3460;
            border-radius: 6px;
            background: #0f3460;
            color: #fff;
            font-size: 14px;
        }
        .search-input:focus { outline: none; border-color: #e94560; }
        .filters { padding: 15px 20px; flex: 1; overflow-y: auto; }
        .filters h3 { font-size: 13px; text-transform: uppercase; color: #8b9dc3; margin-bottom: 12px; }
        .category-filter {
            display: flex;
            align-items: center;
            padding: 8px 0;
            cursor: pointer;
            transition: opacity 0.2s;
        }
        .category-filter:hover { opacity: 0.8; }
        .category-filter.inactive { opacity: 0.4; }
        .category-color { width: 12px; height: 12px; border-radius: 3px; margin-right: 10px; }
        .category-name { flex: 1; font-size: 13px; }
        .category-count { font-size: 12px; color: #8b9dc3; }
        .graph-container { width: 100%; height: 100%; }
        .node { cursor: pointer; }
        .node:hover { filter: brightness(1.2); }
        .node.dimmed { opacity: 0.2; }
        .link {
            fill: none;
            stroke: #4a5568;
            stroke-opacity: 0.3;
        }
        .link.highlighted { stroke: #e94560; stroke-opacity: 0.8; stroke-width: 2px; }
        .link.dimmed { stroke-opacity: 0.05; }
        .node-label {
            font-size: 10px;
            fill: #fff;
            pointer-events: none;
            text-shadow: 0 1px 3px rgba(0,0,0,0.8);
        }
        .controls {
            position: absolute;
            bottom: 20px;
            right: 20px;
            display: flex;
            gap: 8px;
        }
        .control-btn {
            background: #16213e;
            border: 1px solid #0f3460;
            color: #fff;
            padding: 10px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
        }
        .control-btn:hover { background: #0f3460; border-color: #e94560; }
    </style>
</head>
<body>
    <div id="app">
        <div id="sidebar">
            <div class="header">
                <h1>📦 Import Graph</h1>
                <div class="stats">
                    <div class="stat">
                        <div class="stat-value">${data.nodes.length}</div>
                        <div class="stat-label">Files</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${totalImports}</div>
                        <div class="stat-label">Imports</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${cycles.length}</div>
                        <div class="stat-label">Cycles</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${categories.length}</div>
                        <div class="stat-label">Categories</div>
                    </div>
                </div>
            </div>
            <div class="search-section">
                <input type="text" class="search-input" id="searchInput" placeholder="Search files...">
            </div>
            <div class="filters">
                <h3>Categories</h3>
                <div id="categoryFilters"></div>
            </div>
        </div>
        <div id="graph">
            <svg class="graph-container" id="graphSvg"></svg>
            <div class="controls">
                <button class="control-btn" id="resetBtn">Reset View</button>
                <button class="control-btn" id="exportBtn">Export JSON</button>
            </div>
        </div>
    </div>

    <script>
        const nodes = ${JSON.stringify(data.nodes)};
        const edges = ${JSON.stringify(data.edges)};
        const categories = ${JSON.stringify(categories)};
        const categoryColors = ${JSON.stringify(categoryColors)};

        let activeCategories = new Set(categories);
        let selectedNode = null;

        const svg = d3.select('#graphSvg');
        const width = document.getElementById('graph').clientWidth;
        const height = document.getElementById('graph').clientHeight;
        svg.attr('viewBox', [0, 0, width, height]);

        const g = svg.append('g');
        const zoom = d3.zoom()
            .scaleExtent([0.1, 4])
            .on('zoom', (e) => g.attr('transform', e.transform));
        svg.call(zoom);

        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(edges).id(d => d.id).distance(80))
            .force('charge', d3.forceManyBody().strength(-200))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(30));

        // Build lookup map
        const nodeById = new Map(nodes.map(n => [n.id, n]));

        // Validate edges - only include if target exists
        const validEdges = edges.filter(e => nodeById.has(e.target));
        edges.length = 0;
        edges.push(...validEdges);

        const link = g.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(edges)
            .join('line')
            .attr('class', 'link');

        const node = g.append('g')
            .attr('class', 'nodes')
            .selectAll('g')
            .data(nodes)
            .join('g')
            .attr('class', 'node')
            .call(d3.drag()
                .on('start', (e, d) => {
                    if (!e.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                })
                .on('drag', (e, d) => {
                    d.fx = e.x;
                    d.fy = e.y;
                })
                .on('end', (e, d) => {
                    if (!e.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                }));

        node.append('circle')
            .attr('r', d => Math.sqrt(d.imports.length + 1) * 5 + 3)
            .attr('fill', d => categoryColors[d.category] || '#AAB7B8')
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.5);

        node.append('text')
            .attr('class', 'node-label')
            .attr('dx', 12)
            .attr('dy', 4)
            .text(d => d.name)
            .style('opacity', d => d.imports.length > 5 ? 1 : 0);

        node.on('click', (e, d) => {
            e.stopPropagation();
            selectNode(d);
        });

        svg.on('click', () => {
            selectedNode = null;
            updateHighlight();
        });

        function selectNode(d) {
            selectedNode = d;
            updateHighlight();
        }

        function updateHighlight() {
            if (!selectedNode) {
                node.classed('dimmed', false);
                link.classed('highlighted', false).classed('dimmed', false);
                return;
            }

            const connected = new Set([selectedNode.id]);
            const highlightedEdges = new Set();

            edges.forEach((e, i) => {
                const sourceId = typeof e.source === 'object' ? e.source.id : e.source;
                const targetId = typeof e.target === 'object' ? e.target.id : e.target;
                if (sourceId === selectedNode.id) {
                    connected.add(targetId);
                    highlightedEdges.add(i);
                }
                if (targetId === selectedNode.id) {
                    connected.add(sourceId);
                    highlightedEdges.add(i);
                }
            });

            node.classed('dimmed', d => !connected.has(d.id));
            link.classed('highlighted', (d, i) => highlightedEdges.has(i))
                .classed('dimmed', (d, i) => !highlightedEdges.has(i));
        }

        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x || 0)
                .attr('y1', d => d.source.y || 0)
                .attr('x2', d => d.target.x || 0)
                .attr('y2', d => d.target.y || 0);

            node.attr('transform', d => \`translate(\${d.x || 0},\${d.y || 0})\`);
        });

        // Category filters
        const categoryFilters = d3.select('#categoryFilters');
        categoryFilters.selectAll('.category-filter')
            .data(categories.sort())
            .join('div')
            .attr('class', 'category-filter')
            .html(d => \`
                <div class="category-color" style="background: \${categoryColors[d] || '#AAB7B8'}"></div>
                <div class="category-name">\${d}</div>
                <div class="category-count">\${nodes.filter(n => n.category === d).length}</div>
            \`)
            .on('click', function(e, d) {
                if (activeCategories.has(d)) {
                    activeCategories.delete(d);
                    d3.select(this).classed('inactive', true);
                } else {
                    activeCategories.add(d);
                    d3.select(this).classed('inactive', false);
                }
                filterGraph();
            });

        function filterGraph() {
            node.style('display', d => activeCategories.has(d.category) ? 'block' : 'none');
            link.style('display', d => {
                const sourceCat = typeof d.source === 'object' ? d.source.category : nodeById.get(d.source)?.category;
                const targetCat = typeof d.target === 'object' ? d.target.category : nodeById.get(d.target)?.category;
                return activeCategories.has(sourceCat) && activeCategories.has(targetCat) ? 'block' : 'none';
            });
        }

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            if (!term) {
                node.style('opacity', 1);
                return;
            }
            node.style('opacity', d =>
                d.name.toLowerCase().includes(term) || d.path.toLowerCase().includes(term) ? 1 : 0.2
            );
        });

        // Controls
        document.getElementById('resetBtn').addEventListener('click', () => {
            svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
            selectedNode = null;
            updateHighlight();
        });

        document.getElementById('exportBtn').addEventListener('click', () => {
            const data = { nodes, edges };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'import-graph.json';
            a.click();
        });

        window.addEventListener('resize', () => {
            const w = document.getElementById('graph').clientWidth;
            const h = document.getElementById('graph').clientHeight;
            svg.attr('viewBox', [0, 0, w, h]);
            simulation.force('center', d3.forceCenter(w / 2, h / 2));
            simulation.alpha(0.3).restart();
        });
    </script>
</body>
</html>`;
}

// Run
const data = analyze();
const html = generateHTML(data);
fs.writeFileSync(path.join(PROJECT_ROOT, 'import-graph.html'), html);
console.log('✅ Done! Open import-graph.html in your browser.');
