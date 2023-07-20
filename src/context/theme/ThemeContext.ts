import React from 'react';

import {DEFAULT_THEME} from '../../components/constants';
import {Theme} from '../../models';

export interface ThemeContextProps {
    theme: Theme;
}

export const initialValue: ThemeContextProps = {
    theme: DEFAULT_THEME,
};

export const ThemeContext = React.createContext(initialValue);
