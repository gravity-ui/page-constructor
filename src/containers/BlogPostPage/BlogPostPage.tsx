import React, {useCallback, useState} from 'react';

import {PageConstructor} from '@yandex-data-ui/page-constructor';

import {BlogPostPageData, BlogPostData, BlogMetaProps} from '../../models/blog';

import componentMap from '../../constructor/blocksMap';

import {BlogPageContext} from '../../contexts/BlogPageContext';
import {BlogPageMeta} from './BlogPageMeta';

export interface BlogPostPageProps {
    data: BlogPostPageData;
    suggestedPosts: BlogPostData[];
    metaData: BlogMetaProps;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({data, metaData, suggestedPosts}) => {
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

    return (
        <main>
            <BlogPageContext.Provider
                value={{
                    post: data.post,
                    suggestedPosts,
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
