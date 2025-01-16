import defaultPlugins from '@diplodoc/transform/lib/plugins';
import {MarkdownItPluginCb} from '@diplodoc/transform/lib/plugins/typings';

import {Lang} from './types';
import {fullTransform, typografToHTML} from './utils';

export type ComplexItem = {[key: string]: string | object};
export type Item = string | null | ComplexItem;
export type Transformer = (text: string) => string;
export type TransformerRaw = (
    lang: Lang,
    content: string,
    options: {plugins: MarkdownItPluginCb[]; renderInline?: boolean},
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
                    if (fieldName.includes('.')) {
                        const [firstProperty, secondProperty] = fieldName.split('.');
                        const root = item[firstProperty] as unknown as Record<string, string>;
                        if (!root || typeof root !== 'object') {
                            return acc;
                        }

                        if (Array.isArray(root)) {
                            if (!acc[firstProperty]) {
                                // eslint-disable-next-line no-param-reassign
                                acc[firstProperty] = [];
                            }

                            // eslint-disable-next-line no-param-reassign
                            acc[firstProperty] = root.map((subItem: ComplexItem) => ({
                                ...subItem,
                                [secondProperty]:
                                    typeof subItem[secondProperty] === 'string'
                                        ? transformer(subItem[secondProperty] as string)
                                        : subItem[secondProperty],
                            }));
                        } else {
                            // eslint-disable-next-line no-param-reassign
                            acc[firstProperty] = {
                                ...root,
                                [secondProperty]:
                                    typeof root[secondProperty] === 'string'
                                        ? transformer(root[secondProperty])
                                        : root[secondProperty],
                            };
                        }
                    } else if (item[fieldName]) {
                        // eslint-disable-next-line no-param-reassign
                        acc[fieldName] =
                            typeof item[fieldName] === 'string'
                                ? transformer(item[fieldName] as string)
                                : item[fieldName];
                    }

                    return acc;
                }, {} as ComplexItem),
            };
        }
    });

export function yfmTransformer(
    lang: Lang,
    content: string,
    options: {plugins?: MarkdownItPluginCb[]} = {},
    renderInline = false,
) {
    const {plugins = []} = options;
    const {html} = fullTransform(content, {
        lang,
        plugins: [...defaultPlugins, ...plugins],
        renderInline,
    });

    return html;
}

export function typografTransformer(lang: Lang, content: string) {
    return typografToHTML(content, lang);
}
