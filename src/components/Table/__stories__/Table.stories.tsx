import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Table from '../Table';
import {TableProps} from '../../../models';
import {COMPONENTS} from '../../../demo/constants';

import data from './data.json';

export default {
    component: Table,
    title: `${COMPONENTS}/Table`,
} as Meta;

const DefaultTemplate: Story<TableProps> = (args) => <Table {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as TableProps;
