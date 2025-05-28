import yfm from '@diplodoc/transform';
import {ConstructorBlock} from '../src';
import {contentTransformer} from '../src/text-transform';

export const yfmTransform = (content: string) => yfm(content).result.html;

export const blockListTransform = (blocksList: ConstructorBlock[]) =>
    contentTransformer({content: {blocks: blocksList}, options: {lang: 'en'}}).blocks;

export const blockTransform = (block: ConstructorBlock) =>
    contentTransformer({content: {blocks: [block]}, options: {lang: 'en'}}).blocks[0];
import {TitleItemProps} from '../src';

export const yfmTransformInline = (content: string) =>
    yfm(content, {renderInline: true}).result.html;
export const transformTitle = (title: string | TitleItemProps) => {
    if (!title) {
        return undefined;
    }

    if (typeof title === 'string') {
        return yfmTransformInline(title);
    }

    const {text, ...rest} = title;

    return {...rest, text: yfmTransformInline(text)};
};
export const transformOptionalTitle = (title?: string | TitleItemProps) => {
    if (!title) {
        return undefined;
    }

    return transformTitle(title);
};
