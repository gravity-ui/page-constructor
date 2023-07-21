import React from 'react';

import {ThemeContext, ThemeContextProps} from './ThemeContext';

export function useTheme(): [ThemeContextProps['theme'], ThemeContextProps['onThemeSwitch']] {
    const {theme, onThemeSwitch} = React.useContext(ThemeContext);

    return [theme, onThemeSwitch];
}
