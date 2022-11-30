import React from 'react';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';
import {
    Media as PCMedia,
    MediaProps as PCMediaProps,
    YFMWrapper,
} from '@gravity-ui/page-constructor';

import {Wrapper, PaddingSize} from '../../components/Wrapper/Wrapper';

import {block} from '../../utils/cn';

import './Media.scss';

const b = block('media');

type MediaProps = Partial<
    Pick<PCMediaProps, 'youtube' | 'previewImg' | 'image' | 'video' | 'dataLens'>
> & {
    text?: string;
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
};

export type MediaFullProps = MediaProps & ClassNameProps;

export const Media: React.FC<MediaFullProps> = ({
    youtube,
    image,
    video,
    dataLens,
    text,
    previewImg,
    paddingTop,
    paddingBottom,
}) => (
    <Wrapper paddingTop={paddingTop} paddingBottom={paddingBottom} className={b('container')}>
        <div className={b('border')}>
            <PCMedia
                className={b('content')}
                videoClassName={b('video')}
                imageClassName={b('image')}
                video={video}
                youtube={youtube}
                image={image}
                dataLens={dataLens}
                previewImg={previewImg}
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
