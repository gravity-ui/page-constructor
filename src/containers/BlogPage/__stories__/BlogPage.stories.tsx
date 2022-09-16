import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {CONTAINERS} from '../../../demo/constants';

import page from '../../../../.mocks/blogPage.json';
import services from '../../../../.mocks/services.json';
import tags from '../../../../.mocks/tags.json';
import posts from '../../../../.mocks/posts.json';

import {BlogPage, BlogPageProps} from '../BlogPage';

export default {
    title: `${CONTAINERS}/BlogPage`,
    component: BlogPage,
    args: {
        theme: 'light',
    },
} as Meta;

const DefaultTemplate: Story<BlogPageProps> = (args) => <BlogPage {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    page,
    posts,
    services,
    tags,
};
