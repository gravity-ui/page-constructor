import {BlockType} from '../../../../src/models';

import DefaultPreview from './default-preview';

export type PreviewComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

const previews = {} as Record<BlockType, PreviewComponent>;

Object.values(BlockType).forEach((blockType) => {
    try {
        previews[blockType as BlockType] = require(`./${blockType}.tsx`).default;
    } catch (err) {
        console.warn(`Preview image for ${blockType} not found`);
        previews[blockType as BlockType] = DefaultPreview;
    }
});

export default previews;
