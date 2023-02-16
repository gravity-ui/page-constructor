import React from 'react';

import {
    PageConstructor,
    PageContent,
    PageConstructorProvider,
    PageConstructorProviderProps,
    NavigationData,
} from '@gravity-ui/page-constructor';

import {FeedContext} from '../../contexts/FeedContext';
import {LikesContext} from '../../contexts/LikesContext';

import {MetaWrapper} from '../../components/MetaWrapper/MetaWrapper';

import componentMap from '../../constructor/blocksMap';

import {
    Tag,
    PostsProps,
    ToggleLikeCallbackType,
    MetaProps,
    GetPostsType,
    SetQueryType,
    Service,
} from '../../models/common';

import './BlogPage.scss';

export type BlogPageProps = {
    content: PageContent;
    posts: PostsProps;
    tags: Tag[];
    services?: Service[];
    navigation?: NavigationData;
    getPosts: GetPostsType;
    toggleLike?: ToggleLikeCallbackType;
    metaData?: MetaProps;
    setQuery?: SetQueryType;
    settings?: PageConstructorProviderProps;
    pageCountForShowSupportButtons?: number;
};

export const BlogPage = ({
    content,
    posts,
    tags,
    services,
    getPosts,
    metaData,
    toggleLike,
    navigation,
    settings,
    pageCountForShowSupportButtons,
}: BlogPageProps) => (
    <main>
        <LikesContext.Provider
            value={{
                toggleLike: toggleLike,
                hasLikes: Boolean(toggleLike),
            }}
        >
            <FeedContext.Provider
                value={{
                    posts: posts.posts,
                    pinnedPost: posts.pinnedPost,
                    totalCount: posts.count,
                    tags,
                    services: services ?? [],
                    getPosts,
                    pageCountForShowSupportButtons,
                }}
            >
                <PageConstructorProvider {...settings}>
                    {metaData ? <MetaWrapper {...metaData} /> : null}
                    <PageConstructor
                        content={content}
                        custom={componentMap}
                        navigation={navigation}
                    />
                </PageConstructorProvider>
            </FeedContext.Provider>
        </LikesContext.Provider>
    </main>
);
