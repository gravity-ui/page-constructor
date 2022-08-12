import React from 'react';

import {DEFAULT_THEME} from 'src/constants';
import {ThemeValueType} from './ThemeValueContext';

export interface ThemeContextProps {
    theme: ThemeValueType;
    setTheme: (newTheme: ThemeValueType) => void;
}

export const initialValue: ThemeContextProps = {
    theme: DEFAULT_THEME,
    setTheme: () => {},
};

export const ThemeContext = React.createContext(initialValue);
