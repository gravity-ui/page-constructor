import React from 'react';

import {DEFAULT_THEME} from '../../components/constants';
import {Theme} from '../../models';

export interface ThemeContextProps {
    theme: Theme;
    onThemeSwitch: (theme: Theme) => void;
}

export const initialValue: ThemeContextProps = {
    theme: DEFAULT_THEME,
    onThemeSwitch: () => {},
};

export const ThemeContext = React.createContext(initialValue);
