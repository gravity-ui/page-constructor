import * as React from 'react';

import {ThemeContext, ThemeContextProps} from './ThemeContext';
import {getServerTheme} from './serverTheme';

const isRscServer = typeof React.createContext !== 'function';

export function useTheme(): ThemeContextProps['theme'] {
    if (isRscServer) {
        return getServerTheme();
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useContext(ThemeContext).theme;
}
