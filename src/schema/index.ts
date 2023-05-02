export {validators} from './validators';
export type {ObjectSchema} from './validators/utils';

import {
    BannerBlock,
    BannerCard,
    CardLayoutBlock,
    CompaniesBlock,
    ContentLayoutBlock,
    ExtendedFeaturesBlock,
    FilterBlock,
    HeaderBlock,
    HeaderSliderBlock,
    IconsBlock,
    InfoBlock,
    MapBlock,
    MediaBlock,
    PromoFeaturesBlock,
    QuestionsBlock,
    ShareBlock,
    SliderBlock,
    TableBlock,
    TabsBlock,
} from './validators/blocks';
import {AnimatableProps, BackgroundProps, MenuProps, withTheme} from './validators/common';
import {LogoProps, NavigationHeaderProps} from './validators/navigation';
import {
    BackgroundCard,
    BasicCard,
    Divider,
    MediaCardBlock,
    NewsCard,
    PartnerBlock,
    PriceDetailedBlock,
    Quote,
} from './validators/sub-blocks';
import {filteredItem} from './validators/utils';

export type SchemaBlock = object;

export interface SchemaCustomConfig {
    blocks?: Record<string, SchemaBlock>;
    cards?: Record<string, SchemaBlock>;
    extensions?: object;
}

export const getBlocksCases = (blocks: SchemaBlock) => {
    return Object.values(blocks).reduce((acc, block) => ({
        ...acc,
        ...block,
    }));
};

export function generateDefaultSchema(config?: SchemaCustomConfig) {
    const {cards = {}, blocks = {}, extensions = {}} = config ?? {};

    const blockValidators = {
        ...Divider,
        ...ExtendedFeaturesBlock,
        ...PromoFeaturesBlock,
        ...SliderBlock,
        ...QuestionsBlock,
        ...HeaderBlock,
        ...BannerBlock,
        ...CompaniesBlock,
        ...MediaBlock,
        ...MapBlock,
        ...InfoBlock,
        ...TableBlock,
        ...TabsBlock,
        ...HeaderSliderBlock,
        ...IconsBlock,
        ...CardLayoutBlock,
        ...ContentLayoutBlock,
        ...ShareBlock,
        ...FilterBlock,
    };

    const cardValidators = {
        ...PartnerBlock,
        ...MediaCardBlock,
        ...BannerCard,
        ...PriceDetailedBlock,
        ...BackgroundCard,
        ...NewsCard,
        ...Quote,
        ...BasicCard,
    };

    const constructorBlockSchemaNames = [
        'divider',
        'quote',
        'event',
        'post',
        'extended-features-block',
        'promo-features-block',
        'slider-block',
        'questions-block',
        'header-block',
        'banner-block',
        'companies-block',
        'media-block',
        'map-block',
        'info-block',
        'table-block',
        'tabs-block',
        'preview-block',
        'price-detailed',
        'header-slider-block',
        'cards-with-image-block',
        'icons-block',
        'card-layout-block',
        'content-layout-block',
        'share-block',
        'filter-block',
    ];

    const constructorCardSchemaNames = [
        'partner',
        'media-card',
        'banner-card',
        'price-detailed',
        'background-card',
        'news-card',
        'quote',
        'basic-card',
        'layout-item',
    ];

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
                    ...blockValidators,
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
                    ...cardValidators,
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
            footnotes: {
                type: 'array',
                items: {
                    type: 'string',
                },
            },
            ...extensions,
        },
    };
}
