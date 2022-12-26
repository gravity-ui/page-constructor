import React from 'react';

import {Media as PCMedia, YFMWrapper} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';

import {PaddingsDirections} from '../../models/paddings';
import {MediaProps} from '../../models/blocks';

import {block} from '../../utils/cn';

import './Media.scss';

const b = block('media');

export const Media: React.FC<MediaProps> = ({text, paddingTop, paddingBottom, ...mediaProps}) => (
    <Wrapper
        paddings={{
            [PaddingsDirections.top]: paddingTop,
            [PaddingsDirections.bottom]: paddingBottom,
        }}
        className={b('container')}
    >
        <div className={b('border')} data-qa="blog-media-content">
            <PCMedia
                className={b('content')}
                videoClassName={b('video')}
                imageClassName={b('image')}
                {...mediaProps}
            />
        </div>
        {text && (
            <div className={b('text-content')}>
                <YFMWrapper
                    content={text}
                    modifiers={{
                        blogMedia: true,
                        resetPaddings: true,
                    }}
                />
            </div>
        )}
    </Wrapper>
);
