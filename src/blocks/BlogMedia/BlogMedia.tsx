import React from 'react';
import block from 'bem-cn-lite';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';
import {Media, MediaProps, YFMWrapper} from '@yandex-data-ui/page-constructor';

import {BlogWrapper, PaddingSize} from '../../components/BlogWrapper/BlogWrapper';

import './BlogMedia.scss';

const b = block('BlogMediaBlock');

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
                className={b('media')}
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
