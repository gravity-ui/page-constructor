import React from 'react';
import {Story as StoryType, StoryContext} from '@storybook/react/types-6-0';
import {useTheme} from '../../src/context/theme';

export function withTheme(Story: StoryType, context: StoryContext) {
    const theme = useTheme(); // eslint-disable-line react-hooks/rules-of-hooks

    return <Story {...context} />;
}
