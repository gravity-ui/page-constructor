import React from 'react';

import {PageConstructor, PageContent} from '@yandex-data-ui/page-constructor';

import {BlogPostData, BlogPostMetaProps, ToggleLikeCallbackType} from '../../models/blog';

import componentMap from '../../constructor/blocksMap';

import {BlogPageContext} from '../../contexts/BlogPageContext';
import {LikesContext} from '../../contexts/LikesContext';

import {useLikes} from '../../hooks/useLikes';

import {BlogPageMeta} from './BlogPageMeta';

export interface BlogPostPageProps {
    suggestedPosts: BlogPostData[];
    metaData: BlogPostMetaProps;
    likes?: {
        hasUserLike?: boolean;
        likesCount?: number;
        toggleLike?: ToggleLikeCallbackType;
    };
    content: PageContent;
    post: BlogPostData;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
    metaData,
    suggestedPosts,
    likes,
    content,
    post,
}) => {
    const {hasUserLike, likesCount, handleLike} = useLikes({
        hasLike: likes?.hasUserLike,
        count: likes?.likesCount,
        toggleLikeCallback: likes?.toggleLike,
        postId: post?.blogPostId,
    });

    return (
        <main>
            <LikesContext.Provider
                value={{
                    toggleLike: likes?.toggleLike,
                    hasLikes: Boolean(likes),
                }}
            >
                <BlogPageContext.Provider
                    value={{
                        post,
                        suggestedPosts,
                        likes: likes
                            ? {
                                  handleUserLike: handleLike,
                                  hasUserLike,
                                  likesCount,
                              }
                            : undefined,
                    }}
                >
                    {metaData ? <BlogPageMeta {...metaData} /> : null}
                    <PageConstructor content={content} custom={componentMap} />
                </BlogPageContext.Provider>
            </LikesContext.Provider>
        </main>
    );
};
