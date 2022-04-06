import React from 'react';

export type ConstructorTheme = 'light' | 'dark';

export interface ThemeValueContextProps {
    themeValue: ConstructorTheme;
}

export const initialValue: ThemeValueContextProps = {
    themeValue: 'light',
};

export const ThemeValueContext = React.createContext(initialValue);
