import React from 'react';

import {DEFAULT_THEME} from '../../components/constants';
import {Theme} from '../../models';

import {useTheme} from './useTheme';

export interface ThemeControllerProps {
    children?: React.ReactNode;
    defaultTheme?: Theme;
}

export const ThemeController = ({children, defaultTheme = DEFAULT_THEME}: ThemeControllerProps) => {
    const theme = useTheme();
    const [prevTheme, setPrevTheme] = React.useState(defaultTheme);

    const updateBodyClassName = (theme: Theme) => {
        const bodyEl = document.body;

        if (!bodyEl.classList.contains('yc-root')) {
            bodyEl.classList.add('yc-root');
        }

        bodyEl.classList.toggle('yc-root_theme_light', theme === Theme.Light);
        bodyEl.classList.toggle('yc-root_theme_dark', theme === Theme.Dark);
    };

    React.useEffect(() => {
        if (theme !== prevTheme) {
            updateBodyClassName(theme);
        }

        return () => {
            if (theme !== prevTheme) {
                setPrevTheme(theme);
            }
        };
    }, [theme, prevTheme]);

    React.useEffect(() => {
        updateBodyClassName(prevTheme);
    }, []);

    return <>{children}</>;
};
