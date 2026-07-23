import * as React from 'react';

import {LocaleContextProps, initialLocale} from './localeContext';

type Store = {current: LocaleContextProps};

const createStore = (): (() => Store) => {
    const cache = (React as unknown as {cache?: <T>(fn: () => T) => () => T}).cache;
    if (typeof cache === 'function') {
        return cache(() => ({current: initialLocale}));
    }
    const singleton: Store = {current: initialLocale};
    return () => singleton;
};

const store = createStore();

export function getServerLocale(): LocaleContextProps {
    return store().current;
}

export function setServerLocale(locale: LocaleContextProps): void {
    store().current = locale;
}
