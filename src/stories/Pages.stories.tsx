import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import PAGES from './PAGES.md';
import COMMON_TYPES from './COMMON_TYPES.md';

export default {
    title: 'Страницы',
} as Meta;

export const Pages: Story = () => <div className="yfm" dangerouslySetInnerHTML={{__html: PAGES}} />;
Pages.storyName = 'Страницы';

export const CommonTypes: Story = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: COMMON_TYPES}} />
);
CommonTypes.storyName = 'Общие типы полей';
