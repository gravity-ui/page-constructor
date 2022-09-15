import React from 'react';
import type {DecoratorFn} from '@storybook/react';
import {Lang, configure} from '../../src/utils/configure';

export const withLang: DecoratorFn = (Story, context) => {
    const lang = context.globals.lang;

    configure({
        lang: lang as Lang,
    });

    return <Story key={lang} {...context} />;
};
