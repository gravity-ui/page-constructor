import React, {PropsWithChildren, useEffect, useMemo, useState} from 'react';

import type {Swiper} from 'swiper';
import {Swiper as SwiperProps} from 'swiper/swiper-react';

import {SliderType, SlidesToShow} from '../../models';

import {getSliderResponsiveParams, setElementAtrributes, useMemoized} from './utils';

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
            disableOnInteraction: false,
        },
    };
};

export const useSliderPagination = (props: {
    enabled: boolean;
    withAutoplay: boolean;
    bulletClass: string;
    bulletActiveClass: string;
}): Pick<SwiperProps, 'pagination' | 'onPaginationUpdate'> | undefined => {
    if (!props.enabled) {
        return undefined;
    }
    const {withAutoplay, bulletClass, bulletActiveClass} = props;
    return {
        pagination: {
            clickable: true,
            bulletClass,
            bulletActiveClass,
        },
        onPaginationUpdate: (s) => {
            const pagination = s.pagination.el;
            setElementAtrributes(pagination, {
                role: 'menu',
                'aria-hidden': withAutoplay,
            });
            const bullets = pagination.querySelectorAll(`.${bulletClass}`);
            bullets.forEach((bullet) => {
                const isActive = bullet.classList.contains(bulletActiveClass);
                setElementAtrributes(bullet, {
                    role: 'menuitemradio',
                    'aria-hidden': withAutoplay,
                    'aria-checked': isActive,
                    tabindex: withAutoplay ? -1 : 0,
                });
            });
        },
    };
};
