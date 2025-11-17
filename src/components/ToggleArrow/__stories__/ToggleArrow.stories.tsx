import {Meta, StoryFn, StoryObj} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {CustomBlock} from '../../../models';
import ToggleArrow, {ToggleArrowProps} from '../ToggleArrow';

import data from './data.json';

export default {
    title: 'Components/ToggleArrow',
    component: ToggleArrow,
    parameters: {
        layout: 'centered',
        controls: {expanded: true},
    },
} as Meta<typeof ToggleArrow>;

const Template: StoryFn<ToggleArrowProps> = (args) => (
    <ToggleArrow {...(blockTransform(args as unknown as CustomBlock) as ToggleArrowProps)} />
);

export const Default: StoryObj<typeof ToggleArrow> = Template.bind({});
export const Horizontal: StoryObj<typeof ToggleArrow> = Template.bind({});
export const Vertical: StoryObj<typeof ToggleArrow> = Template.bind({});
export const OpenHorizontal: StoryObj<typeof ToggleArrow> = Template.bind({});
export const OpenVertical: StoryObj<typeof ToggleArrow> = Template.bind({});
export const Thin: StoryObj<typeof ToggleArrow> = Template.bind({});
export const Slow: StoryObj<typeof ToggleArrow> = Template.bind({});
export const ThinSlow: StoryObj<typeof ToggleArrow> = Template.bind({});
export const NavigationIcon: StoryObj<typeof ToggleArrow> = Template.bind({});
export const AllVariants: StoryObj<typeof ToggleArrow> = Template.bind({});

Default.args = {type: 'horizontal', iconType: 'default', size: 24};
Horizontal.args = data.horizontal.content as ToggleArrowProps;
Vertical.args = data.vertical.content as ToggleArrowProps;
OpenHorizontal.args = {type: 'horizontal', open: true, size: 24};
OpenVertical.args = {type: 'vertical', open: true, size: 24};
Thin.args = {type: 'horizontal', thin: true, size: 24};
Slow.args = {type: 'horizontal', slow: true, size: 24};
ThinSlow.args = {type: 'horizontal', thin: true, slow: true, size: 24};
NavigationIcon.args = {type: 'horizontal', iconType: 'navigation', size: 30};

AllVariants.args = {};
AllVariants.decorators = [
    () => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, auto)',
                gap: '24px',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <ToggleArrow type="horizontal" />
            <ToggleArrow type="horizontal" open />
            <ToggleArrow type="vertical" />
            <ToggleArrow type="vertical" open />
            <ToggleArrow type="horizontal" thin />
            <ToggleArrow type="horizontal" thin open />
            <ToggleArrow type="horizontal" slow />
            <ToggleArrow type="horizontal" slow open />
            <ToggleArrow type="horizontal" iconType="navigation" />
            <ToggleArrow type="horizontal" iconType="navigation" open />
            <ToggleArrow type="vertical" iconType="navigation" />
            <ToggleArrow type="vertical" iconType="navigation" open />
        </div>
    ),
];
