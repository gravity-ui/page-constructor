import {Block, BlockType} from '../../models';
import {formatBlockName} from '../utils';

import DefaultPreview from './previews/default-preview';

export type PreviewComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

export interface EdiorBlockData {
    template: Block;
    preview: PreviewComponent;
    meta: {
        title: string;
        description?: string;
    };
}

const getBlockTemplate = (blockType: BlockType) =>
    require(`./templates/${blockType}.json`) as Omit<EdiorBlockData, 'preview'>;

const getBlockPreview = (blockType: BlockType) => {
    try {
        return require(`./previews/${blockType}.tsx`).default as PreviewComponent;
    } catch (err) {
        /*eslint-disable no-console */
        console.warn(`Preview image for ${blockType} not found`);
        return DefaultPreview;
    }
};

const EditorBlocksData = Object.values(BlockType).reduce((previewData, blockType) => {
    const template = getBlockTemplate(blockType);
    const preview = getBlockPreview(blockType);

    template.meta = template.meta || {};
    template.meta.title = template.meta.title || formatBlockName(blockType);

    /* eslint-disable no-param-reassign */
    previewData[blockType] = {
        ...template,
        preview,
    } as EdiorBlockData;

    return previewData;
}, {} as Record<BlockType, EdiorBlockData>);

export default EditorBlocksData;
