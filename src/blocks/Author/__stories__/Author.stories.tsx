import React from 'react';

import {PageConstructor} from '@gravity-ui/page-constructor';
import {Meta, Story} from '@storybook/react/types-6-0';

import {BlockType, PostData} from '../../../models/common';
import {AuthorProps} from '../../../models/blocks';

import customBlocks from '../../../constructor/blocksMap';
import {BLOCKS} from '../../../demo/constants';
import {PostPageContext} from '../../../contexts/PostPageContext';
import post from '../../../../.mocks/post.json';

import {Author} from '../Author';

export default {
    title: `${BLOCKS}/Author`,
    component: Author,
    args: {
        theme: 'light',
    },
} as Meta;

type AuthorModel = {
    type: BlockType.Author;
} & AuthorProps;

const DefaultTemplate: Story<AuthorModel> = (args) => (
    <PostPageContext.Provider value={{post: post as PostData}}>
        <PageConstructor content={{blocks: [args]}} custom={customBlocks} />
    </PostPageContext.Provider>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.Author,
    authorId: 290,
    paddingBottom: 'l',
    paddingTop: 'l',
    image: 'https://storage.yandexcloud.net/cloud-www-assets/blog-assets/ru/posts/2022/07/cover-digest-june.png',
};
