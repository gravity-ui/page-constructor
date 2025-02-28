/* eslint-disable no-param-reassign */
/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign */

import {
    BlockType,
    ContentBlockProps,
    ExtendedFeaturesItem,
    PriceDetailedProps,
    PriceDetailsListProps,
    PriceDetailsSettingsProps,
    PromoFeaturesItem,
    SubBlockType,
    TableProps,
    TitleItemProps,
} from '../models';

import {Parser, Transformer, TransformerRaw, createItemsParser, yfmTransformer} from './common';

function parseTableBlockLegend(transformer: Transformer, content: TableProps) {
    const legend = content?.legend;

    return {
        ...(content || {}),
        legend: legend && legend.map((string) => transformer(string)),
    };
}

function parseTableBlockContent(transformer: Transformer, content: TableProps) {
    const legend = content?.legend;
    const tableContent = content?.content;

    return {
        ...(content || {}),
        content:
            tableContent &&
            tableContent.map((row, i) =>
                row.map((cell, j) => {
                    if (legend) {
                        if (i === 0 || j === 0) {
                            return transformer(cell);
                        }
                        return cell;
                    } else {
                        return transformer(cell);
                    }
                }),
            ),
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

export const blockHeaderTransformer = [
    {
        fields: ['title'],
        transformer: yfmTransformer,
        parser: parseTitle,
        renderInline: true,
    },
    {
        fields: ['description'],
        transformer: yfmTransformer,
    },
];

interface BlockConfig {
    transformer: TransformerRaw;
    fields?: string[];
    parser?: Parser;
    renderInline?: boolean;
}

export type BlocksConfig = Record<string, BlockConfig | BlockConfig[]>;

export const config: BlocksConfig = {
    [SubBlockType.BasicCard]: [
        {
            fields: ['title'],
            transformer: yfmTransformer,
            renderInline: true,
        },
        {
            fields: ['text', 'additionalInfo'],
            transformer: yfmTransformer,
        },
    ],
    [SubBlockType.BackgroundCard]: [
        {
            fields: ['title', 'text', 'additionalInfo'],
            transformer: yfmTransformer,
            renderInline: true,
        },
    ],
    [SubBlockType.ImageCard]: [
        {
            fields: ['title', 'text', 'additionalInfo'],
            transformer: yfmTransformer,
            renderInline: true,
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
            transformer: yfmTransformer,
            renderInline: true,
        },
        {
            fields: ['metaInfo'],
            parser: createItemsParser([]),
            transformer: yfmTransformer,
        },
    ],
    [SubBlockType.Quote]: [
        {
            fields: ['text', 'yfmText'],
            transformer: yfmTransformer,
            renderInline: true,
        },
    ],
    [BlockType.ExtendedFeaturesBlock]: [
        ...blockHeaderTransformer,
        {
            fields: ['items'],
            transformer: yfmTransformer,
            parser: createItemsParser(['title']),
            renderInline: true,
        },
        {
            fields: ['items'],
            transformer: yfmTransformer,
            parser: createItemsParser(['text', 'additionalInfo']),
        },
        {
            fields: ['items'],
            transformer: yfmTransformer,
            parser: createItemsParser(['list.text']),
            renderInline: true,
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
    [BlockType.SliderOldBlock]: blockHeaderTransformer,
    [BlockType.SliderBlock]: blockHeaderTransformer,
    [BlockType.CompaniesBlock]: blockHeaderTransformer,
    [BlockType.QuestionsBlock]: [
        {
            fields: ['title', 'text', 'additionalInfo'],
            transformer: yfmTransformer,
            renderInline: true,
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
            transformer: yfmTransformer,
            renderInline: true,
        },
        {
            fields: ['subtitle'],
            transformer: yfmTransformer,
        },
    ],
    [SubBlockType.BannerCard]: [
        {
            fields: ['title'],
            transformer: yfmTransformer,
            renderInline: true,
        },
        {
            fields: ['subtitle'],
            transformer: yfmTransformer,
        },
    ],
    [BlockType.MediaBlock]: [
        ...blockHeaderTransformer,
        {
            fields: ['additionalInfo'],
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
            transformer: yfmTransformer,
            parser: parseItemsTitle,
            renderInline: true,
        },
    ],
    [BlockType.TableBlock]: [
        {
            fields: ['title'],
            transformer: yfmTransformer,
            renderInline: true,
        },
        {
            fields: ['table'],
            transformer: yfmTransformer,
            parser: parseTableBlockLegend,
        },
        {
            fields: ['table'],
            transformer: yfmTransformer,
            parser: parseTableBlockContent,
            renderInline: true,
        },
    ],
    [BlockType.HeaderSliderBlock]: [
        {
            fields: ['items'],
            transformer: yfmTransformer,
            parser: createItemsParser(['title', 'overtitle', 'description']),
            renderInline: true,
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
        {
            fields: ['overtitle', 'title'],
            transformer: yfmTransformer,
            renderInline: true,
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
            transformer: yfmTransformer,
            parser: parseContentLayoutTitle,
            renderInline: true,
        },
    ],
    [SubBlockType.Content]: [
        {
            fields: ['text', 'additionalInfo'],
            transformer: yfmTransformer,
        },
        {
            fields: ['title'],
            transformer: yfmTransformer,
            parser: parseTitle,
            renderInline: true,
        },
        {
            fields: ['list'],
            transformer: yfmTransformer,
            parser: createItemsParser(['title', 'text']),
        },
    ],
    [BlockType.InfoBlock]: [
        {
            fields: ['title'],
            transformer: yfmTransformer,
            renderInline: true,
        },
        {
            fields: ['rightContent', 'leftContent'],
            transformer: yfmTransformer,
            parser: parseContentLayout,
        },
        {
            fields: ['rightContent', 'leftContent'],
            transformer: yfmTransformer,
            parser: parseContentLayoutTitle,
            renderInline: true,
        },
    ],
    [BlockType.ShareBlock]: [
        {
            fields: ['title'],
            transformer: yfmTransformer,
            renderInline: true,
        },
    ],
    [BlockType.CardLayoutBlock]: blockHeaderTransformer,
    [BlockType.FilterBlock]: blockHeaderTransformer,
    [BlockType.IconsBlock]: blockHeaderTransformer,
    [SubBlockType.PriceCard]: [
        {
            fields: ['title'],
            transformer: yfmTransformer,
            renderInline: true,
        },
        {
            fields: ['list'],
            transformer: yfmTransformer,
            parser: createItemsParser(['title', 'text']),
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
            transformer: yfmTransformer,
            parser: parseContentLayoutTitle,
            renderInline: true,
        },
    ],
};
