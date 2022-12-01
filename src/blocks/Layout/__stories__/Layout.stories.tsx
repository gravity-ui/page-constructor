import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, BlogPostData} from '../../../models/common';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {PostPageContext} from '../../../contexts/PostPageContext';
import post from '../../../../.mocks/post.json';

import {Layout, LayoutProps} from '../Layout';

export default {
    title: `${BLOCKS}/Layout`,
    component: Layout,
    args: {
        theme: 'light',
    },
} as Meta;

type LayoutModel = {
    type: BlockType.Layout;
} & LayoutProps;

const DefaultTemplate: Story<LayoutModel> = (args) => (
    <PostPageContext.Provider value={{post: post as BlogPostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

const mockChildren = <div>hi</div>;

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Layout,
    paddingBottom: 'l',
    paddingTop: 'l',
    fullWidth: true,
    children: [mockChildren],
};
