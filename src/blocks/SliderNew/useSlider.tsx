import React, {PropsWithChildren, useEffect, useMemo, useState} from 'react';

import type {SwiperClass} from 'swiper/react';

import {SliderType, SlidesToShow} from '../../models';

import {getSliderResponsiveParams} from './utils';

export const useSlider = ({
    children,
    autoplayMs,
    type,
    slidesToShow,
}: PropsWithChildren<{autoplayMs?: number; type?: string; slidesToShow?: SlidesToShow}>) => {
    const [slider, setSlider] = useState<SwiperClass>();

    const childrenCount = React.Children.count(children);

    const autoplayEnabled = useMemo(() => Boolean(autoplayMs), [autoplayMs]);

    const breakpoints = useMemo(() => {
        return getSliderResponsiveParams({
            contentLength: childrenCount,
            slidesToShow,
            mobileFullscreen: Boolean(
                type && Object.values(SliderType).includes(type as SliderType),
            ),
        });
    }, [slidesToShow, type, childrenCount]);

    useEffect(() => {
        if (!slider) return;
        if (autoplayEnabled) {
            slider.autoplay.start();
        } else {
            slider.autoplay.stop();
        }
    }, [slider, autoplayEnabled]);

    return {
        slider,
        onSwiper: setSlider,
        breakpoints,
        childrenCount,
        autoplay: autoplayEnabled && {
            delay: autoplayMs,
        },
    };
};
