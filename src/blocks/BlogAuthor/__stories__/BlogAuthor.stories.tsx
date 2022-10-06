import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, BlogPostData} from '../../../models/blog';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {BlogPageContext} from '../../../contexts/BlogPageContext';
import post from '../../../../.mocks/post.json';

import {BlogAuthorBlock, AuthorBlockFullProps} from '../BlogAuthor';

export default {
    title: `${BLOCKS}/BlogAuthorBlock`,
    component: BlogAuthorBlock,
    args: {
        theme: 'light',
    },
} as Meta;

type AuthorBlockModel = {
    type: BlockType.BlogAuthorBlock;
} & AuthorBlockFullProps;

const DefaultTemplate: Story<AuthorBlockModel> = (args) => (
    <BlogPageContext.Provider value={{post: post as BlogPostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </BlogPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.BlogAuthorBlock,
    authorId: 290,
    paddingBottom: 'l',
    paddingTop: 'l',
    image: 'https://storage.yandexcloud.net/cloud-www-assets/blog-assets/ru/posts/2022/07/cover-digest-june.png',
};
