import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {CONTAINERS} from '../../../demo/constants';
import Editor, {EditorProps} from '../Editor';

import data from './data.json';

export default {
    title: `${CONTAINERS}/Editor`,
    component: Editor,
} as Meta;

const DefaultTemplate: Story<EditorProps> = (args) => <Editor {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = data.default as EditorProps;
