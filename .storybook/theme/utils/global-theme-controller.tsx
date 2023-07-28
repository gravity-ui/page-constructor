import React, {Fragment, useEffect} from 'react';
import {Theme, useTheme} from '../../../src';

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
