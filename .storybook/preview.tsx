import '../styles/storybook/index.scss';
import '@gravity-ui/uikit/styles/styles.scss';
import {MobileProvider, Platform} from '@gravity-ui/uikit';

import React from 'react';
import {MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';
import type {Decorator, Preview} from '@storybook/react';
import {themeLight} from './theme';
import {PageConstructorProvider} from '../src/containers/PageConstructor/Provider';
import {withTheme} from './decorators/withTheme';
import {withMobile} from './decorators/withMobile';
import {withLang} from './decorators/withLang';
import {DocsDecorator} from './decorators/docs';

import {ThemeProvider} from '../src';
import {configure, Lang} from '../src/utils/configure';

import '../styles/styles.scss';

configure({
    lang: Lang.En,
});

const withContextProvider: Decorator = (Story, context) => {
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
        <ThemeProvider theme={theme}>
            <MobileProvider mobile={false} platform={Platform.BROWSER}>
                <Story {...context} />
            </MobileProvider>
        </ThemeProvider>
    );
};

const withPageConstructorProvider = (Story, context) => {
    return (
        <PageConstructorProvider
            isMobile={context.globals.platform === 'mobile'}
            locale={{lang: context.globals.lang}}
        >
            <Story {...context} />
        </PageConstructorProvider>
    );
};

const preview: Preview = {
    decorators: [withTheme, withLang, withMobile, withContextProvider, withPageConstructorProvider],
    parameters: {
        layout: 'fullscreen',
        docs: {
            theme: themeLight,
            container: DocsDecorator,
        },
        // FIXME: Disabled due to performance reasons. See https://github.com/storybookjs/storybook/issues/5551
        // actions: {
        //     argTypesRegex: '^on.*',
        // },
        jsx: {showFunctions: true}, // to show function in sources
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
                order: [
                    'Documentation',
                    'Blocks',
                    'Components',
                    ['Cards', 'Links and buttons', 'Pics, video, DataLens'],
                ],
                method: 'alphabetical',
            },
        },
    },
    globalTypes: {
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
    },
};

export default preview;
