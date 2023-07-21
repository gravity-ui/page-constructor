import React from 'react';
import {Story as StoryType, StoryContext} from '@storybook/react/types-6-0';
import {useTheme} from '../../src/context/theme';
import {Theme} from '../../src';
import {DEFAULT_THEME} from '../../src/components/constants';

let lastStoryBookThemeValue = DEFAULT_THEME;

export function withTheme(Story: StoryType, context: StoryContext) {
    const [theme, onThemeSwitch] = useTheme(); // eslint-disable-line react-hooks/rules-of-hooks
    const storyBookThemeValue = context.globals.theme as Theme;

    React.useEffect(() => {
        if (lastStoryBookThemeValue !== storyBookThemeValue) {
            onThemeSwitch(storyBookThemeValue);
        }

        return () => {
            lastStoryBookThemeValue = storyBookThemeValue;
        };
    }, [theme, storyBookThemeValue, onThemeSwitch]);

    return <Story {...context} />;
}
