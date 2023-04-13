import React from 'react';

import {DEFAULT_THEME} from '../../components/constants';

import {ConstructorTheme} from './ThemeValueContext';

export interface ThemeContextProps {
    theme: ConstructorTheme;
    setTheme: (newTheme: ConstructorTheme) => void;
}

export const initialValue: ThemeContextProps = {
    theme: DEFAULT_THEME,
    setTheme: () => {},
};

export const ThemeContext = React.createContext(initialValue);
