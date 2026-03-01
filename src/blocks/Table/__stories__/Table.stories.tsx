import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {TableBlockModel, TableBlockProps} from '../../../models';
import Table, {TableBlock} from '../Table';

import data from './data.json';

export default {
    component: Table,
    title: 'Blocks/Table',
} as Meta;

const DefaultTemplate: StoryFn<TableBlockModel> = (args) => (
    <TableBlock {...(blockTransform(args) as TableBlockProps)} />
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as TableBlockModel;

export const Tick = DefaultTemplate.bind({});

Tick.args = data.tick.content as TableBlockModel;
