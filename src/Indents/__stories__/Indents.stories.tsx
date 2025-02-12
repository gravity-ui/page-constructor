import {Meta, StoryFn} from '@storybook/react';

import {CardLayoutBlock} from '../../blocks';
import {PageConstructor} from '../../containers/PageConstructor';
import {CardLayoutBlockModel, CardLayoutBlockProps} from '../../models';
import {block} from '../../utils';

import data from './data.json';

import './Indents.stories.scss';

export default {
    title: 'Block Indents/Sizes',
    component: CardLayoutBlock,
} as Meta;

const b = block('indents-wrapper');

const Template: StoryFn<CardLayoutBlockModel> = (args) => (
    <div className={b()}>
        <PageConstructor
            content={{
                blocks: [{...args}],
            }}
        />
    </div>
);

export const Zero = Template.bind({});
export const XS = Template.bind({});
export const S = Template.bind({});
export const M = Template.bind({});
export const L = Template.bind({});
export const XL = Template.bind({});

Zero.args = {
    ...data.default,
    title: 'Card layout with layout items with zero indents at the top and bottom',
    indent: {
        top: '0',
        bottom: '0',
    },
} as CardLayoutBlockProps;

XS.args = {
    ...data.default,
    title: 'Card layout with layout items with XS indents at the top and bottom',
    indent: {
        top: 'xs',
        bottom: 'xs',
    },
} as CardLayoutBlockProps;

S.args = {
    ...data.default,
    title: 'Card layout with layout items with S indents at the top and bottom',
    indent: {
        top: 's',
        bottom: 's',
    },
} as CardLayoutBlockProps;

M.args = {
    ...data.default,
    title: 'Card layout with layout items with M indents at the top and bottom',
    indent: {
        top: 'm',
        bottom: 'm',
    },
} as CardLayoutBlockProps;

L.args = {
    ...data.default,
    title: 'Card layout with layout items with L (default) indents at the top and bottom',
    indent: {
        top: 'l',
        bottom: 'l',
    },
} as CardLayoutBlockProps;

XL.args = {
    ...data.default,
    title: 'Card layout with layout items with XL indents at the top and bottom',
    indent: {
        top: 'xl',
        bottom: 'xl',
    },
} as CardLayoutBlockProps;
