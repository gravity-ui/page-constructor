import * as React from 'react';

import {Provider, ProviderProps, ThemeContext} from '@gravity-ui/uikit';

export function UIKitProvider({children, ...props}: ProviderProps) {
    const parentTheme = React.useContext(ThemeContext);

    return parentTheme ? (
        <React.Fragment>{children}</React.Fragment>
    ) : (
        <Provider {...props} scoped>
            {children}
        </Provider>
    );
}
