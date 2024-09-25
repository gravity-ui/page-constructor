import {useEffect, useRef} from 'react';

import Swiper from 'swiper';

import {getFocusAnchor, setElementAtrributes} from './utils';

const setSlidesAriaProps = (slides: Element[], visible: boolean) =>
    slides.forEach((slide) => setElementAtrributes(slide, {'aria-hidden': !visible}));

export const useSliderA11y = ({
    slider,
    withAutoplay,
    slideVisibleClass,
}: {
    slider: Swiper | undefined;
    withAutoplay: boolean;
    slideVisibleClass: string;
}) => {
    const visibleSlides = useRef<HTMLElement[]>([]);

    const handleSlideChange = (s: Swiper, initial = false) => {
        s.slideToClosest(0, false);
        const newVisibleSlides = Array.from<HTMLElement>(
            s.el.querySelectorAll(`.${slideVisibleClass}`),
        );
        setSlidesAriaProps(visibleSlides.current, false);
        setSlidesAriaProps(newVisibleSlides, true);
        if (!initial) {
            getFocusAnchor(
                newVisibleSlides.find((slide) => !visibleSlides.current.includes(slide)) ?? null,
            )?.focus();
        }
        visibleSlides.current = newVisibleSlides;
    };

    useEffect(() => {
        if (!slider || withAutoplay) {
            return;
        }
        setSlidesAriaProps(Array.from(slider.slides), false);
        handleSlideChange(slider, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slider, withAutoplay]);

    return {
        onSlideChangeTransitionEnd: withAutoplay ? undefined : handleSlideChange,
    };
};
