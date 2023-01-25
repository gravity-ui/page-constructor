import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';
import yfm from '@doc-tools/transform';

import BasicCard from '../../BasicCard/BasicCard';
import Divider from '../Divider';
import {BlockHeader} from '../../../components';
import {BasicCardProps, DividerSize} from '../../../models';
import {COMPONENTS} from '../../../demo/constants';

import data from './data.json';

export default {
    component: BasicCard,
    title: `${COMPONENTS}/Divider`,
} as Meta;

const getSizeTitle = (size: string) => data.sizes.title.replace('{{size}}', size);
const DefaultTemplate: Story<BasicCardProps> = (args) => (
    <div>
        <BlockHeader title={data.default.title} />
        <div style={{maxWidth: '400px', marginTop: '10px'}}>
            <BasicCard {...args} />
            <Divider />
            <BasicCard {...args} />
        </div>
    </div>
);

const SizesTemplate: Story<BasicCardProps> = (args) => (
    <div>
        {data.sizes.items.map((item) => (
            <div key={item}>
                <BlockHeader title={getSizeTitle(item.toUpperCase())} />
                <div style={{maxWidth: '400px', marginTop: '10px', marginBottom: '24px'}}>
                    <BasicCard {...args} />
                    <Divider size={item as DividerSize} />
                    <BasicCard {...args} />
                </div>
            </div>
        ))}
    </div>
);

export const Default = DefaultTemplate.bind({});
export const Sizes = SizesTemplate.bind({});

const DefaultArgs = {
    ...data.default.content,
    text: yfm(data.default.content.text).result.html,
};

Default.args = {
    ...data.default.content,
    ...DefaultArgs,
} as BasicCardProps;
Sizes.args = DefaultArgs as BasicCardProps;
