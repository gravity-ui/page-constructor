import type {ConstructorBlock} from '../../../models';

export interface TreeItemData {
    id: string;
    block: ConstructorBlock;
    children: TreeItemData[];
}

export interface FlattenedTreeItem extends TreeItemData {
    parentId: string | null;
    depth: number;
    index: number;
}
