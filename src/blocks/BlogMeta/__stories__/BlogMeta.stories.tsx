import React from 'react';

import {PageConstructor} from '@yandex-data-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, BlogPostData} from '../../../models/blog';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {BlogPageContext} from '../../../contexts/BlogPageContext';
import post from '../../../../.mocks/post.json';

import {MetaBlock, MetaBlockFullProps} from '../BlogMeta';

export default {
    title: `${BLOCKS}/MetaBlock`,
    component: MetaBlock,
    args: {
        theme: 'light',
    },
} as Meta;

type MetaBlockProps = {
    type: BlockType.BlogMetaBlock;
} & MetaBlockFullProps;

const DefaultTemplate: Story<MetaBlockProps> = (args) => (
    <BlogPageContext.Provider value={{post: post as BlogPostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </BlogPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.BlogMetaBlock,
    paddingBottom: 'l',
    paddingTop: 'l',
};
