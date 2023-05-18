import {Block, BlockType} from '../../../../src/models';

import BannerBlock from './banner-block.json';
import HeaderBlock from './header-block.json';
import QuestionsBlock from './questions-block.json';

export const TemplatesMap: Partial<Record<BlockType, Block>> = {
    [BlockType.QuestionsBlock]: QuestionsBlock as Block,
    [BlockType.BannerBlock]: BannerBlock as Block,
    [BlockType.HeaderBlock]: HeaderBlock as Block,
};
