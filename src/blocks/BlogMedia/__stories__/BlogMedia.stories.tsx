import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, BlogPostData} from '../../../models/blog';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {BlogPageContext} from '../../../contexts/BlogPageContext';
import post from '../../../../.mocks/post.json';

import {BlogMediaBlock, MediaBlockFullProps} from '../BlogMedia';

export default {
    title: `${BLOCKS}/BlogMediaBlock`,
    component: BlogMediaBlock,
    args: {
        theme: 'light',
    },
} as Meta;

type MediaBlockProps = {
    type: BlockType.BlogMediaBlock;
} & MediaBlockFullProps;

const DefaultTemplate: Story<MediaBlockProps> = (args) => (
    <BlogPageContext.Provider value={{post: post as BlogPostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </BlogPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.BlogMediaBlock,
    paddingBottom: 'l',
    paddingTop: 'l',
    text: 'Test',
    image: 'https://storage.yandexcloud.net/cloud-www-assets/blog-assets/ru/posts/2022/07/cover-digest-june.png',
};
