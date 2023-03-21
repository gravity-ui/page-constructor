export {validators} from './validators';
export type {ObjectSchema} from './validators/utils';

import {
    TabsBlock,
    BannerCard,
    SliderBlock,
    ExtendedFeaturesBlock,
    HeaderBlock,
    BannerBlock,
    CompaniesBlock,
    MediaBlock,
    InfoBlock,
    QuestionsBlock,
    SecurityBlock,
    TableBlock,
    SimpleBlock,
    LinkTableBlock,
    PromoFeaturesBlock,
    ContentLayoutBlock,
    HeaderSliderBlock,
    IconsBlock,
    CardLayoutBlock,
    ShareBlock,
    MapBlock,
} from './validators/blocks';

import {
    PartnerBlock,
    MediaCardBlock,
    TutorialCard,
    BackgroundCard,
    NewsCard,
    CardWithImage,
    PriceDetailedBlock,
    Quote,
    Divider,
    BasicCard,
} from './validators/sub-blocks';

import {AnimatableProps, BackgroundProps, MenuProps, withTheme} from './validators/common';
import {filteredItem} from './validators/utils';
import {LogoProps, NavigationHeaderProps} from './validators/navigation';

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
        ...SecurityBlock,
        ...TableBlock,
        ...TabsBlock,
        ...SimpleBlock,
        ...LinkTableBlock,
        ...HeaderSliderBlock,
        ...IconsBlock,
        ...CardLayoutBlock,
        ...ContentLayoutBlock,
        ...ShareBlock,
    };

    const cardValidators = {
        ...PartnerBlock,
        ...MediaCardBlock,
        ...BannerCard,
        ...PriceDetailedBlock,
        ...TutorialCard,
        ...BackgroundCard,
        ...NewsCard,
        ...CardWithImage,
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
        'security-block',
        'table-block',
        'tabs-block',
        'simple-block',
        'link-table-block',
        'preview-block',
        'price-detailed',
        'header-slider-block',
        'cards-with-image-block',
        'icons-block',
        'card-layout-block',
        'content-layout-block',
        'share-block',
    ];

    const constructorCardSchemaNames = [
        'partner',
        'media-card',
        'banner-card',
        'price-detailed',
        'tutoral-card',
        'background-card',
        'news-card',
        'card-with-image',
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
