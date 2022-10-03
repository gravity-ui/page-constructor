import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Simple from '../Simple';
import {SimpleBlockModel, SimpleBlockProps} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

import data from './data.json';

export default {
    component: Simple,
    title: 'Blocks/Simple',
} as Meta;

const DefaultTemplate: Story<SimpleBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as SimpleBlockProps;
