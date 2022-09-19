import React from 'react';

import {PageConstructor} from '@yandex-data-ui/page-constructor';

import {BlogFeedContext} from '../../contexts/BlogFeedContext';

import componentMap from '../../constructor/blocksMap';

export type BlogPageProps = any;

export const BlogPage = ({page, posts, tags, services, setQuery}: any) => {
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
                }}
            >
                <PageConstructor content={page?.content} custom={componentMap} />
            </BlogFeedContext.Provider>
        </main>
    );
};
