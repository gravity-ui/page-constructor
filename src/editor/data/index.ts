import {Block, BlockType} from '../../models';

import DefaultPreview from './previews/default-preview';

export type PreviewComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

export interface EdiorBlockData {
    template: Block;
    preview: PreviewComponent;
    meta?: {
        title?: string;
        description?: string;
    };
}

const getBlockTemplate = (blockType: BlockType) =>
    require(`./templates/${blockType}.json`) as Omit<EdiorBlockData, 'preview'>;

const getBlockPreview = (blockType: BlockType) => {
    try {
        return require(`./previews/${blockType}.tsx`).default as PreviewComponent;
    } catch (err) {
        console.warn(`Preview image for ${blockType} not found`);
        return DefaultPreview;
    }
};

const EdiorBlocksData = Object.values(BlockType).reduce((previewData, blockType) => {
    const template = getBlockTemplate(blockType);
    const preview = getBlockPreview(blockType);

    previewData[blockType] = {
        ...template,
        preview,
    } as EdiorBlockData;

    return previewData;
}, {} as Record<BlockType, EdiorBlockData>);

export default EdiorBlocksData;
