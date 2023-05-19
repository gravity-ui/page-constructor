import {BlockType} from '../../../../src/models';
import {EdiorBlockData} from '../../data';

export default Object.values(BlockType).reduce((templates, blockType) => {
    templates[blockType as BlockType] = require(`./${blockType}.json`);

    return templates;
}, {} as Record<BlockType, EdiorBlockData>);
