import type {ComponentMapData, ComponentMapEmphasis} from './model';

export const getEdgeKey = (source: string, target: string) => `${source}\0${target}`;

interface ComponentMapEmphasisRequest {
    selectedNodeId?: string;
    searchQuery?: string;
}

const normalizeSearchValue = (value: string) => value.trim().toLowerCase();

function createAdjacency(data: ComponentMapData) {
    const incoming = new Map<string, string[]>();
    const outgoing = new Map<string, string[]>();

    for (const {source, target} of data.edges) {
        const outgoingTargets = outgoing.get(source) ?? [];
        outgoingTargets.push(target);
        outgoing.set(source, outgoingTargets);

        const incomingSources = incoming.get(target) ?? [];
        incomingSources.push(source);
        incoming.set(target, incomingSources);
    }

    return {incoming, outgoing};
}

function visit(start: string, adjacency: Map<string, string[]>, result: Set<string>) {
    const queue = [start];
    while (queue.length) {
        const current = queue.shift() as string;
        for (const next of adjacency.get(current) ?? []) {
            if (!result.has(next)) {
                result.add(next);
                queue.push(next);
            }
        }
    }
}

export function getRelatedNodeIds(data: ComponentMapData, selectedId: string): Set<string> {
    if (!data.nodes.some(({id}) => id === selectedId)) {
        return new Set();
    }

    const {incoming, outgoing} = createAdjacency(data);
    const ancestorIds = new Set([selectedId]);
    const descendantIds = new Set([selectedId]);

    visit(selectedId, incoming, ancestorIds);
    visit(selectedId, outgoing, descendantIds);

    return new Set([...ancestorIds, ...descendantIds]);
}

export function getEmphasis(
    data: ComponentMapData,
    {selectedNodeId, searchQuery = ''}: ComponentMapEmphasisRequest = {},
): ComponentMapEmphasis {
    const normalizedQuery = normalizeSearchValue(searchQuery);
    if (normalizedQuery) {
        return {
            mode: 'search',
            activeNodeIds: new Set(
                data.nodes
                    .filter(({label}) => normalizeSearchValue(label).includes(normalizedQuery))
                    .map(({id}) => id),
            ),
            activeEdgeIds: new Set(),
        };
    }

    if (!selectedNodeId) {
        return {mode: 'none', activeNodeIds: new Set(), activeEdgeIds: new Set()};
    }

    const activeNodeIds = getRelatedNodeIds(data, selectedNodeId);
    return {
        mode: 'selection',
        activeNodeIds,
        activeEdgeIds: new Set(
            data.edges
                .filter(
                    ({source, target}) => activeNodeIds.has(source) && activeNodeIds.has(target),
                )
                .map(({source, target}) => getEdgeKey(source, target)),
        ),
    };
}
