#!/usr/bin/env node
/**
 * Анализатор import-зависимостей для page-constructor
 * Сканирует TypeScript файлы и строит граф зависимостей
 */

const fs = require('fs');
const path = require('path');

const glob = require('glob');

const PROJECT_ROOT = path.resolve(__dirname, '..');

// Паттерны для поиска импортов
const IMPORT_PATTERNS = [
    /import\s+.*?\s+from\s+['"]([^'"]+)['"];?/g,
    /import\s+['"]([^'"]+)['"];?/g,
    /export\s+.*?\s+from\s+['"]([^'"]+)['"];?/g,
];

// Исключаемые пути
const EXCLUDE_PATTERNS = [
    'node_modules',
    'build',
    'dist',
    '.storybook',
    '**/*.d.ts',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/__stories__/**',
    '**/__tests__/**',
    '**/demo/**',
];

function resolveImportPath(sourcePath, importPath) {
    // Игнорируем все asset-файлы (стили, картинки, шрифты)
    const assetExts = [
        '.scss',
        '.css',
        '.sass',
        '.less',
        '.svg',
        '.png',
        '.jpg',
        '.jpeg',
        '.gif',
        '.webp',
        '.woff',
        '.woff2',
        '.ttf',
        '.eot',
        '.json',
    ];
    if (assetExts.some((ext) => importPath.endsWith(ext))) {
        return null;
    }

    // Внешние зависимости (@gravity-ui, react, etc.)
    if (!importPath.startsWith('.') && !importPath.startsWith('src/')) {
        return {type: 'external', path: importPath};
    }

    // Относительные пути
    const resolved = path.resolve(path.dirname(sourcePath), importPath);

    // Проверяем существование файла с разными расширениями
    const extensions = ['.ts', '.tsx', '.js', '.jsx'];
    const indexExtensions = ['/index.ts', '/index.tsx', '/index.js'];

    // Сначала проверяем как файл
    for (const ext of extensions) {
        const fullPath = resolved + ext;
        if (fs.existsSync(fullPath)) {
            return {type: 'internal', path: path.relative(PROJECT_ROOT, fullPath)};
        }
    }

    // Потом проверяем как папку с index
    for (const ext of indexExtensions) {
        const fullPath = resolved + ext;
        if (fs.existsSync(fullPath)) {
            return {type: 'internal', path: path.relative(PROJECT_ROOT, fullPath)};
        }
    }

    // Если ничего не найдено - возвращаем null, не создаем ноду
    return null;
}

function parseImports(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const imports = new Set();

    for (const pattern of IMPORT_PATTERNS) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
            const importPath = match[1];
            const resolved = resolveImportPath(filePath, importPath);
            if (resolved) {
                imports.add(JSON.stringify(resolved));
            }
        }
    }

    return Array.from(imports).map((i) => JSON.parse(i));
}

function analyzeProject() {
    const files = glob.sync('src/**/*.{ts,tsx}', {
        cwd: PROJECT_ROOT,
        absolute: true,
        ignore: EXCLUDE_PATTERNS,
    });

    const nodes = new Map();
    const edges = [];
    const externalDeps = new Set();

    files.forEach((file) => {
        const relativePath = path.relative(PROJECT_ROOT, file);
        const imports = parseImports(file);

        // Создаем узел
        const dir = path.dirname(relativePath);
        const category = dir.split('/')[1] || 'other'; // src/{category}/...

        nodes.set(relativePath, {
            id: relativePath,
            path: relativePath,
            category,
            name: path.basename(relativePath, path.extname(relativePath)),
            imports: [],
        });

        imports.forEach((imp) => {
            if (imp.type === 'external') {
                externalDeps.add(imp.path);
            } else {
                // Проверяем, что target файл существует (исключаем SCSS и несуществующие файлы)
                const targetPath = path.join(PROJECT_ROOT, imp.path);
                const targetExists =
                    fs.existsSync(targetPath) ||
                    fs.existsSync(targetPath + '.ts') ||
                    fs.existsSync(targetPath + '.tsx');

                if (targetExists) {
                    edges.push({
                        source: relativePath,
                        target: imp.path,
                    });
                    nodes.get(relativePath).imports.push(imp.path);
                }
            }
        });
    });

    // Находим циклические зависимости
    const cycles = findCycles(nodes, edges);

    return {
        nodes: Array.from(nodes.values()),
        edges,
        externalDeps: Array.from(externalDeps),
        cycles,
        stats: {
            totalFiles: nodes.size,
            totalImports: edges.length,
            externalDeps: externalDeps.size,
            cycles: cycles.length,
        },
    };
}

function findCycles(nodes, edges) {
    const cycles = [];
    const visited = new Set();
    const recursionStack = new Set();

    const adj = new Map();
    edges.forEach((e) => {
        if (!adj.has(e.source)) adj.set(e.source, []);
        adj.get(e.source).push(e.target);
    });

    function dfs(node, path) {
        if (recursionStack.has(node)) {
            const cycleStart = path.indexOf(node);
            const cycle = path.slice(cycleStart);
            cycles.push(cycle);
            return;
        }

        if (visited.has(node)) return;

        visited.add(node);
        recursionStack.add(node);
        path.push(node);

        const neighbors = adj.get(node) || [];
        for (const neighbor of neighbors) {
            if (nodes.has(neighbor)) {
                dfs(neighbor, [...path]);
            }
        }

        recursionStack.delete(node);
    }

    for (const [nodeId] of nodes) {
        if (!visited.has(nodeId)) {
            dfs(nodeId, []);
        }
    }

    return cycles;
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

    const nodesJson = JSON.stringify(data.nodes);
    const edgesJson = JSON.stringify(data.edges);
    const cyclesJson = JSON.stringify(data.cycles);
    const categoriesJson = JSON.stringify(categories);
    const colorsJson = JSON.stringify(categoryColors);
    const statsJson = JSON.stringify(data.stats);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Import Dependencies Graph - Page Constructor</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #1a1a2e;
            color: #fff;
            overflow: hidden;
        }
        #app {
            display: flex;
            height: 100vh;
        }
        #sidebar {
            width: 320px;
            background: #16213e;
            border-right: 1px solid #0f3460;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        #graph {
            flex: 1;
            position: relative;
        }
        .header {
            padding: 20px;
            border-bottom: 1px solid #0f3460;
        }
        .header h1 {
            font-size: 18px;
            margin-bottom: 12px;
            color: #e94560;
        }
        .stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        .stat {
            background: #0f3460;
            padding: 10px;
            border-radius: 6px;
            text-align: center;
        }
        .stat-value {
            font-size: 24px;
            font-weight: bold;
            color: #e94560;
        }
        .stat-label {
            font-size: 11px;
            color: #8b9dc3;
            margin-top: 4px;
        }
        .search-section {
            padding: 15px 20px;
            border-bottom: 1px solid #0f3460;
        }
        .search-input {
            width: 100%;
            padding: 10px 14px;
            border: 1px solid #0f3460;
            border-radius: 6px;
            background: #0f3460;
            color: #fff;
            font-size: 14px;
        }
        .search-input:focus {
            outline: none;
            border-color: #e94560;
        }
        .filters {
            padding: 15px 20px;
            flex: 1;
            overflow-y: auto;
        }
        .filters h3 {
            font-size: 13px;
            text-transform: uppercase;
            color: #8b9dc3;
            margin-bottom: 12px;
        }
        .category-filter {
            display: flex;
            align-items: center;
            padding: 8px 0;
            cursor: pointer;
            transition: opacity 0.2s;
        }
        .category-filter:hover {
            opacity: 0.8;
        }
        .category-filter.inactive {
            opacity: 0.4;
        }
        .category-color {
            width: 12px;
            height: 12px;
            border-radius: 3px;
            margin-right: 10px;
        }
        .category-name {
            flex: 1;
            font-size: 13px;
        }
        .category-count {
            font-size: 12px;
            color: #8b9dc3;
        }
        .cycles-section {
            padding: 15px 20px;
            border-top: 1px solid #0f3460;
            max-height: 200px;
            overflow-y: auto;
        }
        .cycles-section h3 {
            font-size: 13px;
            color: #e94560;
            margin-bottom: 10px;
        }
        .cycle-item {
            background: #e9456020;
            border: 1px solid #e94560;
            border-radius: 4px;
            padding: 8px;
            margin-bottom: 8px;
            font-size: 11px;
            font-family: monospace;
            cursor: pointer;
        }
        .cycle-item:hover {
            background: #e9456030;
        }
        .graph-container {
            width: 100%;
            height: 100%;
        }
        .node {
            cursor: pointer;
            transition: filter 0.2s;
        }
        .node:hover {
            filter: brightness(1.2);
        }
        .node.highlighted {
            filter: drop-shadow(0 0 8px #e94560);
        }
        .node.dimmed {
            opacity: 0.2;
        }
        .link {
            fill: none;
            stroke: #4a5568;
            stroke-opacity: 0.4;
            transition: stroke-opacity 0.2s, stroke 0.2s;
        }
        .link.highlighted {
            stroke: #e94560;
            stroke-opacity: 0.8;
            stroke-width: 2px;
        }
        .link.dimmed {
            stroke-opacity: 0.05;
        }
        .node-label {
            font-size: 10px;
            fill: #fff;
            pointer-events: none;
            text-shadow: 0 1px 3px rgba(0,0,0,0.8);
            opacity: 0.8;
        }
        .tooltip {
            position: fixed;
            background: #16213e;
            border: 1px solid #0f3460;
            border-radius: 6px;
            padding: 12px;
            font-size: 12px;
            max-width: 300px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s;
            z-index: 1000;
        }
        .tooltip.visible {
            opacity: 1;
        }
        .tooltip-title {
            font-weight: bold;
            color: #e94560;
            margin-bottom: 6px;
        }
        .tooltip-path {
            color: #8b9dc3;
            font-family: monospace;
            font-size: 10px;
            margin-bottom: 8px;
        }
        .tooltip-section {
            margin-top: 8px;
        }
        .tooltip-section-title {
            font-size: 10px;
            color: #8b9dc3;
            text-transform: uppercase;
        }
        .tooltip-list {
            margin-top: 4px;
            padding-left: 12px;
        }
        .tooltip-list li {
            font-size: 10px;
            color: #ddd;
            margin: 2px 0;
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
            transition: all 0.2s;
        }
        .control-btn:hover {
            background: #0f3460;
            border-color: #e94560;
        }
        .legend {
            position: absolute;
            top: 20px;
            right: 20px;
            background: #16213e;
            border: 1px solid #0f3460;
            border-radius: 6px;
            padding: 12px;
            font-size: 11px;
        }
        .legend-title {
            color: #8b9dc3;
            margin-bottom: 8px;
        }
        .legend-item {
            display: flex;
            align-items: center;
            margin: 4px 0;
        }
        .legend-color {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 8px;
        }
    </style>
</head>
<body>
    <div id="app">
        <div id="sidebar">
            <div class="header">
                <h1>📦 Import Graph</h1>
                <div class="stats">
                    <div class="stat">
                        <div class="stat-value">${data.stats.totalFiles}</div>
                        <div class="stat-label">Files</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${data.stats.totalImports}</div>
                        <div class="stat-label">Imports</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${data.stats.cycles}</div>
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
            <div class="cycles-section" id="cyclesSection" style="display: ${data.cycles.length ? 'block' : 'none'}">
                <h3>Circular Dependencies</h3>
                <div id="cyclesList"></div>
            </div>
        </div>
        <div id="graph">
            <svg class="graph-container" id="graphSvg"></svg>
            <div class="tooltip" id="tooltip"></div>
            <div class="legend">
                <div class="legend-title">Connection Types</div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #4a5568;"></div>
                    <span>Normal import</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #e94560;"></div>
                    <span>Circular / Selected</span>
                </div>
            </div>
            <div class="controls">
                <button class="control-btn" id="resetBtn">Reset View</button>
                <button class="control-btn" id="exportBtn">Export JSON</button>
            </div>
        </div>
    </div>

    <script>
        const nodes = ${nodesJson};
        const edges = ${edgesJson};
        const cycles = ${cyclesJson};
        const categories = ${categoriesJson};
        const categoryColors = ${colorsJson};
        const stats = ${statsJson};

        // State
        let activeCategories = new Set(categories);
        let selectedNode = null;
        let filteredNodes = [...nodes];
        let filteredEdges = [...edges];

        // Setup D3
        const svg = d3.select('#graphSvg');
        const width = document.getElementById('graph').clientWidth;
        const height = document.getElementById('graph').clientHeight;
        svg.attr('viewBox', [0, 0, width, height]);

        // Add zoom
        const g = svg.append('g');
        const zoom = d3.zoom()
            .scaleExtent([0.1, 4])
            .on('zoom', (e) => g.attr('transform', e.transform));
        svg.call(zoom);

        // Simulation
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(edges).id(d => d.id).distance(80))
            .force('charge', d3.forceManyBody().strength(-200))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(30));

        // Draw links
        const link = g.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(edges)
            .join('line')
            .attr('class', 'link');

        // Draw nodes
        const node = g.append('g')
            .attr('class', 'nodes')
            .selectAll('g')
            .data(nodes)
            .join('g')
            .attr('class', 'node')
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended));

        // Node circles
        node.append('circle')
            .attr('r', d => Math.sqrt(d.imports.length + 1) * 5 + 3)
            .attr('fill', d => categoryColors[d.category] || '#AAB7B8')
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.5);

        // Node labels (only for larger nodes or on zoom)
        node.append('text')
            .attr('class', 'node-label')
            .attr('dx', 12)
            .attr('dy', 4)
            .text(d => d.name)
            .style('opacity', d => d.imports.length > 5 ? 1 : 0);

        // Tooltip
        const tooltip = d3.select('#tooltip');

        node.on('mouseenter', (e, d) => {
            // Count files that import this file (dependents)
            const dependents = edges.filter(edge => getId(edge.target) === d.id).length;

            tooltip.html(\`
                <div class="tooltip-title">\${d.name}</div>
                <div class="tooltip-path">\${d.path}</div>
                <div class="tooltip-section">
                    <div class="tooltip-section-title">Category</div>
                    <div style="font-size: 11px;">\${d.category}</div>
                </div>
                <div class="tooltip-section">
                    <div class="tooltip-section-title">Stats</div>
                    <div class="tooltip-stats" style="font-size: 11px;">
                        Imports: \${d.imports.length} | Imported by: \${dependents}
                    </div>
                </div>
                \${d.imports.length ? \`
                <div class="tooltip-section">
                    <div class="tooltip-section-title">Imports (\${d.imports.length})</div>
                    <ul class="tooltip-list">
                        \${d.imports.slice(0, 5).map(i => \`<li>\${i.split('/').pop()}</li>\`).join('')}
                        \${d.imports.length > 5 ? \`<li>...and \${d.imports.length - 5} more</li>\` : ''}
                    </ul>
                </div>
                \` : ''}
            \`);

            tooltip.style('left', (e.clientX + 15) + 'px')
                .style('top', (e.clientY + 15) + 'px')
                .classed('visible', true);
        }).on('mouseleave', () => {
            tooltip.classed('visible', false);
        });

        node.on('click', (e, d) => {
            e.stopPropagation();
            selectNode(d);
        });

        svg.on('click', () => {
            selectedNode = null;
            updateHighlight();
        });

        // Helper to get ID from source/target (could be string or object)
        function getId(x) {
            return typeof x === 'object' ? x.id : x;
        }

        function selectNode(d) {
            selectedNode = d;

            // Find connected nodes
            const connected = new Set([d.id]);
            let dependentsCount = 0;

            edges.forEach(e => {
                const sourceId = getId(e.source);
                const targetId = getId(e.target);
                if (sourceId === d.id) connected.add(targetId);
                if (targetId === d.id) {
                    connected.add(sourceId);
                    dependentsCount++;
                }
            });

            updateHighlight();

            // Update tooltip stats with correct dependents count
            tooltip.select('.tooltip-stats').html(\`
                <div class="tooltip-section-title">Stats</div>
                <div style="font-size: 11px;">
                    Imports: \${d.imports.length} | Imported by: \${dependentsCount}
                </div>
            \`);

            // Update info panel
            updateNodeInfo(d, connected);
        }

        function updateHighlight() {
            if (!selectedNode) {
                node.classed('highlighted', false).classed('dimmed', false);
                link.classed('highlighted', false).classed('dimmed', false);
                return;
            }

            const connected = new Set([selectedNode.id]);
            const highlightedEdges = new Set();

            edges.forEach((e, i) => {
                const sourceId = getId(e.source);
                const targetId = getId(e.target);

                if (sourceId === selectedNode.id) {
                    connected.add(targetId);
                    highlightedEdges.add(i);
                }
                if (targetId === selectedNode.id) {
                    connected.add(sourceId);
                    highlightedEdges.add(i);
                }
            });

            node.classed('highlighted', d => d.id === selectedNode.id)
                .classed('dimmed', d => !connected.has(d.id));

            link.classed('highlighted', (d, i) => highlightedEdges.has(i))
                .classed('dimmed', (d, i) => !highlightedEdges.has(i));
        }

        function updateNodeInfo(d, connected) {
            // Could add side panel with detailed info
        }

        // Simulation tick
        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('transform', d => \`translate(\${d.x},\${d.y})\`);
        });

        // Drag functions
        function dragstarted(e, d) {
            if (!e.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(e, d) {
            d.fx = e.x;
            d.fy = e.y;
        }

        function dragended(e, d) {
            if (!e.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

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
            .on('click', (e, d) => {
                if (activeCategories.has(d)) {
                    activeCategories.delete(d);
                } else {
                    activeCategories.add(d);
                }
                d3.select(e.currentTarget).classed('inactive', !activeCategories.has(d));
                filterGraph();
            });

        function filterGraph() {
            filteredNodes = nodes.filter(n => activeCategories.has(n.category));
            const visibleIds = new Set(filteredNodes.map(n => n.id));
            filteredEdges = edges.filter(e => visibleIds.has(e.source.id) && visibleIds.has(e.target.id));

            node.style('display', d => activeCategories.has(d.category) ? 'block' : 'none');
            link.style('display', d =>
                activeCategories.has(d.source.category) && activeCategories.has(d.target.category)
                    ? 'block' : 'none'
            );

            simulation.nodes(filteredNodes);
            simulation.force('link').links(filteredEdges);
            simulation.alpha(1).restart();
        }

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            if (!term) {
                node.style('opacity', 1);
                return;
            }

            node.style('opacity', d =>
                d.name.toLowerCase().includes(term) ||
                d.path.toLowerCase().includes(term)
                    ? 1 : 0.2
            );
        });

        // Cycles list
        if (cycles.length) {
            const cyclesList = d3.select('#cyclesList');
            cyclesList.selectAll('.cycle-item')
                .data(cycles.slice(0, 10))
                .join('div')
                .attr('class', 'cycle-item')
                .html(d => \`
                    <div style="color: #e94560; font-weight: bold; margin-bottom: 4px;">
                        Cycle (\${d.length} files)
                    </div>
                    \${d.map(f => \`<div>→ \${f.split('/').pop()}</div>\`).join('')}
                \`)
                .on('click', (e, d) => {
                    // Highlight cycle
                    const cycleIds = new Set(d);
                    node.classed('highlighted', n => cycleIds.has(n.id));
                    link.classed('highlighted', l =>
                        cycleIds.has(l.source.id) && cycleIds.has(l.target.id)
                    );
                });
        }

        // Controls
        document.getElementById('resetBtn').addEventListener('click', () => {
            svg.transition().duration(750).call(
                zoom.transform,
                d3.zoomIdentity
            );
            selectedNode = null;
            updateHighlight();
        });

        document.getElementById('exportBtn').addEventListener('click', () => {
            const data = { nodes, edges, cycles, stats };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'import-graph.json';
            a.click();
        });

        // Handle resize
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

// Main execution
if (require.main === module) {
    console.log('🔍 Analyzing project imports...');

    const data = analyzeProject();

    console.log(`
📊 Statistics:
   Files: ${data.stats.totalFiles}
   Internal imports: ${data.stats.totalImports}
   External deps: ${data.stats.externalDeps}
   Circular deps: ${data.stats.cycles}
   Categories: ${new Set(data.nodes.map((n) => n.category)).size}
`);

    if (data.cycles.length > 0) {
        console.log('⚠️  Found circular dependencies:');
        data.cycles.forEach((cycle, i) => {
            console.log(`   ${i + 1}. ${cycle.join(' → ')}`);
        });
    }

    const outputPath = path.join(PROJECT_ROOT, 'import-graph.html');
    const html = generateHTML(data);
    fs.writeFileSync(outputPath, html);

    console.log(`
✅ Graph saved to: ${outputPath}
🌐 Open this file in your browser to explore the dependencies
`);
}

module.exports = {analyzeProject, generateHTML};
