import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {TableProps} from '../../../models';
import Table from '../Table';

import data from './data.json';

export default {
    component: Table,
    title: 'Components/Table',
} as Meta;

const DefaultTemplate: StoryFn<TableProps> = (args) => <Table {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as TableProps;
