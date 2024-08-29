import React, {PropsWithChildren, useEffect, useMemo, useRef, useState} from 'react';

import {useUniqId} from '@gravity-ui/uikit';
import type {Swiper} from 'swiper';

import {SliderType, SlidesToShow} from '../../models';

import {getSlideId, getSliderResponsiveParams, useMemoized, useRovingTabIndex} from './utils';

const isFocusable = (element: HTMLElement): boolean => {
    const tabIndexAttr = element.getAttribute('tabindex');
    const hasTabIndex = tabIndexAttr !== null;
    const tabIndex = Number(tabIndexAttr);
    if (element.ariaHidden === 'true' || (hasTabIndex && tabIndex < 0)) {
        return false;
    }
    if (hasTabIndex && tabIndex >= 0) {
        return true;
    }
    switch (true) {
        case element instanceof HTMLAnchorElement:
            return Boolean(element.href);
        case element instanceof HTMLInputElement:
            return element.type !== 'hidden' && !element.disabled;
        case element instanceof HTMLSelectElement:
        case element instanceof HTMLTextAreaElement:
        case element instanceof HTMLButtonElement:
            return !element.disabled;
        default:
            return false;
    }
};

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
    const [isSliding, setIsSliding] = useState(false);
    const prevIndexRef = useRef<number>(0);
    const [isLocked, setIsLocked] = useState(false);
    const slidesToShow = useMemoized(props.slidesToShow);
    const uniqId = useUniqId();

    const childrenCount = React.Children.count(children);

    const [currentSlidesToShow, setCurrentSlidesToShow] = useState(
        typeof slidesToShow === 'number' ? slidesToShow : childrenCount,
    );

    const autoplayEnabled = autoplayMs !== undefined && autoplayMs > 0;

    const {onPaginationUpdate, onPaginationHide} = useRovingTabIndex({
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
            style: isVisible || isSliding ? undefined : {visibility: 'hidden'},
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

        const onSlideChangeTransitionStart = () => {
            setIsSliding(true);
        };

        const onSlideChangeTransitionEnd = (s: Swiper) => {
            setIsSliding(false);
            if (autoplayEnabled) {
                return;
            }
            const slidesPerView = getCurrentSlidesPerView(s);
            const currentSlide = s.activeIndex;

            const focusIndex =
                prevIndexRef.current >= currentSlide
                    ? currentSlide
                    : Math.max(currentSlide, prevIndexRef.current + slidesPerView);

            prevIndexRef.current = currentSlide;
            const firstNewSlide = document.getElementById(getSlideId(uniqId, focusIndex));
            if (!firstNewSlide) {
                return;
            }
            const focusableChild = Array.from(firstNewSlide.querySelectorAll('*'))
                .filter((element) => element instanceof HTMLElement)
                .find(isFocusable);
            focusableChild?.focus();
        };

        const onResize = (s: Swiper) => {
            setCurrentSlidesToShow(getCurrentSlidesPerView(s));
        };

        setCurrentSlidesToShow(getCurrentSlidesPerView(slider));

        slider.on('activeIndexChange', onActiveIndexChange);
        slider.on('resize', onResize);
        slider.on('slideChangeTransitionStart', onSlideChangeTransitionStart);
        slider.on('slideChangeTransitionEnd', onSlideChangeTransitionEnd);

        // eslint-disable-next-line consistent-return
        return () => {
            slider.off('activeIndexChange', onActiveIndexChange);
            slider.off('resize', onResize);
            slider.off('slideChangeTransitionStart', onSlideChangeTransitionStart);
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
        onPaginationUpdate,
        onPaginationHide,
    };
};
