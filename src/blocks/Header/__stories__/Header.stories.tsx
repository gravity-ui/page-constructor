import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, PostData} from '../../../models/common';
import {HeaderProps} from '../../../models/blocks';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {PostPageContext} from '../../../contexts/PostPageContext';
import post from '../../../../.mocks/post.json';
import {getDefaultStoryArgs} from '../../../../.mocks/utils';

import {Header} from '../Header';

export default {
    title: `${BLOCKS}/Header`,
    component: Header,
    args: {
        theme: 'light',
    },
} as Meta;

type HeaderModel = {
    type: BlockType.Header;
} & HeaderProps;

const DefaultTemplate: Story<HeaderModel> = (args) => (
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Header,
    ...getDefaultStoryArgs(),
};
