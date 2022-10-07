import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import BasicCard from '../BasicCard';
import {BasicCardProps} from '../../../models';
import {CARDS, COMPONENTS} from '../../../demo/constants';

import data from './data.json';

const getCardWithBorderTitle = (border: string) =>
    data.withBorder.title.replace('{{border}}', border);

export default {
    component: BasicCard,
    title: `${COMPONENTS}/${CARDS}/BasicCard`,
} as Meta;

const DefaultTemplate: Story<BasicCardProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <BasicCard {...args} />
    </div>
);

const WithIconTemplate: Story<BasicCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard
                {...args}
                icon="https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/icons/icon.svg"
            />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard
                {...args}
                icon="https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/icons/icon.svg"
            />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard
                {...args}
                icon="https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/icons/icon.svg"
                title=""
                text={data.withIcon.cardText}
            />
        </div>
    </div>
);

const WithBorderTemplate: Story<BasicCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} title={getCardWithBorderTitle('shadow')} />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} border="line" title={getCardWithBorderTitle('line')} />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} border="none" title={getCardWithBorderTitle('none')} />
        </div>
    </div>
);

export const Default = DefaultTemplate.bind({});
export const WithIcon = WithIconTemplate.bind({});
export const WithBorder = WithBorderTemplate.bind({});

Default.args = data.default.content as BasicCardProps;
WithIcon.args = data.withIcon.content as BasicCardProps;
WithBorder.args = data.withBorder.content as BasicCardProps;
