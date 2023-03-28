import '../styles/storybook/index.scss';
import '@gravity-ui/uikit/styles/styles.scss';
import '../styles/styles.scss';
import '../styles/root.scss';

import React from 'react';
import CommonTheme from './theme';
import {MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';
import {withTheme} from './decorators/withTheme';
import {withLang} from './decorators/withLang';
import {withMobile} from './decorators/withMobile';
import {DocsWithReadme} from '../src/demo/DocsWithReadme';
import {MobileProvider, Platform} from '@gravity-ui/uikit';
import {ThemeProvider} from '../src/contexts/theme/ThemeProvider';

const withCommonProvider = (Story, context) => {
    const theme = context.globals.theme;

    // to set theme in docs
    context.parameters.backgrounds.default = theme;
    context.globals.backgrounds = {
        value: theme === 'light' ? 'white' : 'black',
    };

    context.globals.background = theme;

    // TODO: to switch docs theme dynamically in the future
    // context.parameters.docs.theme = theme === 'light' ? CommonTheme.light : CommonTheme.dark;

    return (
        <MobileProvider mobile={false} platform={Platform.BROWSER}>
            <ThemeProvider theme={theme}>
                <Story {...context} />
            </ThemeProvider>
        </MobileProvider>
    );
};

export const decorators = [withTheme, withLang, withMobile, withCommonProvider];

export const parameters = {
    layout: 'fullscreen',
    docs: {
        theme: CommonTheme,
        page: DocsWithReadme,
    },
    // FIXME: Disabled due to performance reasons. See https://github.com/storybookjs/storybook/issues/5551
    // actions: {
    //     argTypesRegex: '^on.*',
    // },
    jsx: {showFunctions: true}, // because we need to show func in sources
    viewport: {
        viewports: MINIMAL_VIEWPORTS,
    },
    backgrounds: {
        default: 'light',
        values: [
            {name: 'light', value: 'white'},
            {name: 'dark', value: 'rgba(45, 44, 51, 1)'},
        ],
    },
    options: {
        storySort: {
            order: ['Blocks', 'Containers'],
            method: 'alphabetical',
        },
    },
};

export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: 'light',
        toolbar: {
            items: [
                {value: 'light', icon: 'circle', title: 'Light'},
                {value: 'dark', icon: 'circlehollow', title: 'Dark'},
            ],
        },
    },
    lang: {
        name: 'Language',
        defaultValue: 'en',
        toolbar: {
            icon: 'globe',
            items: [
                {value: 'ru', right: '🇷🇺', title: 'Ru'},
                {value: 'en', right: '🇺🇸', title: 'En'},
            ],
        },
    },
    platform: {
        name: 'Platform',
        defaultValue: 'desktop',
        toolbar: {
            items: [
                {value: 'desktop', title: 'Desktop', icon: 'browser'},
                {value: 'mobile', title: 'Mobile', icon: 'mobile'},
            ],
        },
    },
};
