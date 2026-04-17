/* eslint-disable no-negated-condition */
import _ from 'lodash';

import type {ConstructorBlock} from '../../../../models';

import type {FlattenedTreeItem, TreeItemData} from '../types';

export function blockHasChildrenProp(block: ConstructorBlock): boolean {
    return Boolean(block && typeof block === 'object' && 'children' in block);
}

export function getBlockTypeLabel(block: ConstructorBlock): string {
    if (block && typeof block === 'object' && 'type' in block) {
        return block.type;
    }
    return '';
}

export function getBlockChildren(block: ConstructorBlock): ConstructorBlock[] | undefined {
    if (block && typeof block === 'object' && 'children' in block) {
        if (Array.isArray(block.children)) {
            return block.children as ConstructorBlock[];
        }
    }
    return undefined;
}

export function blocksToTreeItems(blocks: ConstructorBlock[], pathPrefix = ''): TreeItemData[] {
    return blocks.map((block, index) => {
        const id = pathPrefix ? `${pathPrefix}/${index}` : String(index);
        const children = getBlockChildren(block);
        return {
            id,
            block,
            children: children ? blocksToTreeItems(children, id) : [],
        };
    });
}

export function treeItemsToBlocks(items: TreeItemData[]): ConstructorBlock[] {
    return items.map((item) => {
        const next = _.cloneDeep(item.block);
        const nested = treeItemsToBlocks(item.children);
        if (nested.length > 0) {
            (next as {children?: ConstructorBlock[]}).children = nested as never;
        } else if (getBlockChildren(item.block) !== undefined) {
            (next as {children?: ConstructorBlock[]}).children = [] as never;
        }
        return next;
    });
}

// Путь индексов от корня; при цикле или разрыве связи — пустой массив.
export function idToBlockPath(flat: FlattenedTreeItem[], id: string): number[] {
    const byId = new Map(flat.map((x) => [String(x.id), x]));
    const path: number[] = [];
    const seen = new Set<string>();
    let currentId: string | null = String(id);
    const maxSteps = flat.length + 1;

    for (let step = 0; step < maxSteps && currentId !== null; step++) {
        if (seen.has(currentId)) {
            return [];
        }
        seen.add(currentId);

        const row = byId.get(currentId);
        if (!row) {
            return [];
        }
        path.unshift(row.index);

        const p = row.parentId;
        currentId = p === null ? null : String(p);
    }

    return currentId !== null ? [] : path;
}
