import React from 'react';

import {ServicePublic} from '@yandex-data-ui/cloud-schemas/build/models/ui-api';
import {PageConstructor, PageContent} from '@yandex-data-ui/page-constructor';

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

export type BlogPageProps = {
    content: PageContent;
    posts: BlogPagePostsData;
    tags: BlogPostTagExtended[];
    services?: ServicePublic[];
    getBlogPosts: GetBlogPostsType;
    toggleLike?: ToggleLikeCallbackType;
    metaData?: BlogPageMetaProps;
    setQuery?: SetQueryType;
};

export const BlogPage = ({
    content,
    posts,
    tags,
    services,
    getBlogPosts,
    metaData,
    toggleLike,
    setQuery,
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
                    setQuery,
                }}
            >
                {metaData ? <MetaWrapper {...metaData} /> : null}
                <PageConstructor content={content} custom={componentMap} />
            </BlogFeedContext.Provider>
        </LikesContext.Provider>
    </main>
);
