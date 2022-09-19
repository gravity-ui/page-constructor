import yaml from 'js-yaml';
import {transformBlocks as transformConstructorBlocks} from '@yandex-data-ui/page-constructor/server';
import {ConstructorBlock} from '@yandex-data-ui/page-constructor';

import {Lang} from '../models/locale';

import {getExtendTypographyConfig} from './config';
import {filterContent} from './contentFilter';

type TypographyConfigType = {
    [x: string]: Record<string, unknown>;
};

type TransformPageContentPropsType = {
    content: string;
    lang: Lang;
    region?: string;
    typographyConfig?: TypographyConfigType;
};

type TransformBlocksPropsType = {
    blocks: ConstructorBlock[];
    lang: Lang;
    typographyConfig?: TypographyConfigType;
};

const transformBlocks = ({blocks, lang, typographyConfig}: TransformBlocksPropsType) =>
    transformConstructorBlocks(blocks, lang, {
        ...typographyConfig,
        ...getExtendTypographyConfig(),
    });

/**
 * Func for transform blog page content
 *
 * @param content - content yaml in string
 * @param lang - runtime app lang
 * @param region - runtime app region
 * @param typographyConfig - page-constructor extend typography config
 * @returns transformed content
 */
export const transformPageContent = ({
    content,
    lang,
    region,
    typographyConfig = {},
}: TransformPageContentPropsType) => {
    try {
        const transformedContent = filterContent(yaml.load(content), {lang, region});

        if (transformedContent.blocks) {
            transformBlocks({blocks: transformedContent.blocks, lang, typographyConfig});
        }

        return transformedContent;
    } catch (err) {
        console.error('Problem when transforming page content', err);
        return {};
    }
};
