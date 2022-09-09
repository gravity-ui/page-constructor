import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {CONTAINERS} from '../../../demo/constants';

import {generatePostPageData} from '../../../../.mocks/utils';

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
    ...generatePostPageData(),
};
