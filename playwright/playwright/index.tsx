import {MobileProvider, ThemeProvider} from '@gravity-ui/uikit';
import {beforeMount} from '@playwright/experimental-ct-react/hooks';
import React from 'react';

import './index.scss';

beforeMount(async ({App}) => {
    return (
        <ThemeProvider theme="light">
            <MobileProvider>
                <App />
            </MobileProvider>
        </ThemeProvider>
    );
});
