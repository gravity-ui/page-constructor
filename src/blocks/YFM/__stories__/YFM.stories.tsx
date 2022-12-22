import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, PostData} from '../../../models/common';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {PostPageContext} from '../../../contexts/PostPageContext';
import post from '../../../../.mocks/post.json';

import {YFM, YFMProps} from '../YFM';

export default {
    title: `${BLOCKS}/YFM`,
    component: YFM,
    args: {
        theme: 'light',
    },
} as Meta;

type YFMModel = {
    type: BlockType.YFM;
} & YFMProps;

const DefaultTemplate: Story<YFMModel> = (args) => (
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.YFM,
    paddingBottom: 'l',
    paddingTop: 'l',
    text: 'test test test test test test',
};
