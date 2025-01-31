import * as React from 'react';

import {ThemeContext, ThemeContextProps} from './ThemeContext';

export function useTheme(): ThemeContextProps['theme'] {
    const {theme} = React.useContext(ThemeContext);

    return theme;
}
