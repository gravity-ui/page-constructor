import type * as React from 'react';

export const asReactRef = <T extends HTMLElement>(
    dndRef: (element: Element | null) => void,
): React.Ref<T> => dndRef as unknown as React.Ref<T>;
