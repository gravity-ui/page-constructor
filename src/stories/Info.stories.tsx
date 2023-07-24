import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import CHANGELOG from '../../CHANGELOG.md';
import README from '../../README.md';

export default {
    title: 'Common',
} as Meta;

export const Changelog: StoryFn = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: CHANGELOG}} />
);

export const Readme: StoryFn = () => (
    <div className="yfm" dangerouslySetInnerHTML={{__html: README}} />
);
Readme.storyName = 'About';
