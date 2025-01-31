import {MobileProvider, ThemeProvider, ToasterComponent, ToasterProvider} from '@gravity-ui/uikit';
import * as React from 'react';

import {PageConstructorProvider} from '../../src/containers/PageConstructor';
import {Theme} from '../../src/models';

export const Providers = ({children}) => {
    const [theme, setTheme] = React.useState<Theme>(Theme.Light);

    React.useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const updateTheme = (event) => {
            setTheme(event.matches ? Theme.Dark : Theme.Light);
        };

        setTheme(darkModeMediaQuery.matches ? Theme.Dark : Theme.Light);

        darkModeMediaQuery.addEventListener('change', updateTheme);

        return () => {
            darkModeMediaQuery.removeEventListener('change', updateTheme);
        };
    }, []);

    return (
        <ThemeProvider>
            <MobileProvider>
                <ToasterProvider>
                    <PageConstructorProvider
                        theme={theme}
                        projectSettings={{isAnimationEnabled: false}}
                    >
                        {children}
                        <ToasterComponent />
                    </PageConstructorProvider>
                </ToasterProvider>
            </MobileProvider>
        </ThemeProvider>
    );
};
