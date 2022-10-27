import React from 'react';

import {BackgroundImage, Content, ContentBlockProps} from '@gravity-ui/page-constructor';

import {BlogWrapper, PaddingSize} from '../../components/BlogWrapper/BlogWrapper';

import {checkContentDefaults} from '../../utils/blog';
import {block} from '../../utils/cn';

import './BlogColoredText.scss';

const b = block('colored-text');

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
            <div className={b('container')} style={{backgroundColor: background?.color || 'none'}}>
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
