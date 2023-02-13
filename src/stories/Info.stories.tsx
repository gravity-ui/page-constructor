import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import CHANGELOG from '../../CHANGELOG.md';
import README from '../../README.md';

export default {
    title: 'Common',
    parameters: {
        options: {
            showPanel: false,
        },
    },
} as Meta;

export const Changelog: Story = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: CHANGELOG}} />
);

export const Readme: Story = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: README}} />
);
Readme.storyName = 'About the project';
