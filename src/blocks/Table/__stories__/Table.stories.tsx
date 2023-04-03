import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {PageConstructor} from '../../../containers/PageConstructor';
import {TableBlockModel} from '../../../models';
import Table from '../Table';

import data from './data.json';

export default {
    component: Table,
    title: 'Blocks/Table',
} as Meta;

const DefaultTemplate: Story<TableBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as TableBlockModel;
