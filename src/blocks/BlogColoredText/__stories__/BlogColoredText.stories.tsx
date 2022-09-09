import React from 'react';

import {PageConstructor} from '@yandex-data-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, BlogPostData} from '../../../models/blog';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {BlogPageContext} from '../../../contexts/BlogPageContext';
import post from '../../../../.mocks/post.json';

import {BlogColoredTextBlock, ColoredTextBlockProps} from '../BlogColoredText';

export default {
    title: `${BLOCKS}/BlogColoredTextBlock`,
    component: BlogColoredTextBlock,
    args: {
        theme: 'light',
    },
} as Meta;

type ColoredTextProps = {
    type: BlockType.BlogColoredTextBlock;
} & ColoredTextBlockProps;

const DefaultTemplate: Story<ColoredTextProps> = (args) => (
    <BlogPageContext.Provider value={{post: post as BlogPostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </BlogPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.BlogColoredTextBlock,
    background: {
        color: '#000',
        image: 'https://storage.yandexcloud.net/cloud-www-assets/blog-assets/ru/posts/2022/07/cover-digest-june.png',
        altText: 'test',
    },
    paddingBottom: 'l',
    paddingTop: 'l',
};
