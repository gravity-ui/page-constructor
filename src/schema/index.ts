export * from './pixel';
export * from './utils';

import {
    CardBlock,
    PartnerBlock,
    MediaCardBlock,
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
    PriceDetailedBlock,
    HeaderSliderBlock,
    IconsBlock,
    CardLayoutBlock,
    TutorialCard,
    BasicCard,
    BackgroundCard,
    NewsCard,
    CardWithImage,
    ContentLayoutBlock,
    Quote,
    dividerBlock,
} from './blocks';

import {AnimatableProps, BackgroundProps, MenuProps, withTheme} from './common';
import {filteredItem} from './utils';

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
                            'card',
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
                    ...dividerBlock,
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
                            'card',
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
                    ...CardBlock,
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
