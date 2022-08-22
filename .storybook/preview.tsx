import '../styles/storybook/index.scss';
import '@yandex-cloud/uikit/styles/styles.scss';
import {MobileProvider, Platform} from '@yandex-cloud/uikit';

import React from 'react';
import {MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';
import type {DecoratorFn} from '@storybook/react';
import {CloudTheme} from './theme';
import {PageConstructorProvider} from '../src/containers/PageConstructor/Provider';
import {withTheme} from './decorators/withTheme';
import {withMobile} from './decorators/withMobile';
import {withLang} from './decorators/withLang';
import {DocsWithReadme} from '../src/demo/DocsWithReadme';

import {ThemeProvider} from '../src';
import {configure, Lang} from '../configure';

import '../styles/styles.scss';
configure({
    lang: Lang.En,
});

const withContextProvider: DecoratorFn = (Story, context) => {
    const theme = context.globals.theme;

    // хак для установки темы в доке
    context.parameters.backgrounds.default = theme;
    context.globals.backgrounds = {
        value: theme === 'light' ? 'white' : 'black',
    };
    context.globals.background = theme;

    // TODO: в будущем возможно появится вариант изменять динамически тему доки, нужно будет перейти на новый способ
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

export const decorators = [
    withTheme,
    withLang,
    withMobile,
    withContextProvider,
    withPageConstructorProvider,
];

export const parameters = {
    layout: 'fullscreen',
    docs: {
        theme: CloudTheme,
        page: DocsWithReadme,
    },
    // FIXME: Disabled due to performance reasons. See https://github.com/storybookjs/storybook/issues/5551
    // actions: {
    //     argTypesRegex: '^on.*',
    // },
    jsx: {showFunctions: true}, // Для того, чтобы функции отображались в сорцах
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
            order: ['Блоки', 'Компоненты'],
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
        defaultValue: 'ru',
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
