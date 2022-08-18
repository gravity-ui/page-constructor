import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {CONTAINERS} from 'demo/constants';
import {createPostData} from 'dataCreators/createPostData';
import {Lang} from 'models/locale';

import postApi from '@mocks/postApi.json';
import pageApi from '@mocks/pageApi.json';

import {BlogPostPage, BlogPostPageProps} from '../BlogPostPage';

export default {
    title: `${CONTAINERS}/BlogPostPage`,
    component: BlogPostPage,
    args: {
        theme: 'light',
    },
} as Meta;

const DefaultTemplate: Story<BlogPostPageProps> = (args) => <BlogPostPage {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    data: createPostData({
        postData: postApi,
        pageData: pageApi,
        lang: Lang.Ru,
        region: Lang.Ru,
    }),
};
