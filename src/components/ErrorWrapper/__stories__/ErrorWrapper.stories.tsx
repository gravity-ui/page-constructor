import {Meta, StoryFn} from '@storybook/react';

import ErrorWrapper, {ErrorWrapperProps} from '../ErrorWrapper';

import data from './data.json';

export default {
    component: ErrorWrapper,
    title: 'Components/ErrorWrapper',
} as Meta;

const DefaultTemplate: StoryFn<ErrorWrapperProps> = (args) => <ErrorWrapper {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content;
