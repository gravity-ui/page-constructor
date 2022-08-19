import React from 'react';
import block from 'bem-cn-lite';

import {BackgroundImage, Content, ContentBlockProps} from '@yandex-data-ui/page-constructor';

import {BlogWrapper, PaddingSize} from 'components/BlogWrapper/BlogWrapper';
import {checkContentDefaults} from 'utils/blog';

import './BlogColoredText.scss';

const b = block('BlogColoredTextBlock');

type Background = {
    color?: string;
    image?: string;
    altText?: string;
};

export type ColoredTextBlockProps = ContentBlockProps & {
    background?: Background;
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
};

export const BlogColoredTextBlock: React.FC<ColoredTextBlockProps> = ({
    background,
    paddingTop,
    paddingBottom,
    ...contentData
}) => {
    checkContentDefaults(contentData);

    return (
        <BlogWrapper paddingTop={paddingTop} paddingBottom={paddingBottom}>
            <div
                className={b('colored-text')}
                style={{backgroundColor: background?.color || 'none'}}
                data-qa="blog-colored-text-content"
            >
                <div className={b('picture-container')}>
                    {background?.image && (
                        <BackgroundImage
                            className={b('picture')}
                            alt={background?.altText}
                            src={background?.image}
                        />
                    )}
                </div>
                <div className={b('text-content')}>
                    <Content {...contentData} />
                </div>
            </div>
        </BlogWrapper>
    );
};
