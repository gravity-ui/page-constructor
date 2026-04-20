import * as React from 'react';

export type BlockRegistry = {
    register: (pathKey: string, path: number[], element: HTMLElement, dropZone?: boolean) => void;
    unregister: (pathKey: string) => void;
    subscribe: (listener: () => void) => () => void;
    getEntries: () => Array<{path: number[]; element: HTMLElement; dropZone?: boolean}>;
};

export const BlockRegistryContext = React.createContext<BlockRegistry | null>(null);

export function pathKey(path: number[]): string {
    return path.join('.');
}
