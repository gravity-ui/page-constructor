import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
import {ClassNameProps} from '../../../models';
import YFMWrapper, {YFMWrapperProps} from '../YFMWrapper';

import data from './data.json';

export default {
    component: YFMWrapper,
    title: 'Components/YFMWrapper',
} as Meta;

const DefaultTemplate: StoryFn<YFMWrapperProps & ClassNameProps> = (args) => (
    <YFMWrapper {...args} />
);

export const Default = DefaultTemplate.bind({});

Default.args = {...data.default.content, content: yfmTransform(data.default.content.content)};
