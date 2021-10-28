import {useState, useEffect} from 'react';

export const useIntersection = (element?: Element, startMargin = '0px', threshold = 0.2) => {
    const [isVisible, setState] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setState(entry.isIntersecting);
            },
            {
                rootMargin: startMargin,
                threshold,
            },
        );

        if (element) {
            observer.observe(element);
        }

        return () => element && observer.unobserve(element);
    }, [element, startMargin, threshold]);

    return isVisible;
};
