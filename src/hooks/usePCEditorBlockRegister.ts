import * as React from 'react';

import {BlockRegistryContext, pathKey} from '../context/blockRegistryContext';

export function usePCEditorBlockRegister(path: number[], dropZone?: boolean) {
    const registry = React.useContext(BlockRegistryContext);
    const elementRef = React.useRef<HTMLElement | null>(null);
    const observerRef = React.useRef<ResizeObserver | null>(null);
    const key = React.useMemo(() => pathKey(path), [path]);

    const blockRef = React.useCallback(
        (node: HTMLElement | null) => {
            if (elementRef.current === node) {
                return;
            }

            if (elementRef.current && registry) {
                registry.unregister(key);
            }

            observerRef.current?.disconnect();
            observerRef.current = null;
            elementRef.current = node;

            if (node && registry) {
                registry.register(key, path, node, dropZone);

                const observer = new ResizeObserver(() => {
                    registry.register(key, path, node, dropZone);
                });
                observer.observe(node);
                observerRef.current = observer;
            }
        },
        // `path` is stable per render but identity may change; `key` captures content.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [registry, key, dropZone],
    );

    return blockRef;
}
