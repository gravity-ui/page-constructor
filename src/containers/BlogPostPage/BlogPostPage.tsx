import React from 'react';

import {
    PageConstructor,
    PageContent,
    PageConstructorProvider,
    PageConstructorProviderProps,
} from '@gravity-ui/page-constructor';
import {ShareOptions} from '@gravity-ui/uikit';

import {PostData, ToggleLikeCallbackType, MetaProps} from '../../models/common';

import componentMap from '../../constructor/blocksMap';

import {PostPageContext} from '../../contexts/PostPageContext';
import {LikesContext} from '../../contexts/LikesContext';

import {useLikes} from '../../hooks/useLikes';

import {MetaWrapper} from '../../components/MetaWrapper/MetaWrapper';

import './BlogPostPage.scss';

export interface BlogPostPageProps {
    suggestedPosts: PostData[];
    metaData?: MetaProps;
    likes?: {
        hasUserLike?: boolean;
        likesCount?: number;
        toggleLike?: ToggleLikeCallbackType;
    };
    content: PageContent;
    post: PostData;
    settings?: PageConstructorProviderProps;
    shareOptions?: ShareOptions[];
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
    metaData,
    suggestedPosts,
    likes,
    content,
    post,
    settings,
    shareOptions,
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
                <PostPageContext.Provider
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
                        shareOptions,
                    }}
                >
                    <PageConstructorProvider {...settings}>
                        {metaData ? <MetaWrapper {...metaData} /> : null}
                        <PageConstructor content={content} custom={componentMap} />
                    </PageConstructorProvider>
                </PostPageContext.Provider>
            </LikesContext.Provider>
        </main>
    );
};
