import * as React from 'react';

import {BlockRegistryContext, pathKey} from '../context/blockRegistryContext';

export function usePCEditorBlockRegister(path: number[], dropZone?: boolean) {
    const registry = React.useContext(BlockRegistryContext);
    const elementRef = React.useRef<HTMLElement | null>(null);
    const key = React.useMemo(() => pathKey(path), [path]);

    const blockRef = React.useCallback(
        (node: HTMLElement | null) => {
            if (elementRef.current === node) {
                return;
            }

            if (elementRef.current && registry) {
                registry.unregister(key);
            }

            elementRef.current = node;

            if (node && registry) {
                registry.register(key, path, node, dropZone);
            }
        },
        // `path` is stable per render but identity may change; `key` captures content.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [registry, key, dropZone],
    );

    return blockRef;
}
