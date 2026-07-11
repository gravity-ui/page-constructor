import * as React from 'react';

import {DEFAULT_THEME} from '../../components/constants';
import type {Theme} from '../../models';

type ThemeStore = {current: Theme};

const createStore = (): (() => ThemeStore) => {
    const cache = (React as unknown as {cache?: <T>(fn: () => T) => () => T}).cache;
    if (typeof cache === 'function') {
        return cache(() => ({current: DEFAULT_THEME}));
    }
    const singleton: ThemeStore = {current: DEFAULT_THEME};
    return () => singleton;
};

const store = createStore();

export function getServerTheme(): Theme {
    return store().current;
}

export function setServerTheme(theme: Theme): void {
    store().current = theme;
}
