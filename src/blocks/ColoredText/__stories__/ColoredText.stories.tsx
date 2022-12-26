import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, PostData} from '../../../models/common';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {PostPageContext} from '../../../contexts/PostPageContext';
import post from '../../../../.mocks/post.json';

import {ColoredText, ColoredTextProps} from '../ColoredText';

export default {
    title: `${BLOCKS}/ColoredText`,
    component: ColoredText,
    args: {
        theme: 'light',
    },
} as Meta;

type ColoredTextModel = {
    type: BlockType.ColoredText;
} & ColoredTextProps;

const DefaultTemplate: Story<ColoredTextModel> = (args) => (
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.ColoredText,
    background: {
        color: '#000',
        image: 'https://storage.yandexcloud.net/cloud-www-assets/blog-assets/ru/posts/2022/07/cover-digest-june.png',
        altText: 'test',
    },
    paddingBottom: 'l',
    paddingTop: 'l',
};
