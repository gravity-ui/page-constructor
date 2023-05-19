import {Block, BlockType} from '../../models';

import previews from './previews';
import templates from './templates';

export interface EdiorBlockData {
    template: Block;
    preview: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    meta?: {
        title?: string;
        description?: string;
    };
}

export const EdiorBlocksData = Object.values(BlockType).reduce((result, blockType) => {
    result[blockType] = {
        ...templates[blockType],
        preview: previews[blockType],
    } as EdiorBlockData;

    return result;
}, {} as Partial<Record<BlockType, EdiorBlockData>>);
