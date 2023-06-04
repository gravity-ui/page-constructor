export {validators} from './validators';
export type {ObjectSchema} from './validators/utils';

import {
    blockSchemas,
    cardSchemas,
    constructorBlockSchemaNames,
    constructorCardSchemaNames,
} from './constants';
import {AnimatableProps, BackgroundProps, MenuProps, withTheme} from './validators/common';
import {LogoProps, NavigationHeaderProps} from './validators/navigation';
import {filteredItem} from './validators/utils';

export type SchemaBlock = object;

export interface SchemaCustomConfig {
    blocks?: Record<string, SchemaBlock>;
    cards?: Record<string, SchemaBlock>;
    extensions?: object;
}

export const getBlocksCases = (blocks: SchemaBlock) => {
    return Object.values(blocks).reduce(
        (acc, block) => ({
            ...acc,
            ...block,
        }),
        {},
    );
};

export function generateDefaultSchema(config?: SchemaCustomConfig) {
    const {cards = {}, blocks = {}, extensions = {}} = config ?? {};

    const configBlockSchemaNames = Object.keys(blocks).filter(
        (item) => !constructorBlockSchemaNames.includes(item),
    );

    const configCardSchemaNames = Object.keys(cards).filter(
        (item) => !constructorCardSchemaNames.includes(item),
    );

    console.log('configBlockSchemaNames', blocks);
    return {
        $id: 'self',
        definitions: {
            children: filteredItem({
                type: 'object',
                required: ['type'],
                properties: {
                    type: {
                        type: 'string',
                        enum: [...constructorBlockSchemaNames, ...configBlockSchemaNames],
                    },
                },
                select: {$data: '0/type'},
                selectCases: {
                    ...blockSchemas,
                    ...getBlocksCases(blocks),
                },
            }),
            cards: filteredItem({
                type: 'object',
                required: ['type'],
                properties: {
                    type: {
                        type: 'string',
                        enum: [...constructorCardSchemaNames, ...configCardSchemaNames],
                    },
                },
                select: {$data: '0/type'},
                selectCases: {
                    ...cardSchemas,
                    ...getBlocksCases(cards),
                },
            }),
        },
        type: 'object',
        additionalProperties: false,
        required: ['blocks'],
        properties: {
            ...AnimatableProps,
            logo: withTheme(LogoProps),
            header: NavigationHeaderProps,
            blocks: {
                type: 'array',
                items: {
                    $ref: '#/definitions/children',
                },
            },
            menu: MenuProps,
            background: withTheme(BackgroundProps),
            ...extensions,
        },
    };
}
