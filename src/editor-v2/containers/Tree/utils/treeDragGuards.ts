import type {UniqueIdentifier} from '@dnd-kit/abstract';

import type {FlattenedTreeItem} from '../types';

import {blockHasChildrenProp} from './blocksBridge';
import {getProjection} from './common';

function parentRowSupportsChildren(flat: FlattenedTreeItem[], parentId: string | null): boolean {
    if (parentId === null) {
        return true;
    }
    const row = flat.find((x) => String(x.id) === String(parentId));
    return Boolean(row && blockHasChildrenProp(row.block));
}

// Не даём сделать элемент дочерним у блока без пропа `children`
// рекурсивно уменьшаем глубину, пока не найдём допустимого родителя.
export function sanitizeProjectionForChildrenCapability(
    flat: FlattenedTreeItem[],
    targetId: UniqueIdentifier,
    projectedDepth: number,
): {depth: number; parentId: string | null} {
    const {depth, parentId} = getProjection(flat, targetId, projectedDepth);

    if (parentRowSupportsChildren(flat, parentId)) {
        return {depth, parentId};
    }

    if (projectedDepth <= 0) {
        return getProjection(flat, targetId, 0);
    }

    return sanitizeProjectionForChildrenCapability(flat, targetId, projectedDepth - 1);
}
