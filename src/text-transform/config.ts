/* eslint-disable no-param-reassign */
/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign */

import {
    BlockType,
    ContentBlockProps,
    ContentItemProps,
    ExtendedFeaturesItem,
    PriceDetailedProps,
    PriceDetailsListProps,
    PriceDetailsSettingsProps,
    PromoFeaturesItem,
    SubBlockType,
    TableProps,
    TitleItemProps,
} from '../models';

import {
    Parser,
    Transformer,
    TransformerRaw,
    createItemsParser,
    typografTransformer,
    yfmTransformer,
} from './common';

function parseTableBlock(transformer: Transformer, content: TableProps) {
    const legend = content?.legend;

    return {
        ...(content || {}),
        legend: legend && legend.map((string) => transformer(string)),
    };
}

function parseFeatures(transformer: Transformer, items: ExtendedFeaturesItem[]) {
    return items.map(({title, text, ...rest}) => ({
        title: title && transformer(title),
        text: text && transformer(text),
        ...rest,
    }));
}

function parsePromoFeatures(transformer: Transformer, items: PromoFeaturesItem[]) {
    return items.map(({text, ...rest}) => ({
        text: transformer(text),
        ...rest,
    }));
}

const parseTitle = (transformer: Transformer, title: TitleItemProps | string) =>
    typeof title === 'object' && 'text' in title
        ? {...title, text: transformer(title.text)}
        : title && transformer(title);

const parseItemsTitle = (transformer: Transformer, items: ExtendedFeaturesItem[]) =>
    items.map(({title, ...rest}) => ({
        title: title && parseTitle(transformer, title),
        ...rest,
    }));

function parsePriceDetailedBlock(transformer: Transformer, block: PriceDetailedProps) {
    const {priceType} = block;

    /* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign */
    block.items = block.items.map((item) => {
        const {description, items: details = []} = item;

        if (priceType === 'marked-list') {
            item.items = (details as PriceDetailsListProps[]).map((detail) => {
                detail.text = detail.text && transformer(detail.text);

                return detail;
            });
        } else {
            item.items = (details as PriceDetailsSettingsProps[]).map((detail) => {
                detail.description = detail.description && transformer(detail.description);

                return detail;
            });
        }

        item.description = transformer(description);

        return item;
    });
    /* eslint-enable no-not-accumulator-reassign/no-not-accumulator-reassign */

    return block;
}

const parseContentLayout = (transformer: Transformer, content: ContentBlockProps) => {
    if (content) {
        const {text, additionalInfo, list} = content;

        /* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign */
        if (text) {
            content.text = transformer(text);
        }

        if (additionalInfo) {
            content.additionalInfo = transformer(additionalInfo);
        }

        if (list) {
            content.list = list.map((item) => {
                if (item?.text) {
                    return {
                        ...item,
                        text: transformer(item.text),
                    };
                }

                return item;
            });
        }
        /* eslint-enable no-not-accumulator-reassign/no-not-accumulator-reassign */
    }

    return content;
};

function parseContentLayoutTitle(transformer: Transformer, content: ContentBlockProps) {
    if (content?.title) {
        const {title} = content;

        // eslint-disable-next-line no-not-accumulator-reassign/no-not-accumulator-reassign
        content.title = title && parseTitle(transformer, title);
    }

    return content;
}

const parseBackgroundCardItems = (transformer: Transformer, items: ContentItemProps[]) =>
    items.map(({text, ...rest}) => ({
        text: text && parseTitle(transformer, text),
        ...rest,
    }));

export const blockHeaderTransformer = [
    {
        fields: ['title'],
        transformer: typografTransformer,
        parser: parseTitle,
    },
    {
        fields: ['description', 'additionalInfo'],
        transformer: yfmTransformer,
    },
];

interface BlockConfig {
    transformer: TransformerRaw;
    fields?: string[];
    parser?: Parser;
}

export type BlocksConfig = Record<string, BlockConfig | BlockConfig[]>;

export const config: BlocksConfig = {
    [SubBlockType.BasicCard]: [
        {
            fields: ['title'],
            transformer: typografTransformer,
        },
        {
            fields: ['text', 'additionalInfo'],
            transformer: yfmTransformer,
        },
    ],
    [SubBlockType.BackgroundCard]: [
        {
            fields: ['text', 'additionalInfo'],
            transformer: yfmTransformer,
        },
        {
            fields: ['title'],
            transformer: typografTransformer,
        },
        {
            fields: ['list'],
            parser: parseBackgroundCardItems,
            transformer: typografTransformer,
        },
    ],
    [SubBlockType.ImageCard]: [
        {
            fields: ['text', 'additionalInfo'],
            transformer: yfmTransformer,
        },
        {
            fields: ['title'],
            transformer: typografTransformer,
        },
    ],
    [SubBlockType.LayoutItem]: [
        {
            fields: ['content'],
            parser: parseContentLayout,
            transformer: yfmTransformer,
        },
        {
            fields: ['content'],
            parser: parseContentLayoutTitle,
            transformer: typografTransformer,
        },
        {
            fields: ['metaInfo'],
            parser: createItemsParser([]),
            transformer: yfmTransformer,
        },
    ],
    [SubBlockType.Quote]: [
        {
            fields: ['text'],
            transformer: typografTransformer,
        },
        {
            fields: ['yfmText'],
            transformer: yfmTransformer,
        },
    ],
    [BlockType.ExtendedFeaturesBlock]: [
        ...blockHeaderTransformer,
        {
            fields: ['items'],
            transformer: typografTransformer,
            parser: createItemsParser(['title']),
        },
        {
            fields: ['items'],
            transformer: yfmTransformer,
            parser: createItemsParser(['text', 'additionalInfo']),
        },
    ],
    [BlockType.PromoFeaturesBlock]: [
        ...blockHeaderTransformer,
        {
            fields: ['items'],
            transformer: yfmTransformer,
            parser: parsePromoFeatures,
        },
    ],
    [BlockType.SliderBlock]: blockHeaderTransformer,
    [BlockType.CompaniesBlock]: blockHeaderTransformer,
    [BlockType.QuestionsBlock]: [
        {
            fields: ['title'],
            transformer: typografTransformer,
        },
        {
            fields: ['text', 'additionalInfo'],
            transformer: yfmTransformer,
        },
        {
            fields: ['items'],
            transformer: yfmTransformer,
            parser: parseFeatures,
        },
    ],
    [BlockType.FoldableListBlock]: [
        {
            fields: ['title'],
            transformer: typografTransformer,
        },
        {
            fields: ['text', 'additionalInfo'],
            transformer: yfmTransformer,
        },
        {
            fields: ['items'],
            transformer: yfmTransformer,
            parser: parseFeatures,
        },
    ],

    [BlockType.BannerBlock]: [
        {
            fields: ['title'],
            transformer: typografTransformer,
        },
        {
            fields: ['subtitle'],
            transformer: yfmTransformer,
        },
    ],
    [SubBlockType.BannerCard]: [
        {
            fields: ['title'],
            transformer: typografTransformer,
        },
        {
            fields: ['subtitle'],
            transformer: yfmTransformer,
        },
    ],
    [BlockType.MediaBlock]: [
        ...blockHeaderTransformer,
        {
            fields: ['title', 'additionalInfo'],
            transformer: yfmTransformer,
        },
        {
            fields: ['list'],
            transformer: yfmTransformer,
            parser: createItemsParser(['text']),
        },
    ],
    [BlockType.MapBlock]: [
        ...blockHeaderTransformer,
        {
            fields: ['title', 'additionalInfo'],
            transformer: yfmTransformer,
        },
    ],
    [BlockType.TabsBlock]: [
        ...blockHeaderTransformer,
        {
            fields: ['items'],
            transformer: yfmTransformer,
            parser: createItemsParser(['text', 'additionalInfo', 'caption']),
        },
        {
            fields: ['items'],
            transformer: typografTransformer,
            parser: parseItemsTitle,
        },
    ],
    [BlockType.TableBlock]: [
        {
            fields: ['table'],
            transformer: yfmTransformer,
            parser: parseTableBlock,
        },
    ],
    [BlockType.HeaderSliderBlock]: [
        {
            fields: ['items'],
            transformer: typografTransformer,
            parser: createItemsParser(['title', 'overtitle']),
        },
        {
            fields: ['items'],
            transformer: yfmTransformer,
            parser: createItemsParser(['description']),
        },
    ],
    [SubBlockType.PriceDetailed]: [
        {
            transformer: yfmTransformer,
            parser: parsePriceDetailedBlock,
        },
    ],
    [BlockType.HeaderBlock]: [
        {
            fields: ['description'],
            transformer: yfmTransformer,
        },
    ],
    [BlockType.ContentLayoutBlock]: [
        {
            fields: ['textContent'],
            transformer: yfmTransformer,
            parser: parseContentLayout,
        },
        {
            fields: ['textContent'],
            transformer: typografTransformer,
            parser: parseContentLayoutTitle,
        },
    ],
    [SubBlockType.Content]: [
        {
            fields: ['text', 'additionalInfo'],
            transformer: yfmTransformer,
        },
        {
            fields: ['title'],
            transformer: typografTransformer,
            parser: parseTitle,
        },
        {
            fields: ['list'],
            transformer: yfmTransformer,
            parser: createItemsParser(['title', 'text']),
        },
    ],
    [BlockType.InfoBlock]: [
        {
            fields: ['rightContent', 'leftContent'],
            transformer: yfmTransformer,
            parser: parseContentLayout,
        },
        {
            fields: ['rightContent', 'leftContent'],
            transformer: typografTransformer,
            parser: parseContentLayoutTitle,
        },
    ],
    [BlockType.ShareBlock]: [
        {
            fields: ['title'],
            transformer: typografTransformer,
        },
    ],
    [BlockType.CardLayoutBlock]: blockHeaderTransformer,
    [BlockType.FilterBlock]: blockHeaderTransformer,
    [BlockType.IconsBlock]: blockHeaderTransformer,
    [SubBlockType.PriceCard]: [
        {
            fields: ['title'],
            transformer: typografTransformer,
        },
        {
            fields: ['list'],
            transformer: yfmTransformer,
            parser: createItemsParser(['text']),
        },
    ],
    [BlockType.FormBlock]: [
        {
            fields: ['textContent'],
            transformer: yfmTransformer,
            parser: parseContentLayout,
        },
        {
            fields: ['textContent'],
            transformer: typografTransformer,
            parser: parseContentLayoutTitle,
        },
    ],
};
