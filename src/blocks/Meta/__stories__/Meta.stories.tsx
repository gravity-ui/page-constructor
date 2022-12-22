import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, PostData} from '../../../models/common';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {PostPageContext} from '../../../contexts/PostPageContext';
import post from '../../../../.mocks/post.json';

import {Meta as MetaBlock, MetaProps} from '../Meta';

export default {
    title: `${BLOCKS}/Meta`,
    component: MetaBlock,
    args: {
        theme: 'light',
    },
} as Meta;

type MetaModel = {
    type: BlockType.Meta;
} & MetaProps;

const DefaultTemplate: Story<MetaModel> = (args) => (
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Meta,
    paddingBottom: 'l',
    paddingTop: 'l',
};
