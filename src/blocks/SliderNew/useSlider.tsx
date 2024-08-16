import React, {PropsWithChildren, useEffect, useMemo, useRef, useState} from 'react';

import {useUniqId} from '@gravity-ui/uikit';
import type {Swiper} from 'swiper';

import {SliderType, SlidesToShow} from '../../models';

import {getSlideId, getSliderResponsiveParams, useMemoized, useRovingTabIndex} from './utils';

export const useSlider = ({
    children,
    autoplayMs,
    type,
    activeBulletClassName,
    ...props
}: PropsWithChildren<{
    autoplayMs?: number;
    type?: string;
    slidesToShow?: SlidesToShow;
    activeBulletClassName: string;
}>) => {
    const [slider, setSlider] = useState<Swiper>();
    const [activeIndex, setActiveIndex] = useState(0);
    const prevIndexRef = useRef<number>(0);
    const [isLocked, setIsLocked] = useState(false);
    const slidesToShow = useMemoized(props.slidesToShow);
    const uniqId = useUniqId();

    const childrenCount = React.Children.count(children);

    const [currentSlidesToShow, setCurrentSlidesToShow] = useState(
        typeof slidesToShow === 'number' ? slidesToShow : childrenCount,
    );

    const autoplayEnabled = autoplayMs !== undefined && autoplayMs > 0;

    const onPaginationRender = useRovingTabIndex({
        uniqId,
        activeBulletClassName,
        autoplayEnabled,
    });

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

    const firstVisibleIndex = activeIndex;
    const lastVisibleIndex = Math.min(activeIndex + currentSlidesToShow, childrenCount) - 1;
    const getSlideProps = (index: number): React.HTMLAttributes<HTMLElement> => {
        const isVisible =
            autoplayEnabled || (firstVisibleIndex <= index && index <= lastVisibleIndex);
        return {
            id: getSlideId(uniqId, index),
            'aria-hidden': !isVisible,
            tabIndex: isVisible ? 0 : -1,
        };
    };

    useEffect(() => {
        if (!slider) {
            return;
        }

        const getCurrentSlidesPerView = (s: Swiper) => {
            return typeof slidesToShow === 'number'
                ? slidesToShow
                : (
                      s as unknown as Swiper & {slidesPerViewDynamic: () => number}
                  ).slidesPerViewDynamic();
        };

        const onActiveIndexChange = (s: Swiper) => {
            setActiveIndex(s.activeIndex);
        };

        const onSlideChangeTransitionEnd = (s: Swiper) => {
            if (autoplayEnabled) {
                return;
            }
            const slidesPerView = getCurrentSlidesPerView(s);
            const currentSlide = s.activeIndex;

            const focusIndex =
                prevIndexRef.current > currentSlide
                    ? currentSlide
                    : Math.max(currentSlide, prevIndexRef.current + slidesPerView);

            document.getElementById(getSlideId(uniqId, focusIndex))?.focus();
            prevIndexRef.current = currentSlide;
        };

        const onResize = (s: Swiper) => {
            setCurrentSlidesToShow(getCurrentSlidesPerView(s));
        };

        setCurrentSlidesToShow(getCurrentSlidesPerView(slider));

        slider.on('activeIndexChange', onActiveIndexChange);
        slider.on('resize', onResize);
        slider.on('slideChangeTransitionEnd', onSlideChangeTransitionEnd);

        // eslint-disable-next-line consistent-return
        return () => {
            slider.off('activeIndexChange', onActiveIndexChange);
            slider.off('resize', onResize);
            slider.off('slideChangeTransitionEnd', onSlideChangeTransitionEnd);
        };
    }, [autoplayEnabled, slider, slidesToShow, uniqId]);

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
        breakpoints,
        childrenCount,
        isLocked,
        setIsLocked,
        autoplay: autoplayEnabled && {
            delay: autoplayMs,
        },
        getSlideProps,
        onPaginationRender,
    };
};
