import {Block, BlockType} from '../../models';
import {formatBlockName} from '../utils';

import DefaultPreview from './previews/default-preview';
import HeaderBlock from './previews/header-block';

export type PreviewComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

export interface EdiorBlockData {
    template: Block;
    preview: PreviewComponent;
    meta: {
        title: string;
        description?: string;
    };
}

const getBlockTemplate = (blockType: BlockType): Promise<Omit<EdiorBlockData, 'preview'>> =>
    import(`./templates/${blockType}.json`).then((data) => data.default);

const getBlockPreview = (blockType: BlockType): PreviewComponent => {
    try {
        if (blockType === BlockType.HeaderBlock) {
            return HeaderBlock;
        }

        return DefaultPreview;
    } catch (err) {
        /*eslint-disable no-console */
        console.warn(`Preview image for ${blockType} not found`);
        return DefaultPreview;
    }
};

type EditorBlocksData = Partial<Record<BlockType, EdiorBlockData>>;

async function getEditorBlocksData(): Promise<EditorBlocksData> {
    const EdiorBlockData: EditorBlocksData = {};

    for (const blockType of Object.values(BlockType)) {
        const template = await getBlockTemplate(blockType as BlockType);

        const preview = getBlockPreview(blockType);

        template.meta = template.meta || {};
        template.meta.title = template.meta.title || formatBlockName(blockType);

        EdiorBlockData[blockType] = {
            ...template,
            preview,
        };
    }

    return EdiorBlockData;
}

export {EditorBlocksData, getEditorBlocksData};
