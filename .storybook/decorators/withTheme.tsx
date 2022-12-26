import React, {useEffect} from 'react';
import {Story as StoryType, StoryContext} from '@storybook/react/types-6-0';
import {useTheme} from '../../src/contexts/theme';

export function withTheme(Story: StoryType, context: StoryContext) {
    const themeValue = context.globals.theme;
    const [theme, setTheme] = useTheme(); // eslint-disable-line react-hooks/rules-of-hooks

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (theme !== themeValue) {
            setTheme(themeValue);
        }
    }, [theme, themeValue, setTheme]);

    return <Story {...context} />;
}
