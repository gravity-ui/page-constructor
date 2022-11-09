import _ from 'lodash';
import {
    Block,
    BlockType,
    SubBlockType,
    ContentBlockProps,
    ExtendedFeaturesItem,
    PriceDetailedProps,
    PriceDetailsListProps,
    PriceDetailsSettingsProps,
    PromoFeaturesItem,
    SliderProps,
    TableProps,
    TitleProps,
} from '../models';
import {Lang} from '../utils/configure';
import {ConstructorBlock} from '../models/constructor';
import {fullTransform, typografToHTML} from './utils';

export type ComplexItem = {[key: string]: string};
export type Item = string | null | ComplexItem;
export type TransformerRaw = (lang: Lang, content: string) => string;
export type Transformer = (text: string) => string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Parser<T = any> = (transformer: Transformer, block: T) => T;

export const createItemsParser = (fields: string[]) => (transformer: Transformer, items: Item[]) =>
    items.map((item) => {
        if (!item) {
            return item;
        } else if (typeof item === 'string') {
            return transformer(item);
        } else {
            return {
                ...item,
                ...fields.reduce<ComplexItem>((acc, fieldName) => {
                    const result = {...acc};

                    if (item[fieldName]) {
                        result[fieldName] = transformer(item[fieldName]);
                    }

                    return result;
                }, {}),
            };
        }
    });

const parseItems = createItemsParser(['title', 'text']);

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

function parseSlider(transformer: Transformer, block: SliderProps) {
    const {title, description} = block;
    block.title = {
        ...title,
        text: transformer(title ? title.text : ''),
    };

    if (description) {
        block.description = transformer(description);
    }
}

const parseTitle = (transformer: Transformer, title: TitleProps | string) =>
    typeof title === 'object' && 'text' in title
        ? {...title, text: transformer(title.text)}
        : title && transformer(title);

function parsePriceDetailedBlock(transformer: Transformer, block: PriceDetailedProps) {
    const {priceType} = block;

    const transformedBlockItems = block.items.map((item) => {
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

    block.items = transformedBlockItems;

    return block;
}

const parseContentLayout = (transformer: Transformer, content: ContentBlockProps) => {
    if (content) {
        const {text, additionalInfo} = content;

        if (text) {
            content.text = transformer(text);
        }

        if (additionalInfo) {
            content.additionalInfo = transformer(additionalInfo);
        }
    }

    return content;
};

function parseContentLayoutTitle(transformer: Transformer, content: ContentBlockProps) {
    if (content?.title) {
        const {title} = content;

        content.title = title && parseTitle(transformer, title);
    }

    return content;
}

export function yfmTransformer(lang: Lang, content: string) {
    const {html} = fullTransform(content, {lang});

    return html;
}

export function typografTransformer(lang: Lang, content: string) {
    return typografToHTML(content, lang);
}

interface BlockConfig {
    transformer: TransformerRaw;
    fields?: string[];
    parser?: Parser;
}

type BlocksConfig = Record<string, BlockConfig | BlockConfig[]>;

const config: BlocksConfig = {
    [SubBlockType.Partner]: {
        fields: ['text'],
        transformer: typografTransformer,
    },
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
    [SubBlockType.TutorialCard]: {
        fields: ['text', 'title'],
        transformer: typografTransformer,
    },
    [SubBlockType.BackgroundCard]: [
        {
            fields: ['text', 'additionalInfo'],
            transformer: yfmTransformer,
        },
        {
            fields: ['title'],
            transformer: typografTransformer,
        },
    ],
    [SubBlockType.CardWithImage]: [
        {
            fields: ['description', 'additionalInfo'],
            transformer: yfmTransformer,
        },
        {
            fields: ['title'],
            transformer: typografTransformer,
        },
    ],
    [SubBlockType.Quote]: {
        fields: ['text'],
        transformer: typografTransformer,
    },
    [BlockType.ExtendedFeaturesBlock]: [
        {
            fields: ['title'],
            transformer: typografTransformer,
            parser: parseTitle,
        },
        {
            fields: ['description'],
            transformer: yfmTransformer,
        },
        // {
        //     fields: ['items'],
        //     transformer: typografTransformer,
        //     parser: parseFeatures,
        // },
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
    [BlockType.PromoFeaturesBlock]: {
        fields: ['items'],
        transformer: yfmTransformer,
        parser: parsePromoFeatures,
    },
    [BlockType.SliderBlock]: {
        transformer: typografTransformer,
        parser: parseSlider,
    },
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
        {
            fields: ['title'],
            transformer: typografTransformer,
        },
        {
            fields: ['description', 'title', 'additionalInfo'],
            transformer: yfmTransformer,
        },
    ],
    [BlockType.TabsBlock]: [
        {
            fields: ['title'],
            transformer: typografTransformer,
            parser: parseTitle,
        },
        {
            fields: ['items'],
            transformer: yfmTransformer,
            parser: parseItems,
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
    [BlockType.SimpleBlock]: [
        {
            fields: ['description'],
            transformer: yfmTransformer,
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
    ],
    [BlockType.PreviewBlock]: [
        {
            fields: ['description'],
            transformer: yfmTransformer,
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
};

function addRandomOrder(block: ConstructorBlock) {
    if (block) {
        if ('randomOrder' in block && block.randomOrder && 'children' in block && block.children) {
            block.children = _.shuffle(block.children as ConstructorBlock[]);
        }
    }
}

function transformBlock(lang: Lang, blocksConfig: BlocksConfig, block: ConstructorBlock) {
    const blockConfig = blocksConfig[block.type];

    addRandomOrder(block as Block);

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
        transformBlocks(block.children as ConstructorBlock[], lang, blocksConfig);
    }
}

export function transformBlocks(blocks: ConstructorBlock[], lang: Lang, customConfig = {}) {
    const fullConfig = {...config, ...customConfig};

    blocks.forEach(transformBlock.bind(null, lang, fullConfig));
}

export function transformFootnotes(footnotes: string[], lang: Lang) {
    return footnotes
        .map((footnote) => fullTransform(footnote, {path: __dirname, lang, allowHTML: true}).html)
        .filter(Boolean);
}
