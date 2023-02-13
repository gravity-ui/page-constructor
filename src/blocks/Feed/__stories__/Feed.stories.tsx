import React from 'react';
import {isEqual} from 'lodash';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {
    BlockType,
    GetPostsRequest,
    GetPostsType,
    PostsProps,
    Service,
    Tag,
} from '../../../models/common';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import mockedPosts from '../../../../.mocks/posts.json';
import mockedServices from '../../../../.mocks/services.json';
import mockedTags from '../../../../.mocks/tags.json';
import {getDefaultStoryArgs} from '../../../../.mocks/utils';

import {Feed} from '../Feed';
import {FeedProps} from '../../../models/blocks';
import {FeedContext} from '../../../contexts/FeedContext';

export default {
    title: `${BLOCKS}/Feed`,
    component: Feed,
    args: {
        theme: 'light',
    },
} as Meta;

type FeedModel = {
    type: BlockType.Feed;
} & FeedProps;

const getPosts: GetPostsType = async (query: GetPostsRequest) => {
    const filteredPosts = mockedPosts.posts
        .filter(
            (post) =>
                !query.tags ||
                isEqual(
                    post.tags.map((tag) => tag.id.toString()),
                    query.tags.split(','),
                ),
        )
        .filter(
            (post) =>
                !query.services ||
                isEqual(
                    post.services.map((service) => service.id.toString()),
                    query.services.split(','),
                ),
        )
        .filter(
            (post) =>
                !query.search ||
                post.metaTitle.includes(query.search) ||
                post.content.includes(query.search),
        );

    return {
        ...mockedPosts,
        posts: filteredPosts,
        count: filteredPosts.length,
        totalCount: mockedPosts.totalCount,
    } as unknown as PostsProps;
};

const contextData = {
    ...mockedPosts,
    services: mockedServices as Service[],
    tags: mockedTags as Tag[],
    getPosts,
};

const DefaultTemplate: Story<FeedModel> = (args) => (
    <FeedContext.Provider value={contextData}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </FeedContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Feed,
    color: '#000',
    imageSize: 'm',
    ...getDefaultStoryArgs(),
};
