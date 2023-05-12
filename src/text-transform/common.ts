import {Lang} from '../utils/configure';

import {fullTransform, typografToHTML} from './utils';

export type ComplexItem = {[key: string]: string};
export type Item = string | null | ComplexItem;
export type Transformer = (text: string) => string;
export type TransformerRaw = (lang: Lang, content: string) => string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Parser<T = any> = (transformer: Transformer, block: T) => T;

export const createItemsParser = (fields: string[]) => (transformer: Transformer, items: Item[]) =>
    items.map((item) => {
        if (!item) {
            return item;
        } else if (typeof item === 'string') {
            return transformer(item);
        } else {
            return {
                ...item,
                ...fields.reduce<ComplexItem>((acc, fieldName) => {
                    if (item[fieldName]) {
                        // eslint-disable-next-line no-param-reassign
                        acc[fieldName] = transformer(item[fieldName]);
                    }

                    return acc;
                }, {}),
            };
        }
    });

export function yfmTransformer(lang: Lang, content: string) {
    const {html} = fullTransform(content, {lang});

    return html;
}

export function typografTransformer(lang: Lang, content: string) {
    return typografToHTML(content, lang);
}
