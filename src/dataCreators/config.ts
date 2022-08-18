import {yfmTransformer} from '@yandex-data-ui/page-constructor/server';

import {BlockType} from 'models/blog';

const BLOCKS_FOR_TYPOGRAPHY_TRANSFORM = [
    BlockType.BlogYFMBlock,
    BlockType.BlogColoredTextBlock,
    BlockType.BlogMediaBlock,
];

type GetCreateReadableConfigType = () => {
    [x in BlockType.BlogYFMBlock | BlockType.BlogColoredTextBlock | BlockType.BlogMediaBlock]: {
        fields: string[];
    };
};

/**
 *  Func for create  extended typography config for page-constructor
 *
 * @returns - {
 *      [blockTypes.BlogYfmBlock]: [
 *           {
 *              fields: ['text'],
 *              transformer: yfmTransformer,
 *          },
 *     ],
 * }
 */
export const getExtendTypographyConfig = () =>
    BLOCKS_FOR_TYPOGRAPHY_TRANSFORM.reduce(
        (result, current) => ({
            [current]: [
                {
                    fields: ['text'],
                    transformer: yfmTransformer,
                },
            ],
            ...result,
        }),
        {},
    );

/**
 * Func for create config for create readable content func
 *
 * @returns - {
 *      [blockTypes.BlogYfmBlock]: {
 *          fields: ['text'],
 *          transformer: yfmTransformer,
 *      },
 * }
 */
export const getCreateReadableConfig: GetCreateReadableConfigType = () =>
    BLOCKS_FOR_TYPOGRAPHY_TRANSFORM.reduce(
        (result, current) => ({
            [current]: {
                fields: ['text'],
            },
            ...result,
        }),
        {} as ReturnType<GetCreateReadableConfigType>,
    );
