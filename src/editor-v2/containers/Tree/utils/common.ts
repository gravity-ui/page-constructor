import type {UniqueIdentifier} from '@dnd-kit/abstract';

import type {ConstructorBlock} from '../../../../models';

import type {FlattenedTreeItem, TreeItemData} from '../types';

export function flattenTree(
    items: TreeItemData[],
    parentId: string | null = null,
    depth = 0,
): FlattenedTreeItem[] {
    return items.reduce<FlattenedTreeItem[]>((acc, item, index) => {
        return [
            ...acc,
            {...item, parentId, depth, index},
            ...flattenTree(item.children, item.id, depth + 1),
        ];
    }, []);
}

export function buildTree(flattenedItems: FlattenedTreeItem[]): TreeItemData[] {
    const root: TreeItemData = {id: 'root', block: {} as ConstructorBlock, children: []};
    const nodes: Record<string, TreeItemData> = {[root.id]: root};

    const items = flattenedItems.map((item) => {
        return {...item, children: [] as TreeItemData[]};
    });

    for (const item of items) {
        const {id} = item;
        const parentId = item.parentId ?? root.id;
        const parent = nodes[parentId] ?? items.find((x) => x.id === parentId);

        if (!parent) {
            continue;
        }

        const node: TreeItemData = {...item, children: []};
        nodes[id] = node;
        parent.children.push(node);
    }

    return root.children;
}

export function getDragDepth(offset: number, indentationWidth: number) {
    return Math.round(offset / indentationWidth);
}

export function getProjection(
    items: FlattenedTreeItem[],
    targetId: UniqueIdentifier,
    projectedDepth: number,
) {
    const targetItemIndex = items.findIndex(({id}) => id === targetId);
    const previousItem = items[targetItemIndex - 1];
    const targetItem = items[targetItemIndex];
    const nextItem = items[targetItemIndex + 1];
    const maxDepth = getMaxDepth(targetItem, previousItem);
    const minDepth = getMinDepth(nextItem);
    let depth = projectedDepth;

    if (projectedDepth >= maxDepth) {
        depth = maxDepth;
    } else if (projectedDepth < minDepth) {
        depth = minDepth;
    }

    return {depth, maxDepth, minDepth, parentId: getParentId()};

    function getParentId(): string | null {
        if (depth === 0 || !previousItem) {
            return null;
        }

        if (depth === previousItem.depth) {
            return previousItem.parentId;
        }

        if (depth > previousItem.depth) {
            return previousItem.id;
        }

        const newParent = items
            .slice(0, targetItemIndex)
            .reverse()
            .find((item) => item.depth === depth)?.parentId;

        return newParent ?? null;
    }
}

function getMaxDepth(targetItem: FlattenedTreeItem, previousItem: FlattenedTreeItem | undefined) {
    if (!previousItem) {
        return 0;
    }

    return Math.min(targetItem.depth + 1, previousItem.depth + 1);
}

function getMinDepth(nextItem: FlattenedTreeItem | undefined) {
    return nextItem ? nextItem.depth : 0;
}

export function getDescendants(
    items: FlattenedTreeItem[],
    parentId: UniqueIdentifier,
): Set<string> {
    const directChildren = items.filter((item) => item.parentId === parentId);

    return directChildren.reduce((descendants, child) => {
        return new Set([...descendants, child.id, ...getDescendants(items, child.id)]);
    }, new Set<string>());
}
