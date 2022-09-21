import React from 'react';

import {PageConstructor} from '@yandex-data-ui/page-constructor';

import {BlogFeedContext} from '../../contexts/BlogFeedContext';

import componentMap from '../../constructor/blocksMap';

import {BlogPageMeta} from './BlogPageMeta';

export type BlogPageProps = any;

export const BlogPage = ({page, posts, tags, services, setQuery, getBlogPosts, metaData}: any) => {
    return (
        <main>
            <BlogFeedContext.Provider
                value={{
                    posts: posts.posts,
                    pinnedPost: posts.pinnedPost,
                    totalCount: posts.count,
                    tags,
                    services: services ?? [],
                    setQuery,
                    getBlogPosts,
                }}
            >
                {metaData ? <BlogPageMeta {...metaData} /> : null}
                <PageConstructor content={page?.content} custom={componentMap} />
            </BlogFeedContext.Provider>
        </main>
    );
};
