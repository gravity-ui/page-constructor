import React from 'react';

import {PageConstructor} from '@yandex-data-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType} from '../../../models/blog';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {BlogPageContext} from '../../../contexts/BlogPageContext';
import post from '../../../../.mocks/post.json';
import suggestedPosts from '../../../../.mocks/suggestedPosts.json';

import {BlogSuggestBlock, SuggestBlockFullProps} from '../BlogSuggest';

export default {
    title: `${BLOCKS}/BlogSuggestBlock`,
    component: BlogSuggestBlock,
    args: {
        theme: 'light',
    },
} as Meta;

type SuggestBlockProps = {
    type: BlockType.BlogSuggestBlock;
} & SuggestBlockFullProps;

const DefaultTemplate: Story<SuggestBlockProps> = (args) => (
    <BlogPageContext.Provider value={{post, suggestedPosts}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </BlogPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.BlogSuggestBlock,
    paddingBottom: 'l',
    paddingTop: 'l',
};
