import React, {Fragment} from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';
import {IconsBlockModel, IconsBlockProps} from '../../../models';
import Icons from '../Icons';

import data from './data.json';

export default {
    title: 'Blocks/Icons',
    component: Icons,
} as Meta;

const DefaultTemplate: Story<IconsBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const SizeTemplate: Story<IconsBlockModel> = (args) => (
    <Fragment>
        <DefaultTemplate title="Size S" {...args} size="s" />
        <DefaultTemplate title="Size M" {...args} size="m" />
        <DefaultTemplate title="Size L" {...args} size="l" />
    </Fragment>
);

export const Default = DefaultTemplate.bind([]);
export const Size = SizeTemplate.bind([]);

Default.args = data.default.content as IconsBlockProps;
Size.args = data.size.content as Omit<IconsBlockProps, 'size'>;
