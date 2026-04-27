import * as React from 'react';

import {BlockRegistry} from './blockRegistryContext';

export function useBlockRegistryProvider(): BlockRegistry {
    const entriesRef = React.useRef(
        new Map<string, {path: number[]; element: HTMLElement; dropZone?: boolean}>(),
    );
    const listenersRef = React.useRef(new Set<() => void>());

    return React.useMemo<BlockRegistry>(() => {
        const notify = () => {
            for (const listener of listenersRef.current) {
                listener();
            }
        };

        return {
            register(pathKey, path, element, dropZone) {
                entriesRef.current.set(pathKey, {path, element, dropZone});
                notify();
            },
            unregister(pathKey) {
                if (entriesRef.current.delete(pathKey)) {
                    notify();
                }
            },
            subscribe(listener) {
                listenersRef.current.add(listener);
                return () => {
                    listenersRef.current.delete(listener);
                };
            },
            getEntries() {
                return Array.from(entriesRef.current.values());
            },
        };
    }, []);
}
