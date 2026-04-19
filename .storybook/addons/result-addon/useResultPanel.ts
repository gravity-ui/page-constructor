import * as React from 'react';
import {useChannel} from '@storybook/preview-api';

import {EVENT_ID} from './constants';

/**
 * Drop-in replacement for useState that also mirrors the value to the Result panel.
 *
 * Usage in a story:
 *   const [content, setContent] = useResultPanel<Content>({});
 */
export function useResultPanel<T>(initial: T): [T, (value: T) => void] {
    const [value, setValue] = React.useState<T>(initial);

    const emit = useChannel({});

    const update = React.useCallback(
        (next: T) => {
            setValue(next);
            emit(EVENT_ID, next);
        },
        [emit],
    );

    // Emit initial value so the panel is not empty on first render.
    React.useEffect(() => {
        emit(EVENT_ID, initial);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [value, update];
}
