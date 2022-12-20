import React from 'react';

import {BackgroundImage, Content, ContentBlockProps} from '@gravity-ui/page-constructor';

import {Wrapper, PaddingSize} from '../../components/Wrapper/Wrapper';

import {updateContentSizes} from '../../utils/common';
import {block} from '../../utils/cn';

import './ColoredText.scss';

const b = block('colored-text');

type Background = {
    color?: string;
    image?: string;
    altText?: string;
};

export type ColoredTextProps = ContentBlockProps & {
    background?: Background;
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
};

export const ColoredText: React.FC<ColoredTextProps> = ({
    background,
    paddingTop,
    paddingBottom,
    ...content
}) => {
    const contentData = updateContentSizes(content);

    return (
        <Wrapper paddingTop={paddingTop} paddingBottom={paddingBottom}>
            <div
                className={b('container')}
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
        </Wrapper>
    );
};
