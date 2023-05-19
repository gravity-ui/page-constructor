import {BlockType} from '../../../../src/models';
import {EdiorBlockData} from '../../data';

const templates = {} as Record<BlockType, EdiorBlockData>;

Object.values(BlockType).forEach((blockType) => {
    try {
        templates[blockType as BlockType] = require(`./${blockType}.json`);
    } catch (err) {}
});

export default templates;
