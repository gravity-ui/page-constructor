/* eslint-disable no-param-reassign */
/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign */
import {MarkdownItPluginCb} from '@diplodoc/transform/lib/plugins/typings';
import cloneDeep from 'lodash/cloneDeep';
import shuffle from 'lodash/shuffle';

import {ConstructorBlock, PageContent} from '../models/constructor';

import {Transformer} from './common';
import {BlocksConfig, config} from './config';
import {FilterableContent, filterContent} from './filter';
import {Lang} from './types';

export type ContentVariables = Record<string, string>;
export type ContentTransformerProps = {
    content: {
        blocks?: ConstructorBlock[];
    };
    options: {
        lang: Lang;
        customConfig?: {};
        vars?: ContentVariables;
        plugins?: MarkdownItPluginCb[];
    };
};

function transformBlocks(
    blocks: ConstructorBlock[],
    lang: Lang,
    customConfig = {},
    options: {plugins?: MarkdownItPluginCb[]} = {},
) {
    const fullConfig = {...config, ...customConfig};
    const {plugins = []} = options;

    const clonedBlocks = cloneDeep(blocks);

    return clonedBlocks.map((block) => transformBlock(lang, fullConfig, block, plugins));
}

function transformBlock(
    lang: Lang,
    blocksConfig: BlocksConfig,
    block: ConstructorBlock,
    plugins: MarkdownItPluginCb[],
) {
    const blockConfig = blocksConfig[block.type];

    if (block) {
        if ('randomOrder' in block && block.randomOrder && 'children' in block && block.children) {
            block.children = shuffle(block.children as ConstructorBlock[]);
        }
    }

    if (blockConfig) {
        const configs = Array.isArray(blockConfig) ? blockConfig : [blockConfig];

        configs.forEach((transformConfig) => {
            const {fields, transformer: transformerRaw, parser, renderInline} = transformConfig;
            const transformer: Transformer = (content) =>
                // eslint-disable-next-line no-useless-call
                transformerRaw.call(null, lang, content, {plugins, renderInline});

            if (fields) {
                (fields as (keyof typeof block)[]).forEach((field) => {
                    if (block[field]) {
                        if (parser) {
                            block[field] = parser(transformer, block[field]);
                        } else if (typeof block[field] === 'string') {
                            block[field] = transformer(block[field] as string);
                        }
                    }
                });
            } else if (parser) {
                parser(transformer, block);
            }
        });
    }

    if ('children' in block && block.children) {
        block.children = transformBlocks(block.children as ConstructorBlock[], lang, blocksConfig, {
            plugins,
        });
    }

    return block;
}

export const contentTransformer = ({content, options}: ContentTransformerProps) => {
    const {lang, customConfig = {}, vars, plugins = []} = options;
    const {blocks = []} = (
        vars ? filterContent(content as FilterableContent, vars) : content
    ) as PageContent;

    const transformedBlocks = transformBlocks(blocks, lang, customConfig, {
        plugins,
    });

    return {
        blocks: transformedBlocks,
    };
};
