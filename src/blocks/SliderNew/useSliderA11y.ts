import {useEffect, useRef, useState} from 'react';

import {useUniqId} from '@gravity-ui/uikit';
import Swiper from 'swiper';

import {SlidesToShow} from './models';
import {getFocusAnchor, getSlideId, subscribeSlider, useMemoized} from './utils';

export const useSliderA11y = ({
    slider,
    withAutoplay,
    childrenCount,
    ...props
}: {
    slider: Swiper | undefined;
    withAutoplay: boolean;
    slidesToShow?: SlidesToShow;
    childrenCount: number;
}) => {
    const uniqId = useUniqId();
    const [isSliding, setIsSliding] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const slidesToShow = useMemoized(props.slidesToShow);
    const [currentSlidesToShow, setCurrentSlidesToShow] = useState(
        typeof slidesToShow === 'number' ? slidesToShow : childrenCount,
    );

    const firstVisibleIndex = activeIndex;
    const lastVisibleIndex = Math.min(activeIndex + currentSlidesToShow, childrenCount) - 1;
    const getSlideProps = (index: number): React.HTMLAttributes<HTMLElement> => {
        const isVisible = withAutoplay || (firstVisibleIndex <= index && index <= lastVisibleIndex);
        return {
            id: getSlideId(uniqId, index),
            'aria-hidden': !isVisible,
            style: isVisible || isSliding ? undefined : {visibility: 'hidden'},
        };
    };

    const prevIndexRef = useRef<number>(0);
    useEffect(() => {
        if (!slider) {
            return;
        }

        const getCurrentSlidesPerView = (s: Swiper) =>
            typeof slidesToShow === 'number'
                ? slidesToShow
                : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ((s as any).slidesPerViewDynamic() as number);

        const focusFirstNewSlide = (s: Swiper) => {
            if (withAutoplay) {
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
            getFocusAnchor(firstNewSlide)?.focus();
        };

        setCurrentSlidesToShow(getCurrentSlidesPerView(slider));

        // eslint-disable-next-line consistent-return
        return subscribeSlider(slider, {
            activeIndexChange: (s) => setActiveIndex(s.activeIndex),
            slideChangeTransitionStart: () => setIsSliding(true),
            slideChangeTransitionEnd: (s) => {
                setIsSliding(false);
                focusFirstNewSlide(s);
            },
            resize: (s) => setCurrentSlidesToShow(getCurrentSlidesPerView(s)),
        });
    }, [withAutoplay, slider, slidesToShow, uniqId]);

    return {getSlideProps};
};
