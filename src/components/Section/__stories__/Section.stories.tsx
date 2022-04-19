import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Section, {SectionProps} from '../Section';
import {COMPONENTS} from '../../../demo/constants';

export default {
    component: Section,
    title: `${COMPONENTS}/Section`,
} as Meta;

const DefaultTemplate: Story<SectionProps> = (args) => <Section {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    background: {
        image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/services/tracker/background_tracker_x2.png',
        color: '#7ccea0',
    },
    anchor: '#',
    theme: 'light',
};
