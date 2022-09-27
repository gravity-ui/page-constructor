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
    SetQueryType,
} from '../../models/blog';

export type BlogPageProps = {
    content: PageContent;
    posts: BlogPagePostsData;
    tags: BlogPostTagExtended[];
    services?: ServicePublic[];
    // TODO fix any in https://st.yandex-team.ru/ORION-1447
    setQuery: SetQueryType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getBlogPosts: (props: any) => void;
    toggleLike?: ToggleLikeCallbackType;
    metaData?: BlogPageMetaProps;
};

export const BlogPage = ({
    content,
    posts,
    tags,
    services,
    setQuery,
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
                    setQuery,
                    getBlogPosts,
                }}
            >
                {metaData ? <MetaWrapper {...metaData} /> : null}
                <PageConstructor content={content} custom={componentMap} />
            </BlogFeedContext.Provider>
        </LikesContext.Provider>
    </main>
);
