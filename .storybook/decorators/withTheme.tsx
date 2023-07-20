import React from 'react';
import type {StoryFn, StoryContext} from '@storybook/react';
import {useTheme} from '../../src/context/theme';

export function withTheme(Story: StoryFn, context: StoryContext) {
    const theme = useTheme(); // eslint-disable-line react-hooks/rules-of-hooks

    return <Story {...context} />;
}
