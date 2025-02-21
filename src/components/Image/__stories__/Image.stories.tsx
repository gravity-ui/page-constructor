import {Meta, StoryFn} from '@storybook/react';

import Image, {ImageProps} from '../Image';

import data from './data.json';

export default {
    component: Image,
    title: 'Components/Pics, video, DataLens/Image',
} as Meta;

const DefaultTemplate: StoryFn<ImageProps> = (args) => <Image {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as ImageProps;
