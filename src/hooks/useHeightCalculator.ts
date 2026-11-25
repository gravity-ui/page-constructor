import * as React from 'react';

import debounce from 'lodash/debounce';

type HeightCalculatorOptions = {
    recalculateOnResizeDelay: number;
};

const DEFAULT_RECALCULATE_ON_RESIZE_DELAY = 1000;
const DEFAULT_OPTIONS = {
    recalculateOnResizeDelay: DEFAULT_RECALCULATE_ON_RESIZE_DELAY,
};

const useHeightCalculator: (
    containerRef: React.RefObject<HTMLElement>,
    options?: HeightCalculatorOptions,
) => number | undefined = (containerRef, options = DEFAULT_OPTIONS) => {
    const recalculateOnResizeDelay = options.recalculateOnResizeDelay;
    const [containerHeight, setContainerHeight] = React.useState<number | undefined>(undefined);

    const calculateContainerHeight = React.useCallback(() => {
        if (containerRef.current) {
            setContainerHeight(containerRef.current.offsetHeight);
        }
    }, [containerRef]);

    React.useEffect(() => {
        const handleResize = debounce(calculateContainerHeight, recalculateOnResizeDelay);
        const container = containerRef.current;
        const observer =
            typeof ResizeObserver === 'undefined'
                ? undefined
                : new ResizeObserver(calculateContainerHeight);

        calculateContainerHeight();

        if (container) {
            observer?.observe(container, {box: 'border-box'});
        }

        window.addEventListener('resize', handleResize, {passive: true});
        return () => {
            observer?.disconnect();
            handleResize.cancel();
            window.removeEventListener('resize', handleResize);
        };
    }, [containerRef, calculateContainerHeight, recalculateOnResizeDelay]);

    return containerHeight;
};

export default useHeightCalculator;
