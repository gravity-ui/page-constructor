import React, {Fragment, PropsWithChildren, useCallback, useEffect, useMemo, useState} from 'react';

import {A11y, Autoplay} from 'swiper/modules';
import type {SwiperClass, SwiperProps} from 'swiper/react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/scss';
import type {SwiperOptions} from 'swiper/types/swiper-options';

import Anchor from '../../components/Anchor/Anchor';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import Title from '../../components/Title/Title';
import {StylesContext} from '../../context/stylesContext/StylesContext';
import {ClassNameProps, Refable, SliderProps as SliderParams, SliderType} from '../../models';
import {block} from '../../utils';

import Arrow, {ArrowType} from './Arrow/Arrow';
import {SliderBreakpointNames, SliderBreakpointParams} from './models';
import {
    getSliderResponsiveParams,
    getSlidesToShowCount,
    getSlidesToShowWithDefaults,
} from './utils';

import './Slider.scss';

const b = block('SliderNewBlock');

const DOT_WIDTH = 8;
const DOT_GAP = 16;

export interface SliderNewProps
    extends Omit<SliderParams, 'children'>,
        Partial<
            Pick<
                SwiperProps,
                | 'onSlideChange'
                | 'onSlideChangeTransitionStart'
                | 'onSlideChangeTransitionEnd'
                | 'onActiveIndexChange'
                | 'onBreakpoint'
            >
        >,
        Refable<HTMLDivElement>,
        ClassNameProps {
    type?: string;
    anchorId?: string;
    dotsClassName?: string;
    blockClassName?: string;
    arrowSize?: number;
}

export const SliderNewBlock = (props: PropsWithChildren<SliderNewProps>) => {
    const {
        animated,
        title,
        description,
        type,
        anchorId,
        arrows = true,
        adaptive,
        autoplay = undefined,
        dots = true,
        dotsClassName,
        disclaimer,
        children,
        blockClassName,
        arrowSize,
        onSlideChange,
        onSlideChangeTransitionStart,
        onSlideChangeTransitionEnd,
        onActiveIndexChange,
        onBreakpoint,
    } = props;

    const disclosedChildren = useMemo<React.ReactElement[]>(
        () => discloseAllNestedChildren(children as React.ReactElement[]),
        [children],
    );
    const childrenCount = disclosedChildren.length;

    const autoplayEnabled = useMemo(() => Boolean(autoplay), [autoplay]);

    const [slidesToShow] = useState<SliderBreakpointParams>(
        getSlidesToShowWithDefaults({
            contentLength: childrenCount,
            breakpoints: props.slidesToShow,
            mobileFullscreen: Boolean(
                props.type && Object.values(SliderType).includes(props.type as SliderType),
            ),
        }),
    );
    const [slidesCountByBreakpoint, setSlidesCountByBreakpoint] = useState<number>(
        slidesToShow[SliderBreakpointNames.Lg],
    );

    const slidesToShowCount = getSlidesToShowCount(slidesToShow);

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [childStyles, setChildStyles] = useState<Object>({});
    const [slider, setSlider] = useState<SwiperClass>();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleBreakpoint = useCallback(
        (swiper: SwiperClass, breakpointParams: SwiperOptions) => {
            if (onBreakpoint) {
                onBreakpoint(swiper, breakpointParams);
            }
            const newSlidesCountByBreakpoint: number = Math.floor(
                (breakpointParams.slidesPerView as number) ||
                    slidesToShow[SliderBreakpointNames.Lg],
            );

            if (newSlidesCountByBreakpoint !== slidesCountByBreakpoint) {
                setSlidesCountByBreakpoint(newSlidesCountByBreakpoint);
                swiper.slideTo(0);
            }
        },
        [onBreakpoint, slidesToShow, slidesCountByBreakpoint],
    );

    useEffect(() => {
        if (!slider) return;
        if (autoplayEnabled) {
            slider.autoplay.start();
        } else {
            slider.autoplay.stop();
        }
    }, [slider, autoplayEnabled]);

    const handleActiveIndexChange = useCallback(
        (swiper: SwiperClass) => {
            if (onActiveIndexChange) {
                onActiveIndexChange(swiper);
            }
            setCurrentIndex(swiper.activeIndex);
        },
        [onActiveIndexChange],
    );

    const handleArrowClick = useCallback(
        (direction: ArrowType) => {
            let nextIndex;

            if (direction === 'right') {
                nextIndex =
                    currentIndex === childrenCount - slidesCountByBreakpoint ? 0 : currentIndex + 1;
            } else {
                nextIndex =
                    currentIndex === 0 ? childrenCount - slidesCountByBreakpoint : currentIndex - 1;
            }

            if (slider) {
                slider.slideTo(nextIndex);
            }
        },
        [childrenCount, currentIndex, slider, slidesCountByBreakpoint],
    );

    const handleDotClick = useCallback(
        (index: number) => {
            const nextIndex = index > currentIndex ? index + 1 - slidesCountByBreakpoint : index;

            if (slider) {
                slider.slideTo(nextIndex);
            }
        },
        [slider, currentIndex, slidesCountByBreakpoint],
    );

    const barSlidesCount = childrenCount - slidesToShowCount + 1;
    const barPosition = (DOT_GAP + DOT_WIDTH) * currentIndex;
    const barWidth = DOT_WIDTH + (DOT_GAP + DOT_WIDTH) * (slidesCountByBreakpoint - 1);

    const renderBar = () => {
        return (
            slidesCountByBreakpoint > 1 && (
                <li
                    className={b('bar')}
                    style={{
                        left: barPosition,
                        width: barWidth,
                    }}
                ></li>
            )
        );
    };

    // renders additional bar, not visible in the layout but visible for screenreaders
    const renderAccessibleBar = (index: number) => {
        return (
            // To have this key differ from keys used in renderDot function, added `-accessible-bar` part
            <Fragment key={`${index}-accessible-bar`}>
                {slidesCountByBreakpoint > 0 && (
                    <li
                        className={b('accessible-bar')}
                        aria-current
                        aria-label={`Slide ${currentIndex + 1} of ${barSlidesCount}`}
                        style={{
                            left: barPosition,
                            width: barWidth,
                        }}
                    ></li>
                )}
            </Fragment>
        );
    };

    const getCurrentSlideNumber = (index: number) => {
        const currentIndexDiff = index - currentIndex;

        let currentSlideNumber;
        if (0 <= currentIndexDiff && currentIndexDiff < slidesToShowCount) {
            currentSlideNumber = currentIndex + 1;
        } else if (currentIndexDiff >= slidesToShowCount) {
            currentSlideNumber = index - slidesToShowCount + 2;
        } else {
            currentSlideNumber = index + 1;
        }
        return currentSlideNumber;
    };
    const isVisibleSlide = (index: number) => {
        const currentIndexDiff = index - currentIndex;

        return (
            slidesCountByBreakpoint > 0 &&
            0 <= currentIndexDiff &&
            currentIndexDiff < slidesToShowCount
        );
    };

    const renderDot = (index: number) => {
        return (
            <li
                key={index}
                className={b('dot', {active: index === currentIndex})}
                onClick={() => handleDotClick(index)}
                aria-hidden={isVisibleSlide(index) ? true : undefined}
                aria-label={`Slide ${getCurrentSlideNumber(index)} of ${barSlidesCount}`}
            ></li>
        );
    };

    const renderNavigation = () => {
        if (childrenCount <= slidesCountByBreakpoint || !dots || childrenCount === 1) {
            return null;
        }
        const dotsList = Array(childrenCount)
            .fill(null)
            .map((_item, index) => renderDot(index));
        dotsList.splice(currentIndex, 0, renderAccessibleBar(currentIndex));

        return (
            <div className={b('dots', dotsClassName)}>
                <ul className={b('dots-list')}>
                    {renderBar()}
                    {dotsList}
                </ul>
            </div>
        );
    };

    const renderDisclaimer = () => {
        return disclaimer ? (
            <div className={b('disclaimer', {size: disclaimer.size || 'm'})}>{disclaimer.text}</div>
        ) : null;
    };

    return (
        <StylesContext.Provider value={{...childStyles, setStyles: setChildStyles}}>
            <div
                className={b(
                    {
                        'one-slide': childrenCount === 1,
                        'only-arrows': !title?.text && !description && arrows,
                        type,
                    },
                    blockClassName,
                )}
            >
                {anchorId && <Anchor id={anchorId} />}
                <Title
                    title={title}
                    subtitle={description}
                    className={b('header', {'no-description': !description})}
                />
                <AnimateBlock className={b('animate-slides')} animate={animated}>
                    <Swiper
                        className={b('slider')}
                        onSwiper={setSlider}
                        modules={[Autoplay, A11y]}
                        speed={1000}
                        autoplay={
                            autoplayEnabled && {
                                delay: autoplay,
                            }
                        }
                        autoHeight={adaptive}
                        initialSlide={0}
                        breakpoints={getSliderResponsiveParams(slidesToShow)}
                        onSlideChange={onSlideChange}
                        onSlideChangeTransitionStart={onSlideChangeTransitionStart}
                        onSlideChangeTransitionEnd={onSlideChangeTransitionEnd}
                        onActiveIndexChange={handleActiveIndexChange}
                        onBreakpoint={handleBreakpoint}
                    >
                        {disclosedChildren.map((elem, index) => (
                            <SwiperSlide className={b('slide')} key={index}>
                                {elem}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {arrows && (
                        <Fragment>
                            <Arrow
                                className={b('arrow', {prev: true})}
                                type="left"
                                handleClick={handleArrowClick}
                                size={arrowSize}
                            />
                            <Arrow
                                className={b('arrow', {next: true})}
                                type="right"
                                handleClick={handleArrowClick}
                                size={arrowSize}
                            />
                        </Fragment>
                    )}
                    <div className={b('footer')}>
                        {renderDisclaimer()}
                        {renderNavigation()}
                    </div>
                </AnimateBlock>
            </div>
        </StylesContext.Provider>
    );
};

// TODO remove this and rework PriceDetailed CLOUDFRONT-12230
function discloseAllNestedChildren(children: React.ReactElement[]): React.ReactElement[] {
    if (!children) {
        return [];
    }

    return React.Children.map(children, (child) => {
        if (child) {
            // TODO: if child has 'items' then 'items' determinate like nested children for Slider.
            const nestedChildren = child.props.data?.items;

            if (nestedChildren) {
                return nestedChildren.map((nestedChild: React.ReactElement) =>
                    React.cloneElement(child, {
                        data: {
                            ...child.props.data,
                            items: [nestedChild],
                        },
                    }),
                );
            }
        }
        return child;
    }).filter(Boolean);
}

export default SliderNewBlock;
