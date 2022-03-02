export * from './pixel';
export * from './utils';

// deprecated
import {
    buttonBlock,
    containerBlock,
    dividerBlock,
    featuresBlock,
    formBlock,
    headerBlock,
    headerWithImageBlock,
    imageBlock,
    linkBlock,
    quotesBlock,
    scrollableBlock,
    sectionBlock,
    shareBlock,
    tableBlock,
    tabsBlock,
    textBlock,
    tilesBlock,
    titleBlock,
} from './v1';

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
    TextTableBlock,
    SimpleBlock,
    LinkTableBlock,
    PromoFeaturesBlock,
    PreviewBlock,
    PriceDetailedBlock,
    HeaderSliderBlock,
    IconsBlock,
    CardLayoutBlock,
    TutorialCard,
    BackgroundCard,
    NewsCard,
    CardWithImage,
} from './v2';

import {AnimatableProps, BackgroundProps, MenuProps} from './common';
import {filteredItem} from './utils';

export type SchemaBlock = object;
export interface SchemaCustomConfig {
    blocks?: Record<string, SchemaBlock>;
    cards?: Record<string, SchemaBlock>;
}

export const getBlocksCases = (blocks: SchemaBlock) => {
    return Object.values(blocks).reduce((acc, block) => ({
        ...acc,
        ...block,
    }));
};

export function generateDefaultSchema(config?: SchemaCustomConfig) {
    const {cards = {}, blocks = {}} = config ?? {};

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
                            'header',
                            'header-with-image',
                            'text',
                            'section',
                            'container',
                            'button',
                            'foldable',
                            'image',
                            'share',
                            'title',
                            'divider',
                            'features',
                            'tabs',
                            'link',
                            'table',
                            'scrollable',
                            'tiles',
                            'form',
                            'quotes',
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
                            'text-table-block',
                            'tabs-block',
                            'simple-block',
                            'link-table-block',
                            'preview-block',
                            'price-detailed',
                            'header-slider-block',
                            'cards-with-image-block',
                            'icons-block',
                            'card-layout-block',
                            ...Object.keys(blocks),
                        ],
                    },
                },
                select: {$data: '0/type'},
                selectCases: {
                    // Blocks v1
                    ...headerBlock,
                    ...headerWithImageBlock,
                    ...textBlock,
                    ...titleBlock,
                    ...imageBlock,
                    ...linkBlock,
                    ...buttonBlock,
                    ...shareBlock,
                    ...tableBlock,
                    ...featuresBlock,
                    ...dividerBlock,
                    ...scrollableBlock,
                    ...containerBlock,
                    ...sectionBlock,
                    ...tabsBlock,
                    ...tilesBlock,
                    ...formBlock,
                    ...quotesBlock,

                    // Blocks v2
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
                    ...TextTableBlock,
                    ...SimpleBlock,
                    ...LinkTableBlock,
                    ...PreviewBlock,
                    ...HeaderSliderBlock,
                    ...IconsBlock,
                    ...CardLayoutBlock,
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
            form: {
                type: 'string',
                enum: ['contact-sales', 'interconnect', 'preview'],
            },
            background: BackgroundProps,
            footnotes: {
                type: 'array',
                items: {
                    type: 'string',
                },
            },
        },
    };
}
