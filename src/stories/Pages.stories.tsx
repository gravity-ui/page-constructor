import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import COMMON_TYPES from './COMMON_TYPES.md';
import CONTAINERS from './CONTAINERS.md';
import BLOCKS_V2 from './BLOCKS_V2.md';
import COMPONENTS from './COMPONENTS.md';
import PAGE_PROPERTIES from './PAGE_PROPERTIES.md';

export default {
    title: 'Информация',
    parameters: {
        options: {
            showPanel: false,
        },
        previewTabs: {
            'storybook/docs/panel': {
                hidden: true,
            },
        },
    },
} as Meta;

export const Containers: Story = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: CONTAINERS}} />
);
Containers.storyName = 'Контейнеры';

export const BlocksV2: Story = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: BLOCKS_V2}} />
);
BlocksV2.storyName = 'Блоки версии 2';

export const Components: Story = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: COMPONENTS}} />
);
Components.storyName = 'Components';

export const CommonTypes: Story = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: COMMON_TYPES}} />
);
CommonTypes.storyName = 'Общие типы полей';

export const PageProperties: Story = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: PAGE_PROPERTIES}} />
);
PageProperties.storyName = 'Свойства страницы';
