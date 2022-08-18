import React, {useCallback, useMemo, useState} from 'react';

import {PageConstructor} from '@yandex-data-ui/page-constructor';

import {BlogPostPageData} from 'models/blog';

import componentMap from 'constructor/blocksMap';

import {BlogPageContext} from 'contexts/BlogPageContext';
// import {getBlogPost} from 'units/blog/api';
// import {LocaleData} from 'contexts/LocaleContext';
// import {InitialContext, PageConfigProps, PageStaticProps} from 'models/app';
import {BlogMetaProps, BlogPageMeta} from './BlogPageMeta';
// import {getPageConfig} from 'utils';

import 'styles/yfm.scss';

// to make constructor yfm styles have higher priority than local
import '@yandex-data-ui/page-constructor/styles/yfm.scss';

export interface BlogPostPageProps {
    data: BlogPostPageData;
}

export const BlogPostPage: React.FC<PageProps> = ({data}) => {
    const [hasUserLike, setHasUserLike] = useState(data?.post?.hasUserLike);
    const [likesCount, setLikesCount] = useState(data?.post?.likes);

    const handleUserLike = useCallback(() => {
        let likes = likesCount || 0;

        if (hasUserLike && likes > 0) {
            likes--;
        }

        if (!hasUserLike) {
            likes++;
        }

        setHasUserLike(!hasUserLike);
        setLikesCount(likes);
    }, [hasUserLike, likesCount]);

    const metaData = useMemo<BlogMetaProps>(() => {
        const {page, post} = data;

        return {
            title: page?.title || post?.title,
            textTitle: post?.title,
            description: page?.metaDescription || post?.description,
            date: post?.date,
            image: post?.image,
            content: page?.content,
            shareTitle: page?.shareTitle || post?.title,
            shareDescription: page?.shareDescription || post?.description,
            shareImage: page?.shareImage || post?.image,
            legacySharingImage: post?.legacySharingImage,
            metaDescription: page?.metaDescription || post?.description,
            keywords: page?.keywords,
            noIndex: page?.noIndex || post?.noIndex,
            authors: post?.authors,
            tags: post?.tags,
        };
    }, [data]);

    return (
        <main>
            <BlogPageContext.Provider
                value={{
                    post: data.post,
                    likes: {
                        handleUserLike: handleUserLike,
                        hasUserLike: Boolean(hasUserLike),
                        likesCount: likesCount ?? 0,
                    },
                }}
            >
                <BlogPageMeta {...metaData} />
                <PageConstructor content={data?.page.content} custom={componentMap} />
            </BlogPageContext.Provider>
        </main>
    );
};
