import React from 'react';

export type ThemeValueType = 'light' | 'dark';

export interface ThemeValueContextProps {
    themeValue: ThemeValueType;
}

export const initialValue: ThemeValueContextProps = {
    themeValue: 'light',
};

export const ThemeValueContext = React.createContext(initialValue);
