import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import LinkTable from '../LinkTable';
import {LinkTableBlockModel, LinkTableBlockProps} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

import data from './data.json';

export default {
    component: LinkTable,
    title: 'Blocks/LinkTable',
} as Meta;

const DefaultTemplate: Story<LinkTableBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const DefaultLinksOneColumn = DefaultTemplate.bind({});
export const ThreeColumn = DefaultTemplate.bind({});
export const FileLinksTheme = DefaultTemplate.bind({});
export const UnderlineTheme = DefaultTemplate.bind({});
export const BackTheme = DefaultTemplate.bind({});

DefaultLinksOneColumn.args = data.defaultLinksOneColumn.content as LinkTableBlockProps;
ThreeColumn.args = data.threeСolumn.content as LinkTableBlockProps;
FileLinksTheme.args = data.fileLinksTheme.content as LinkTableBlockProps;
UnderlineTheme.args = data.underlineTheme.content as LinkTableBlockProps;
BackTheme.args = data.backTheme.content as LinkTableBlockProps;
