import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, BlogPostData} from '../../../models/blog';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {BlogPageContext} from '../../../contexts/BlogPageContext';
import post from '../../../../.mocks/post.json';

import {ColoredText, ColoredTextProps} from '../ColoredText';

export default {
    title: `${BLOCKS}/ColoredText`,
    component: ColoredText,
    args: {
        theme: 'light',
    },
} as Meta;

type ColoredTextStoryProps = {
    type: BlockType.BlogColoredTextBlock;
} & ColoredTextProps;

const DefaultTemplate: Story<ColoredTextStoryProps> = (args) => (
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
