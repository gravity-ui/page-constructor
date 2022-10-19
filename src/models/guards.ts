import {Block, BlockTypes, ConstructorItem} from './';
import {MetrikaGoal, NewMetrikaGoal} from './index';

export function isBlock(block: ConstructorItem): block is Block {
    return block.type in BlockTypes;
}

export function isNewMetrikaFormat(metrika: MetrikaGoal): metrika is NewMetrikaGoal[] {
    return Boolean(Array.isArray(metrika) && metrika.length && typeof metrika[0] === 'object');
}
