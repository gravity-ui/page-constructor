import * as React from 'react';

import throttle from 'lodash/throttle';

const SIZE_UPDATE_FREQUENCY_MS = 100;

export const useContainerAspectRatio = () => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const [containerAspectRatio, setContainerAspectRatio] = React.useState<number>(1);

    const updateAspectRatio = React.useCallback(() => {
        const container = containerRef.current;

        if (container) {
            setContainerAspectRatio(container.clientWidth / container.clientHeight);
        }
    }, []);

    React.useEffect(() => {
        const container = containerRef.current;
        const isResizeEventsSupported = 'ResizeObserver' in window;

        if (!container || !isResizeEventsSupported) {
            return () => {};
        }

        const observer = new ResizeObserver(
            throttle(updateAspectRatio, SIZE_UPDATE_FREQUENCY_MS, {leading: true}),
        );

        observer.observe(container);

        return () => observer.disconnect();
    }, [updateAspectRatio]);

    return {
        aspectRatio: containerAspectRatio,
        ref: (mediaContainer: HTMLDivElement | null) => {
            if (mediaContainer) {
                containerRef.current = mediaContainer;
                updateAspectRatio();
            }
        },
    };
};
