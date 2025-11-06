import {Meta, StoryFn} from '@storybook/react';

import ErrorWrapper, {ErrorWrapperProps} from '../ErrorWrapper';

import data from './data.json';

export default {
    title: 'Components/ErrorWrapper',
    component: ErrorWrapper,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        isError: {control: 'boolean'},
        text: {control: 'text'},
        buttonText: {control: 'text'},
        className: {control: 'text'},
        handler: {action: 'onRetry'},
    },
} as Meta<ErrorWrapperProps>;

const Template: StoryFn<ErrorWrapperProps> = (args) => <ErrorWrapper {...args} />;

export const Default = Template.bind({});
export const NoError = Template.bind({});
export const CustomClass = Template.bind({});
export const NoHandler = Template.bind({});
export const Interactive = Template.bind({});

Default.args = {
    ...data.default.content,
    handler: () => alert('Retry clicked!'),
};

NoError.args = {
    ...data.noError.content,
    handler: () => console.log('Should not render button'),
};

CustomClass.args = {
    ...data.customClass.content,
    handler: () => console.log('Custom class retry'),
};

NoHandler.args = {
    ...data.noHandler.content,
    handler: undefined,
};

Interactive.args = {
    text: 'Temporary error — click retry to fix',
    isError: true,
    buttonText: 'Fix',
    handler: () => window.location.reload(),
    children: 'Hidden content when error resolves',
};
