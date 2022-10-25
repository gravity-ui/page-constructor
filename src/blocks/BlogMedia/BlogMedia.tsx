import React from 'react';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';
import {Media, MediaProps, YFMWrapper} from '@gravity-ui/page-constructor';

import {BlogWrapper, PaddingSize} from '../../components/BlogWrapper/BlogWrapper';

import {block} from '../../utils/cn';

import './BlogMedia.scss';

const b = block('blog-media');

type MediaBlockProps = Partial<
    Pick<MediaProps, 'youtube' | 'previewImg' | 'image' | 'video' | 'dataLens'>
> & {
    text?: string;
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
};

export type MediaBlockFullProps = MediaBlockProps & ClassNameProps;

export const BlogMediaBlock: React.FC<MediaBlockFullProps> = ({
    youtube,
    image,
    video,
    dataLens,
    text,
    previewImg,
    paddingTop,
    paddingBottom,
}) => (
    <BlogWrapper paddingTop={paddingTop} paddingBottom={paddingBottom} className={b('content')}>
        <div className={b('border')} data-qa="blog-media-content">
            <Media
                className={b('media-content')}
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
    </BlogWrapper>
);
