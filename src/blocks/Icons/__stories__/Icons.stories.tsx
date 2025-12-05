import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {IconsBlock} from '../..';
import {blockTransform} from '../../../../.storybook/utils';
import {IconsBlockModel, IconsBlockProps} from '../../../models';
import Icons from '../Icons';

import data from './data.json';

export default {
    title: 'Blocks/Icons',
    component: Icons,
} as Meta;

const DefaultTemplate: StoryFn<IconsBlockModel> = (args) => {
    const transformedArgs = blockTransform(args) as IconsBlockProps;
    return (
        <div style={{padding: '64px'}}>
            <IconsBlock {...transformedArgs} />
        </div>
    );
};

const WithDescriptionTemplate: StoryFn<IconsBlockModel> = (args) => {
    const transformedArgs = blockTransform(args) as IconsBlockProps;
    return (
        <div style={{padding: '64px'}}>
            <IconsBlock {...transformedArgs} />
        </div>
    );
};

const SizeTemplate: StoryFn<IconsBlockModel> = (args) => (
    <React.Fragment>
        <DefaultTemplate title="Size S" {...args} size="s" />
        <DefaultTemplate title="Size M" {...args} size="m" />
        <DefaultTemplate title="Size L" {...args} size="l" />
    </React.Fragment>
);

const ColSizeTemplate: StoryFn<IconsBlockModel> = (args) => {
    const transformedArgs12 = blockTransform({
        ...args,
        title: 'ColSize 12',
    }) as IconsBlockProps;
    const transformedArgs8 = blockTransform({
        ...args,
        title: 'ColSize 8',
        colSizes: {all: 8},
    }) as IconsBlockProps;
    const transformedArgs4 = blockTransform({
        ...args,
        title: 'ColSize 4',
        colSizes: {all: 4},
    }) as IconsBlockProps;
    return (
        <div style={{padding: '64px'}}>
            <IconsBlock {...transformedArgs12} />
            <IconsBlock {...transformedArgs8} />
            <IconsBlock {...transformedArgs4} />
        </div>
    );
};

export const Default = DefaultTemplate.bind([]);
export const Size = SizeTemplate.bind([]);
export const WithText = WithDescriptionTemplate.bind({});
export const HeaderColSize = ColSizeTemplate.bind({});

Default.args = data.default.content as IconsBlockProps;
Size.args = data.size.content as Omit<IconsBlockProps, 'size'>;
WithText.args = data.withDescription.content as IconsBlockProps;
HeaderColSize.args = data.withDescription.content as IconsBlockProps;
