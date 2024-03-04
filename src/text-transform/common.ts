import defaultPlugins from '@diplodoc/transform/lib/plugins';
import {MarkdownItPluginCb} from '@diplodoc/transform/lib/plugins/typings';
import {Lang} from '@gravity-ui/uikit';

import {fullTransform, typografToHTML} from './utils';

export type ComplexItem = {[key: string]: string};
export type Item = string | null | ComplexItem;
export type Transformer = (text: string) => string;
export type TransformerRaw = (
    lang: `${Lang}`,
    content: string,
    options: {plugins: MarkdownItPluginCb[]},
) => string;
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

export function yfmTransformer(
    lang: `${Lang}`,
    content: string,
    options: {plugins?: MarkdownItPluginCb[]} = {},
) {
    const {plugins = []} = options;
    const {html} = fullTransform(content, {
        lang,
        plugins: [...defaultPlugins, ...plugins],
    });

    return html;
}

export function typografTransformer(lang: `${Lang}`, content: string) {
    return typografToHTML(content, lang);
}
