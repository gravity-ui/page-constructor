import React from 'react';

import {ServicePublic} from '@yandex-data-ui/cloud-schemas/build/models/ui-api';
import {
    PageConstructor,
    PageContent,
    PageConstructorProvider,
    PageConstructorProviderProps,
} from '@gravity-ui/page-constructor';

import {BlogFeedContext} from '../../contexts/BlogFeedContext';
import {LikesContext} from '../../contexts/LikesContext';

import {MetaWrapper} from '../../components/MetaWrapper/MetaWrapper';

import componentMap from '../../constructor/blocksMap';

import {
    BlogPostTagExtended,
    BlogPagePostsData,
    ToggleLikeCallbackType,
    BlogPageMetaProps,
    GetBlogPostsType,
    SetQueryType,
} from '../../models/blog';

import './BlogPage.scss';

export type BlogPageProps = {
    content: PageContent;
    posts: BlogPagePostsData;
    tags: BlogPostTagExtended[];
    services?: ServicePublic[];
    getBlogPosts: GetBlogPostsType;
    toggleLike?: ToggleLikeCallbackType;
    metaData?: BlogPageMetaProps;
    setQuery?: SetQueryType;
    settings?: PageConstructorProviderProps;
    pageCountForShowSupportButtons?: number;
};

export const BlogPage = ({
    content,
    posts,
    tags,
    services,
    getBlogPosts,
    metaData,
    toggleLike,
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
            <BlogFeedContext.Provider
                value={{
                    posts: posts.posts,
                    pinnedPost: posts.pinnedPost,
                    totalCount: posts.count,
                    tags,
                    services: services ?? [],
                    getBlogPosts,
                    pageCountForShowSupportButtons,
                }}
            >
                <PageConstructorProvider {...settings}>
                    {metaData ? <MetaWrapper {...metaData} /> : null}
                    <PageConstructor content={content} custom={componentMap} />
                </PageConstructorProvider>
            </BlogFeedContext.Provider>
        </LikesContext.Provider>
    </main>
);
