import React, {Fragment, PropsWithChildren} from 'react';

import blockOrigin from 'bem-cn-lite';

import {Theme} from '../../models';

import {useTheme} from './useTheme';

const b = blockOrigin('yc-root');

export interface CommonThemeControllerProps {
    children?: React.ReactNode;
}

export const GlobalThemeController = ({children}: CommonThemeControllerProps) => {
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
        updateBodyClassName(theme);
        // need to render only once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Fragment>{children}</Fragment>;
};

export const ThemeController = ({children}: PropsWithChildren) => {
    const theme = useTheme();

    return <div className={b({theme})}>{children}</div>;
};
