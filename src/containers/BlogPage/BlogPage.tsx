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
} from '../../models/blog';

export type BlogPageProps = {
    content: PageContent;
    posts: BlogPagePostsData;
    tags: BlogPostTagExtended[];
    services?: ServicePublic[];
    getBlogPosts: GetBlogPostsType;
    toggleLike?: ToggleLikeCallbackType;
    metaData?: BlogPageMetaProps;
};

export const BlogPage = ({
    content,
    posts,
    tags,
    services,
    getBlogPosts,
    metaData,
    toggleLike,
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
                }}
            >
                {metaData ? <MetaWrapper {...metaData} /> : null}
                <PageConstructor content={content} custom={componentMap} />
            </BlogFeedContext.Provider>
        </LikesContext.Provider>
    </main>
);
