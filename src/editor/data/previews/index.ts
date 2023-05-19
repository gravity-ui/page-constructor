import {BlockType} from '../../../../src/models';

import DefaultPreview from './default-preview';

export type PreviewComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

export default Object.values(BlockType).reduce((previews, blockType) => {
    try {
        previews[blockType as BlockType] = require(`./${blockType}.tsx`).default;
    } catch (err) {
        console.warn(`Preview image for ${blockType} not found`);
        previews[blockType as BlockType] = DefaultPreview;
    }

    return previews;
}, {} as Record<BlockType, PreviewComponent>);
