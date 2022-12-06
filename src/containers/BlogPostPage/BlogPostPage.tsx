import React from 'react';

import {
    PageConstructor,
    PageContent,
    PageConstructorProvider,
    PageConstructorProviderProps,
} from '@gravity-ui/page-constructor';
import {ShareOptions} from '@gravity-ui/uikit';

import {BlogPostData, ToggleLikeCallbackType, MetaProps} from '../../models/blog';

import componentMap from '../../constructor/blocksMap';

import {BlogPageContext} from '../../contexts/BlogPageContext';
import {LikesContext} from '../../contexts/LikesContext';

import {useLikes} from '../../hooks/useLikes';

import {MetaWrapper} from '../../components/MetaWrapper/MetaWrapper';

import './BlogPostPage.scss';

export interface BlogPostPageProps {
    suggestedPosts: BlogPostData[];
    metaData?: MetaProps;
    likes?: {
        hasUserLike?: boolean;
        likesCount?: number;
        toggleLike?: ToggleLikeCallbackType;
    };
    content: PageContent;
    post: BlogPostData;
    settings?: PageConstructorProviderProps;
    sharingSocialNetworks?: ShareOptions[];
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
    metaData,
    suggestedPosts,
    likes,
    content,
    post,
    settings,
    sharingSocialNetworks,
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
                        sharingSocialNetworks,
                    }}
                >
                    <PageConstructorProvider {...settings}>
                        {metaData ? <MetaWrapper {...metaData} /> : null}
                        <PageConstructor content={content} custom={componentMap} />
                    </PageConstructorProvider>
                </BlogPageContext.Provider>
            </LikesContext.Provider>
        </main>
    );
};
