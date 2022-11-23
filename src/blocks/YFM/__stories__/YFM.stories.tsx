import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, BlogPostData} from '../../../models/blog';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {BlogPageContext} from '../../../contexts/BlogPageContext';
import post from '../../../../.mocks/post.json';

import {YFM, YFMProps} from '../YFM';

export default {
    title: `${BLOCKS}/YFM`,
    component: YFM,
    args: {
        theme: 'light',
    },
} as Meta;

type YFMBlockProps = {
    type: BlockType.BlogYFMBlock;
} & YFMProps;

const DefaultTemplate: Story<YFMBlockProps> = (args) => (
    <BlogPageContext.Provider value={{post: post as BlogPostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </BlogPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.BlogYFMBlock,
    paddingBottom: 'l',
    paddingTop: 'l',
    text: 'test test test test test test',
};
