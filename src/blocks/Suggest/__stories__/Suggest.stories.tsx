import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType} from '../../../models/common';
import {SuggestProps} from '../../../models/blocks';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {PostPageContext} from '../../../contexts/PostPageContext';
import post from '../../../../.mocks/post.json';
import suggestedPosts from '../../../../.mocks/suggestedPosts.json';

import {Suggest} from '../Suggest';

export default {
    title: `${BLOCKS}/Suggest`,
    component: Suggest,
    args: {
        theme: 'light',
    },
} as Meta;

type SuggestModel = {
    type: BlockType.Suggest;
} & SuggestProps;

const DefaultTemplate: Story<SuggestModel> = (args) => (
    <PostPageContext.Provider value={{post, suggestedPosts}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Suggest,
    paddingBottom: 'l',
    paddingTop: 'l',
};
