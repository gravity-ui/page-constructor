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
        if (containerRef.current && containerRef.current.offsetHeight !== containerHeight)
            setContainerHeight(containerRef.current.offsetHeight);
    }, [containerRef, containerHeight, setContainerHeight]);

    React.useEffect(() => {
        const handleResize = debounce(calculateContainerHeight, recalculateOnResizeDelay);

        handleResize();

        window.addEventListener('resize', handleResize, {passive: true});
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [calculateContainerHeight, recalculateOnResizeDelay]);

    return containerHeight;
};

export default useHeightCalculator;
