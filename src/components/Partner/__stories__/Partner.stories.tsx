import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import {PartnerProps} from '../../../models';
import Partner from '../Partner';
import {CARDS, COMPONENTS} from '../../../demo/constants';

export default {
    component: Partner,
    title: `${COMPONENTS}/${CARDS}/Partner`,
} as Meta;

const DefaultTemplate: Story<PartnerProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <Partner {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    text: 'Геоаналитика для управления территориями в отраслях: <b>здравоохранение</b>, экология, безопасность, градостроительство и др. Геопорталы для умных городов и регионов. ',
    logo: 'https://storage.yandexcloud.net/mkt-partners/f2epus3a5oc1np9akpln.svg',
    url: '#',
    border: 'shadow',
};
