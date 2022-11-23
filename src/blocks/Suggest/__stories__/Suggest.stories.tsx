import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType} from '../../../models/blog';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {PostPageContext} from '../../../contexts/PostPageContext';
import post from '../../../../.mocks/post.json';
import suggestedPosts from '../../../../.mocks/suggestedPosts.json';

import {Suggest, SuggestFullProps} from '../Suggest';

export default {
    title: `${BLOCKS}/Suggest`,
    component: Suggest,
    args: {
        theme: 'light',
    },
} as Meta;

type SuggestBlockProps = {
    type: BlockType.BlogSuggestBlock;
} & SuggestFullProps;

const DefaultTemplate: Story<SuggestBlockProps> = (args) => (
    <PostPageContext.Provider value={{post, suggestedPosts}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.BlogSuggestBlock,
    paddingBottom: 'l',
    paddingTop: 'l',
};
