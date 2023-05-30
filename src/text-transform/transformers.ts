/* eslint-disable no-param-reassign */
/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign */
import _ from 'lodash';

import {ConstructorBlock} from '../models/constructor';
import {Lang} from '../utils/configure';

import {Transformer} from './common';
import {BlocksConfig, config} from './config';

export type ContentTransformerProps = {
    content: {
        blocks?: ConstructorBlock[];
    };
    options: {
        lang: Lang;
        customConfig?: {};
    };
};

function transformBlocks(blocks: ConstructorBlock[], lang: Lang, customConfig = {}) {
    const fullConfig = {...config, ...customConfig};

    const clonedBlocks = _.cloneDeep(blocks);

    return clonedBlocks.map((block) => transformBlock(lang, fullConfig, block));
}

function transformBlock(lang: Lang, blocksConfig: BlocksConfig, block: ConstructorBlock) {
    const blockConfig = blocksConfig[block.type];

    if (block) {
        if ('randomOrder' in block && block.randomOrder && 'children' in block && block.children) {
            block.children = _.shuffle(block.children as ConstructorBlock[]);
        }
    }

    if (blockConfig) {
        const configs = Array.isArray(blockConfig) ? blockConfig : [blockConfig];

        configs.forEach((transformConfig) => {
            const {fields, transformer: transformerRaw, parser} = transformConfig;
            const transformer: Transformer = transformerRaw.bind(null, lang);

            if (fields) {
                (fields as (keyof typeof block)[]).forEach((field) => {
                    if (block[field]) {
                        if (parser) {
                            block[field] = parser(transformer, block[field]);
                        } else if (typeof block[field] === 'string') {
                            block[field] = transformer(block[field]);
                        }
                    }
                });
            } else if (parser) {
                parser(transformer, block);
            }
        });
    }

    if ('children' in block && block.children) {
        block.children = transformBlocks(block.children as ConstructorBlock[], lang, blocksConfig);
    }

    return block;
}

export const contentTransformer = ({content, options}: ContentTransformerProps) => {
    const {lang, customConfig = {}} = options;
    const {blocks = []} = content;

    const transformedBlocks = transformBlocks(blocks, lang, customConfig);

    return {
        blocks: transformedBlocks,
    };
};
