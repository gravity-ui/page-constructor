import {getEmphasis, getRelatedNodeIds} from '../graph';
import type {ComponentMapData} from '../model';

const data: ComponentMapData = {
    nodes: [
        {id: 'block:A', kind: 'block', exportName: 'A', label: 'A'},
        {id: 'sub-block:B', kind: 'sub-block', exportName: 'B', label: 'B'},
        {id: 'component:C', kind: 'component', exportName: 'C', label: 'C'},
        {id: 'component:D', kind: 'component', exportName: 'D', label: 'D'},
        {id: 'component:E', kind: 'component', exportName: 'E', label: 'E'},
    ],
    edges: [
        {source: 'block:A', target: 'sub-block:B'},
        {source: 'sub-block:B', target: 'component:C'},
        {source: 'component:D', target: 'sub-block:B'},
        {source: 'component:C', target: 'block:A'},
    ],
};

describe('getRelatedNodeIds', () => {
    test('returns the selected node with every ancestor and descendant', () => {
        expect(getRelatedNodeIds(data, 'sub-block:B')).toEqual(
            new Set(['block:A', 'sub-block:B', 'component:C', 'component:D']),
        );
    });

    test('returns an empty set for an unknown selected node', () => {
        expect(getRelatedNodeIds(data, 'missing')).toEqual(new Set());
    });

    test('terminates traversal when the related graph contains a cycle', () => {
        expect(getRelatedNodeIds(data, 'block:A')).toEqual(
            new Set(['block:A', 'sub-block:B', 'component:C', 'component:D']),
        );
    });

    test('continues descendant traversal through a node first reached through an incoming cycle', () => {
        expect(
            getRelatedNodeIds(
                {
                    ...data,
                    edges: [...data.edges, {source: 'sub-block:B', target: 'component:E'}],
                },
                'block:A',
            ),
        ).toEqual(new Set(['block:A', 'sub-block:B', 'component:C', 'component:D', 'component:E']));
    });
});

describe('getEmphasis', () => {
    test('marks an edge active only when both endpoints are active', () => {
        expect(getEmphasis(data, {selectedNodeId: 'sub-block:B'})).toEqual({
            mode: 'selection',
            activeNodeIds: new Set(['block:A', 'sub-block:B', 'component:C', 'component:D']),
            activeEdgeIds: new Set([
                'block:A\u0000sub-block:B',
                'sub-block:B\u0000component:C',
                'component:D\u0000sub-block:B',
                'component:C\u0000block:A',
            ]),
        });
    });

    test('does not mark edges active when there is no selection', () => {
        expect(getEmphasis(data)).toEqual({
            mode: 'none',
            activeNodeIds: new Set(),
            activeEdgeIds: new Set(),
        });
    });

    test('matches trimmed labels and queries without case sensitivity', () => {
        expect(getEmphasis(data, {searchQuery: '  b  '})).toEqual({
            mode: 'search',
            activeNodeIds: new Set(['sub-block:B']),
            activeEdgeIds: new Set(),
        });
    });

    test('uses none mode for a whitespace-only query', () => {
        expect(getEmphasis(data, {searchQuery: '   '})).toEqual({
            mode: 'none',
            activeNodeIds: new Set(),
            activeEdgeIds: new Set(),
        });
    });

    test('search mode takes precedence for inconsistent selection and search inputs', () => {
        expect(getEmphasis(data, {selectedNodeId: 'block:A', searchQuery: 'e'})).toEqual({
            mode: 'search',
            activeNodeIds: new Set(['component:E']),
            activeEdgeIds: new Set(),
        });
    });
});
