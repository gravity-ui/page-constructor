import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, PostData} from '../../../models/common';
import {LayoutProps} from '../../../models/blocks';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {PostPageContext} from '../../../contexts/PostPageContext';
import post from '../../../../.mocks/post.json';
import layoutBlock from '../../../../.mocks/layoutBlock.json';
import {getDefaultStoryArgs} from '../../../../.mocks/utils';

import {Layout} from '../Layout';

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
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Layout,
    ...getDefaultStoryArgs(),
    children: layoutBlock.children,
};
