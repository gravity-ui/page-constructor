import React, {PropsWithChildren, useCallback, useEffect, useMemo, useState} from 'react';

import type {Swiper} from 'swiper';

import {SliderType, SlidesToShow} from '../../models';

import {getSliderResponsiveParams, useMemoized} from './utils';

type UseSliderProps = PropsWithChildren<{
    autoplayMs?: number;
    type?: string;
    slidesToShow?: SlidesToShow;
}>;

export const useSlider = ({children, autoplayMs, type, ...props}: UseSliderProps) => {
    const [slider, setSlider] = useState<Swiper>();
    const [isLocked, setIsLocked] = useState(false);
    const slidesToShow = useMemoized(props.slidesToShow);

    const childrenCount = React.Children.count(children);

    const autoplayEnabled = autoplayMs !== undefined && autoplayMs > 0;

    const breakpoints = useMemo(() => {
        return getSliderResponsiveParams({
            contentLength: childrenCount,
            slidesToShow,
            mobileFullscreen: Boolean(
                type && Object.values(SliderType).includes(type as SliderType),
            ),
        });
    }, [slidesToShow, type, childrenCount]);

    const handleNext = () => {
        if (!slider) {
            return;
        }

        if (slider.isEnd) {
            slider.slideTo(0);
            return;
        }

        slider.slideNext();
    };

    const handlePrev = () => {
        if (!slider) {
            return;
        }

        if (slider.isBeginning) {
            slider.slideTo(childrenCount - 1);
            return;
        }

        slider.slidePrev();
    };

    const handleImagesReady = useCallback((slider: Swiper) => {
        setTimeout(() => slider.update());
    }, []);

    useEffect(() => {
        if (!slider) {
            return;
        }

        if (autoplayEnabled) {
            slider.autoplay.start();
        } else {
            slider.autoplay.stop();
        }
    }, [slider, autoplayEnabled]);

    return {
        slider,
        onSwiper: setSlider,
        onNext: handleNext,
        onPrev: handlePrev,
        onImagesReady: handleImagesReady,
        breakpoints,
        childrenCount,
        isLocked,
        setIsLocked,
        autoplay: autoplayEnabled && {
            delay: autoplayMs,
            disableOnInteraction: false,
        },
    };
};
