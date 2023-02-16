import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {CONTAINERS} from '../../../demo/constants';

import page from '../../../../.mocks/blogPage.json';
import services from '../../../../.mocks/services.json';
import tags from '../../../../.mocks/tags.json';
import posts from '../../../../.mocks/posts.json';
import navigation from '../../../../.mocks/navigation.json';

import {BlogPage, BlogPageProps} from '../BlogPage';

const mockMetaComponent = <title>Blog page</title>;

export default {
    title: `${CONTAINERS}/BlogPage`,
    component: BlogPage,
    args: {
        theme: 'light',
        content: page.content,
        posts,
        services,
        tags,
        metaData: {
            needHelmetWrapper: true,
            metaComponent: mockMetaComponent,
        },
        getPosts: (props) => {
            // eslint-disable-next-line no-console
            console.log('get posts', props);
        },
        toggleLike: null,
    },
} as Meta;

const DefaultTemplate: Story<BlogPageProps> = (args) => <BlogPage {...args} />;
export const Default = DefaultTemplate.bind({});

export const WithNavigation = DefaultTemplate.bind({});
WithNavigation.args = {
    navigation,
};
