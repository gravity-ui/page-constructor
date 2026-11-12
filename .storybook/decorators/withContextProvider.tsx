import {Platform, Provider} from '@gravity-ui/uikit';

import * as React from 'react';
import type {Decorator} from '@storybook/react';

import {Theme} from '../../src';
import {GlobalThemeController} from '../theme/utils/global-theme-controller';

export const withContextProvider: Decorator = (Story, context) => {
    const theme = context.globals.theme;

    // to set theme in docs
    context.parameters.backgrounds.default = theme;
    context.globals.backgrounds = {
        value: theme === Theme.Light ? 'white' : 'black',
    };
    context.globals.background = theme;

    // TODO: to switch docs theme dynamically in the future
    // context.parameters.docs.theme = theme === 'light' ? CommonTheme.light : CommonTheme.dark;

    return (
        <GlobalThemeController>
            <Provider theme={theme} mobile={false} platform={Platform.BROWSER}>
                <Story {...context} />
            </Provider>
        </GlobalThemeController>
    );
};
