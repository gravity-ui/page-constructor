import React, {Fragment} from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';
import {IconsBlockModel, IconsBlockProps} from '../../../models';
import Icons from '../Icons';

import data from './data.json';

export default {
    title: 'Blocks/Icons',
    component: Icons,
} as Meta;

const DefaultTemplate: StoryFn<IconsBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const WithDescriptionTemplate: StoryFn<IconsBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const SizeTemplate: StoryFn<IconsBlockModel> = (args) => (
    <Fragment>
        <DefaultTemplate title="Size S" {...args} size="s" />
        <DefaultTemplate title="Size M" {...args} size="m" />
        <DefaultTemplate title="Size L" {...args} size="l" />
    </Fragment>
);

export const Default = DefaultTemplate.bind([]);
export const Size = SizeTemplate.bind([]);
export const WithDescription = WithDescriptionTemplate.bind({});

const transformedText = yfmTransform(data.withDescription.content.description);

Default.args = data.default.content as IconsBlockProps;
Size.args = data.size.content as Omit<IconsBlockProps, 'size'>;
WithDescription.args = {
    ...data.withDescription.content,
    description: transformedText,
} as IconsBlockProps;
