import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, PostData} from '../../../models/common';
import {YFMProps} from '../../../models/blocks';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {PostPageContext} from '../../../contexts/PostPageContext';
import post from '../../../../.mocks/post.json';
import {getDefaultStoryArgs} from '../../../../.mocks/utils';

import {YFM} from '../YFM';

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
    ...getDefaultStoryArgs(),
    text: '<p><strong>Lorem ipsum dolor sit amet</strong> <a href="https://example.com">consectetur adipiscing elit</a> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
};
