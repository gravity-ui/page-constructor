import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import PAGE_PROPERTIES from './PAGE_PROPERTIES.md';

export default {
    title: 'Info',
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

export const PageProperties: Story = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: PAGE_PROPERTIES}} />
);
PageProperties.storyName = 'Свойства страницы'; // TODO: What are this page goals?
