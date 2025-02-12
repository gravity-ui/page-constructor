import {Meta, StoryFn} from '@storybook/react';

import MetaInfo, {MetaInfpoProps} from '../MetaInfo';

import data from './data.json';

export default {
    component: MetaInfo,
    title: 'Components/MetaInfo',
} as Meta;

const DefaultTemplate: StoryFn<MetaInfpoProps> = (args) => <MetaInfo {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as MetaInfpoProps;
