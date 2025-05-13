import yfm from '@diplodoc/transform';
import {ConstructorBlock} from '../src';
import {contentTransformer} from '../src/text-transform';

export const yfmTransform = (content: string) => yfm(content).result.html;

export const blockListTransform = (blocksList: ConstructorBlock[]) =>
    contentTransformer({content: {blocks: blocksList}, options: {lang: 'en'}}).blocks;

export const blockTransform = (block: ConstructorBlock) =>
    contentTransformer({content: {blocks: [block]}, options: {lang: 'en'}}).blocks[0];
