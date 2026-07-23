import * as React from 'react';

import {DEFAULT_THEME} from '../../components/constants';
import {Theme} from '../../models';

export interface ThemeContextProps {
    theme: Theme;
}

export const initialValue: ThemeContextProps = {
    theme: DEFAULT_THEME,
};

const isRscServer = typeof React.createContext !== 'function';

export const ThemeContext = (
    isRscServer ? null : React.createContext(initialValue)
) as React.Context<ThemeContextProps>;
