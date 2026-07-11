import * as React from 'react';

import {LocationContextProps, initialLocation} from './locationContext';

type Store = {current: LocationContextProps};

const createStore = (): (() => Store) => {
    const cache = (React as unknown as {cache?: <T>(fn: () => T) => () => T}).cache;
    if (typeof cache === 'function') {
        return cache(() => ({current: initialLocation}));
    }
    const singleton: Store = {current: initialLocation};
    return () => singleton;
};

const store = createStore();

export function getServerLocation(): LocationContextProps {
    return store().current;
}

export function setServerLocation(location: LocationContextProps): void {
    store().current = location;
}
