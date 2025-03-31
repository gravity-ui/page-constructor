import '../styles/storybook/index.scss';
import '@gravity-ui/uikit/styles/styles.scss';
import {MobileProvider, Platform, ThemeProvider} from '@gravity-ui/uikit';

import * as React from 'react';
import {MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';
import type {Decorator, Preview} from '@storybook/react';
import {themeLight} from './theme/light';
import {PageConstructorProvider} from '../src/containers/PageConstructor/Provider';
import {withMobile} from './decorators/withMobile';
import {withLang} from './decorators/withLang';
import {DocsDecorator} from './decorators/docs';

import {Theme} from '../src';
import {GlobalThemeController} from './theme/utils/global-theme-controller';

import '../styles/styles.scss';
import '../styles/root.scss';

const withContextProvider: Decorator = (Story, context) => {
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
            <ThemeProvider theme={theme}>
                <MobileProvider mobile={false} platform={Platform.BROWSER}>
                    <Story {...context} />
                </MobileProvider>
            </ThemeProvider>
        </GlobalThemeController>
    );
};

const withPageConstructorProvider: Decorator = (Story, context) => {
    return (
        <PageConstructorProvider
            isMobile={context.globals.platform === 'mobile'}
            locale={{lang: context.globals.lang}}
            theme={context.globals.theme}
        >
            <Story {...context} />
        </PageConstructorProvider>
    );
};

const preview: Preview = {
    decorators: [withLang, withMobile, withContextProvider, withPageConstructorProvider],

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
                    'Block Indents',
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

    tags: ['autodocs', 'autodocs', 'autodocs'],
};

export default preview;
