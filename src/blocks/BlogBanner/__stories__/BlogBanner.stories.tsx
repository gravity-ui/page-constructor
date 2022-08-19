import React from 'react';

import {PageConstructor} from '@yandex-data-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, BlogPostData} from 'models/blog';

import customBlocks from 'constructor/blocksMap';
import {BLOCKS} from 'demo/constants';
import {BlogPageContext} from 'contexts/BlogPageContext';
import post from '@mocks/post.json';

import {BlogBannerBlock, BannerBlockProps} from '../BlogBanner';

export default {
    title: `${BLOCKS}/BlogBannerBlock`,
    component: BlogBannerBlock,
    args: {
        theme: 'light',
    },
} as Meta;

type BlogBannerBlockProps = {
    type: BlockType.BlogBannerBlock;
} & BannerBlockProps;

const DefaultTemplate: Story<BlogBannerBlockProps> = (args) => (
    <BlogPageContext.Provider value={{post: post as BlogPostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </BlogPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.BlogBannerBlock,
    color: '#000',
    imageSize: 'm',
    paddingBottom: 'l',
    paddingTop: 'l',
    image: 'https://storage.yandexcloud.net/cloud-www-assets/blog-assets/ru/posts/2022/07/cover-digest-june.png',
};
