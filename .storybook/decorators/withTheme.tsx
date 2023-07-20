import React from 'react';
import {Story as StoryType, StoryContext} from '@storybook/react/types-6-0';
import {useTheme} from '../../src/context/theme';
import {Theme} from '../../src';

let lastStoryBookThemeValue;

export function withTheme(Story: StoryType, context: StoryContext) {
    const [theme, setTheme] = useTheme(); // eslint-disable-line react-hooks/rules-of-hooks
    const storyBookThemeValue = context.globals.theme as Theme;

    React.useEffect(() => {
        if (lastStoryBookThemeValue !== storyBookThemeValue) {
            setTheme(storyBookThemeValue);
        }

        return () => {
            lastStoryBookThemeValue = storyBookThemeValue;
        };
    }, [theme, storyBookThemeValue, setTheme]);

    return <Story {...context} />;
}
