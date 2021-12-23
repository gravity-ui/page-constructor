import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BlockType, ExtendedFeaturesBlockModel} from '../../../models';
import ExtendedFeatures from '../ExtendedFeatures';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    title: 'Компоненты/ExtendedFeatures',
    component: ExtendedFeatures,
} as Meta;

const DefaultTemplate: Story<ExtendedFeaturesBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);
export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.ExtendedFeaturesBlock,
    title: 'Executive leads',
    description: 'Executive leads',
    items: [
        {
            title: 'Реализуйте проекты',
            text: 'Развивайте экспертизу и предоставляйте сервисы в рамках комплексных проектов.',
            icon: 'https://storage.yandexcloud.net/cloud-www-assets/cloud-professionals/yc-professionals-check.svg',
        },
        {
            title: 'Реализуйте проекты',
            text: 'Развивайте экспертизу и предоставляйте сервисы в рамках комплексных проектов.',
            icon: 'https://storage.yandexcloud.net/cloud-www-assets/cloud-professionals/yc-professionals-check.svg',
        },
    ],
};
