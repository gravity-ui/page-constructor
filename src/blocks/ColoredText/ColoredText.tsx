import React from 'react';

import {BackgroundImage, Content} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';

import {PaddingsDirections} from '../../models/paddings';
import {ColoredTextProps} from '../../models/blocks';

import {updateContentSizes} from '../../utils/common';
import {block} from '../../utils/cn';

import './ColoredText.scss';

const b = block('colored-text');

export const ColoredText: React.FC<ColoredTextProps> = ({
    background,
    paddingTop,
    paddingBottom,
    ...content
}) => {
    const contentData = updateContentSizes(content);

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
        >
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
