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

const DefaultTemplate: StoryFn<IconsBlockModel> = (args) => (
    <div style={{padding: '64px'}}>
        <IconsBlock {...(blockTransform(args) as IconsBlockProps)} />
    </div>
);

const SizeTemplate: StoryFn<Record<string, IconsBlockModel>> = (args) => (
    <React.Fragment>
        {Object.entries(args)
            .map(([key, item]) => {
                const transformed = blockTransform(item) as IconsBlockProps;
                return (
                    <div key={key} style={{padding: '64px'}}>
                        <IconsBlock {...transformed} />
                    </div>
                );
            })
            .filter(Boolean)}
    </React.Fragment>
);

const ColSizeTemplate: StoryFn<Record<string, IconsBlockModel>> = (args) => (
    <div style={{padding: '64px'}}>
        {Object.entries(args)
            .map(([key, item]) => {
                const transformed = blockTransform(item) as IconsBlockProps;
                return <IconsBlock key={key} {...transformed} />;
            })
            .filter(Boolean)}
    </div>
);

export const Default = DefaultTemplate.bind({});
export const Size = SizeTemplate.bind({});
export const WithText = DefaultTemplate.bind({});
export const HeaderColSize = ColSizeTemplate.bind({});

Default.args = data.default.content as IconsBlockModel;

WithText.args = data.withDescription.content as IconsBlockModel;

const SIZES: Record<string, IconsBlockModel> = {
    size_s: {
        ...data.size.content,
        title: 'Size S',
        size: 's',
    } as IconsBlockModel,
    size_m: {
        ...data.size.content,
        title: 'Size M',
        size: 'm',
    } as IconsBlockModel,
    size_l: {
        ...data.size.content,
        title: 'Size L',
        size: 'l',
    } as IconsBlockModel,
};

Size.args = SIZES;
Size.parameters = {
    controls: {
        include: Object.keys(SIZES),
    },
};

const COL_SIZES: Record<string, IconsBlockModel> = {
    col_12: {
        ...data.withDescription.content,
        title: 'ColSize 12',
    } as IconsBlockModel,
    col_8: {
        ...data.withDescription.content,
        title: 'ColSize 8',
        colSizes: {all: 8},
    } as IconsBlockModel,
    col_4: {
        ...data.withDescription.content,
        title: 'ColSize 4',
        colSizes: {all: 4},
    } as IconsBlockModel,
};

HeaderColSize.args = COL_SIZES;
HeaderColSize.parameters = {
    controls: {
        include: Object.keys(COL_SIZES),
    },
};
