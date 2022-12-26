import {yfmTransformer} from '@gravity-ui/page-constructor/server';
import {BlockType as PCBlockType} from '@gravity-ui/page-constructor';

import {BlockType} from '../models/common';

const BLOCKS_FOR_TYPOGRAPHY_TRANSFORM = [BlockType.YFM, BlockType.ColoredText, BlockType.Media];

type GetConfigForCreateReadableContent = () => {
    [x in BlockType | PCBlockType]: {
        fields: string[];
    };
};

/**
 *  Func for create  extended typography config for page-constructor
 *
 * @returns - {
 *      [blockTypes.YFM]: [
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
 * Func for create readable content func
 *
 * @returns - {
 *      [blockTypes.YFM]: {
 *          fields: ['text'],
 *          transformer: yfmTransformer,
 *      },
 * }
 */
export const getConfigForCreateReadableContent: GetConfigForCreateReadableContent = () =>
    BLOCKS_FOR_TYPOGRAPHY_TRANSFORM.reduce(
        (result, current) => ({
            [current]: {
                fields: ['text'],
            },
            ...result,
        }),
        {} as ReturnType<GetConfigForCreateReadableContent>,
    );
