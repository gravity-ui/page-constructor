import * as React from 'react';

type Store = {current: boolean};

const createStore = (): (() => Store) => {
    const cache = (React as unknown as {cache?: <T>(fn: () => T) => () => T}).cache;
    if (typeof cache === 'function') {
        return cache(() => ({current: false}));
    }
    const singleton: Store = {current: false};
    return () => singleton;
};

const store = createStore();

export function getServerMobile(): boolean {
    return store().current;
}

export function setServerMobile(isMobile: boolean): void {
    store().current = isMobile;
}
