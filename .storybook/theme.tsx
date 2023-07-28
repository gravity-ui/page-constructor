import React, {Fragment, useEffect} from 'react';

import {create} from '@storybook/theming';
import {Theme, useTheme} from '../src';

export const themeLight = create({
    base: 'light',

    colorPrimary: '#027bf3',
    colorSecondary: 'rgba(2, 123, 243, 0.6)',

    // Typography
    fontBase: '"Helvetica Neue", Arial, Helvetica, sans-serif',
    fontCode:
        '"SF Mono", "Menlo", "Monaco", "Consolas", "Ubuntu Mono", "Liberation Mono", "DejaVu Sans Mono", "Courier New", "Courier", monospace',

    // Text colors
    textColor: 'black',
    textInverseColor: 'black',

    // Toolbar default and active colors
    barTextColor: 'silver',
    barSelectedColor: '#027bf3',
    // barBg: '#027bf3',

    // Form colors
    inputBg: 'white',
    inputBorder: 'silver',
    inputTextColor: 'black',
    inputBorderRadius: 4,

    brandUrl: 'https://github.com/gravity-ui/page-constructor',
    brandTitle: `<div style="font-size: 18px; color: #027bf3; font-weight: 600; margin-top: -6px; margin-bottom: 2px;">Page Constructor</div>
                <div style="font-size: 14px;color: #7d7d7d;font-weight: 400;">Website components</div>`,
});

export const themeDark = create({
    base: 'dark',
});

export const themes = {
    light: themeLight,
    dark: themeDark,
};

export interface GlobalThemeControllerProps {
    children?: React.ReactNode;
}

export const GlobalThemeController = ({children}: GlobalThemeControllerProps) => {
    const theme = useTheme();
    const [prevTheme, setPrevTheme] = React.useState(theme);

    const updateBodyClassName = (newTheme: Theme) => {
        const bodyEl = document.body;

        if (!bodyEl.classList.contains('yc-root')) {
            bodyEl.classList.add('yc-root');
        }

        bodyEl.classList.toggle('yc-root_theme_light', newTheme === Theme.Light);
        bodyEl.classList.toggle('yc-root_theme_dark', newTheme === Theme.Dark);
    };

    useEffect(() => {
        if (theme !== prevTheme) {
            updateBodyClassName(theme);
        }

        return () => {
            if (theme !== prevTheme) {
                setPrevTheme(theme);
            }
        };
    }, [theme, prevTheme]);

    useEffect(() => {
        updateBodyClassName(theme);
        // need to render only once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Fragment>{children}</Fragment>;
};
