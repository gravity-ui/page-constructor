import React, {Fragment, useEffect} from 'react';
import {Theme, useTheme} from '../../../src';
import {UIKIT_ROOT_CLASS} from '../../../src/components/constants';

export interface GlobalThemeControllerProps {
    children?: React.ReactNode;
}

export const GlobalThemeController = ({children}: GlobalThemeControllerProps) => {
    const theme = useTheme();
    const [prevTheme, setPrevTheme] = React.useState(theme);

    const updateBodyClassName = (newTheme: Theme) => {
        const bodyEl = document.body;

        if (!bodyEl.classList.contains(UIKIT_ROOT_CLASS)) {
            bodyEl.classList.add(UIKIT_ROOT_CLASS);
        }

        bodyEl.classList.toggle(`${UIKIT_ROOT_CLASS}_theme_light`, newTheme === Theme.Light);
        bodyEl.classList.toggle(`${UIKIT_ROOT_CLASS}_theme_dark`, newTheme === Theme.Dark);
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
