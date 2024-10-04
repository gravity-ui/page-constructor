export {validators} from './validators';
export type {ObjectSchema} from './validators/utils';

import type {JSONSchema4} from 'json-schema';

import {
    blockSchemas,
    cardSchemas,
    constructorBlockSchemaNames,
    constructorCardSchemaNames,
} from './constants';
import {AnimatableProps, BackgroundProps, MenuProps, withTheme} from './validators/common';
import {LogoProps, NavigationHeaderProps} from './validators/navigation';
import {filteredItem} from './validators/utils';

export type Schema = JSONSchema4;
export type SchemaDefinitions = {
    [k: string]: Schema;
};
export interface SchemaCustomConfig {
    blocks?: Record<string, Schema>;
    cards?: Record<string, Schema>;
    extensions?: object;
}

export const getBlocksCases = (blocks: Schema) => {
    return Object.values(blocks).reduce(
        (acc, block) => ({
            ...acc,
            ...block,
        }),
        {},
    );
};

export const defaultComponentsConfigurationSchema = {
    type: 'object',
    properties: {
        ...AnimatableProps,
        logo: withTheme(LogoProps),
        header: NavigationHeaderProps,
        menu: MenuProps,
        background: withTheme(BackgroundProps),
    },
};

export function generateDefaultSchema(config?: SchemaCustomConfig) {
    const {cards = {}, blocks = {}, extensions = {}} = config ?? {};

    const configBlockSchemaNames = Object.keys(blocks).filter(
        (item) => !constructorBlockSchemaNames.includes(item),
    );

    const configCardSchemaNames = Object.keys(cards).filter(
        (item) => !constructorCardSchemaNames.includes(item),
    );

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
            ...defaultComponentsConfigurationSchema.properties,
            blocks: {
                type: 'array',
                items: {
                    $ref: '#/definitions/children',
                },
            },
            ...extensions,
        },
    } as Schema;
}
