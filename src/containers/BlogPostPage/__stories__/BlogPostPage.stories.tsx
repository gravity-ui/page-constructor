import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {CONTAINERS} from 'demo/constants';

import post from '@mocks/post.json';
import page from '@mocks/page.json';
import metaData from '@mocks/metaData.json';

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
    data: {
        withPage: true,
        post: post as any,
        page,
    },
    metaData,
};
