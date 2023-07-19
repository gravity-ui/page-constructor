import React from 'react';

import {DEFAULT_THEME} from '../../components/constants';
import {Theme} from '../../models';

export interface ThemeContextProps {
    theme: Theme;
    setTheme: (newTheme: Theme) => void;
}

export const initialValue: ThemeContextProps = {
    theme: DEFAULT_THEME,
    setTheme: () => {},
};

export const ThemeContext = React.createContext(initialValue);
