import React from 'react';

import {PageConstructor} from '@yandex-data-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, BlogPostData} from 'models/blog';

import customBlocks from 'constructor/blocksMap';
import {BLOCKS} from 'demo/constants';
import {BlogPageContext} from 'contexts/BlogPageContext';
import post from '@mocks/post.json';

import {BlogLayout, BlogLayoutProps} from '../BlogLayout';

export default {
    title: `${BLOCKS}/BlogLayout`,
    component: BlogLayout,
    args: {
        theme: 'light',
    },
} as Meta;

type BlogLayoutBlockProps = {
    type: BlockType.BlogLayoutBlock;
} & BlogLayoutProps;

const DefaultTemplate: Story<BlogLayoutBlockProps> = (args) => (
    <BlogPageContext.Provider value={{post: post as BlogPostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </BlogPageContext.Provider>
);

const mockChildren = <div>hi</div>;

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.BlogLayoutBlock,
    paddingBottom: 'l',
    paddingTop: 'l',
    fullWidth: true,
    children: [mockChildren],
};
