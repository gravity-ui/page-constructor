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
    PreviewBlock,
    ContentLayoutBlock,
    HeaderSliderBlock,
    IconsBlock,
    CardLayoutBlock,
    ShareBlock,
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
} from './validators/sub-blocks';

import {AnimatableProps, BackgroundProps, MenuProps, withTheme} from './validators/common';
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

    return {
        $id: 'self',
        definitions: {
            children: filteredItem({
                type: 'object',
                required: ['type'],
                properties: {
                    type: {
                        type: 'string',
                        enum: [
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
                            ...Object.keys(blocks),
                        ],
                    },
                },
                select: {$data: '0/type'},
                selectCases: {
                    ...TabsBlock,
                    ...SliderBlock,
                    ...ExtendedFeaturesBlock,
                    ...PromoFeaturesBlock,
                    ...HeaderBlock,
                    ...BannerBlock,
                    ...CompaniesBlock,
                    ...MediaBlock,
                    ...InfoBlock,
                    ...QuestionsBlock,
                    ...SecurityBlock,
                    ...TableBlock,
                    ...SimpleBlock,
                    ...LinkTableBlock,
                    ...PreviewBlock,
                    ...HeaderSliderBlock,
                    ...IconsBlock,
                    ...CardLayoutBlock,
                    ...ContentLayoutBlock,
                    ...Divider,
                    ...ShareBlock,
                    ...getBlocksCases(blocks),
                },
            }),
            cards: filteredItem({
                type: 'object',
                required: ['type'],
                properties: {
                    type: {
                        type: 'string',
                        enum: [
                            'partner',
                            'post',
                            'media-card',
                            'banner-card',
                            'price-detailed',
                            'tutoral-card',
                            'background-card',
                            'news-card',
                            'card-with-image',
                            'quote',
                            'basic-card',
                            ...Object.keys(cards),
                        ],
                    },
                },
                select: {$data: '0/type'},
                selectCases: {
                    // Cards
                    ...PartnerBlock,
                    ...MediaCardBlock,
                    ...BannerCard,
                    ...PriceDetailedBlock,
                    ...TutorialCard,
                    ...BackgroundCard,
                    ...NewsCard,
                    ...CardWithImage,
                    ...Quote,
                    ...getBlocksCases(cards),
                },
            }),
        },
        type: 'object',
        additionalProperties: false,
        required: ['blocks'],
        properties: {
            ...AnimatableProps,
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
