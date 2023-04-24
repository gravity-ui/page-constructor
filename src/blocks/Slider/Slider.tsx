import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';

import _ from 'lodash';
import SlickSlider, {Settings} from 'react-slick';

import Anchor from '../../components/Anchor/Anchor';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import BlockHeader from '../../components/BlockHeader/BlockHeader';
import OutsideClick from '../../components/OutsideClick/OutsideClick';
import {BREAKPOINTS} from '../../constants';
import {MobileContext} from '../../context/mobileContext';
import {SSRContext} from '../../context/ssrContext';
import {StylesContext} from '../../context/stylesContext/StylesContext';
import useFocus from '../../hooks/useFocus';
import {
    ClassNameProps,
    Refable,
    SliderProps as SliderParams,
    SliderType,
    Timeout,
    WithChildren,
} from '../../models';
import {block} from '../../utils';
import Arrow, {ArrowType} from './Arrow/Arrow';
import {SliderBreakpointParams} from './models';
import {
    getSliderResponsiveParams,
    getSlidesCountByBreakpoint,
    getSlidesToShowCount,
    getSlidesToShowWithDefaults,
} from './utils';

import './slick.scss';
// Cause Slider.css should override slick.css
// eslint-disable-next-line import/order
import './Slider.scss';

const b = block('SliderBlock');
const slick = block('slick-origin');

const DOT_WIDTH = 8;
const DOT_GAP = 16;

export interface SliderProps
    extends Omit<SliderParams, 'children'>,
        Refable<HTMLDivElement>,
        ClassNameProps,
        Pick<Settings, 'lazyLoad'> {
    type?: string;
    anchorId?: string;
    onAfterChange?: (index: number) => void;
    onBeforeChange?: (current: number, next: number) => void;
    dotsClassName?: string;
    blockClassName?: string;
    arrowSize?: number;
}

export const SliderBlock = (props: WithChildren<SliderProps>) => {
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
        className,
        blockClassName,
        lazyLoad,
        arrowSize,
        onAfterChange: handleAfterChange,
        onBeforeChange: handleBeforeChange,
    } = props;

    const {isServer} = useContext(SSRContext);
    const isMobile = useContext(MobileContext);
    const [breakpoint, setBreakpoint] = useState<number>(BREAKPOINTS.xl);
    const [disclosedChildren] = useState<React.ReactElement[]>(() =>
        discloseAllNestedChildren(children as React.ReactElement[]),
    );
    const childrenCount = disclosedChildren.length;

    const [slidesToShow] = useState<SliderBreakpointParams>(
        getSlidesToShowWithDefaults({
            contentLength: childrenCount,
            breakpoints: props.slidesToShow,
            mobileFullscreen: Boolean(
                props.type && Object.values(SliderType).includes(props.type as SliderType),
            ),
        }),
    );

    const slidesToShowCount = getSlidesToShowCount(slidesToShow);
    const slidesCountByBreakpoint = getSlidesCountByBreakpoint(breakpoint, slidesToShow);

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [childStyles, setChildStyles] = useState<Object>({});
    const [slider, setSlider] = useState<SlickSlider>();
    const autoplayTimeId = useRef<Timeout>();
    const {hasFocus, unsetFocus} = useFocus(slider?.innerSlider?.list);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onResize = useCallback(
        _.debounce(() => {
            if (!slider) {
                return;
            }

            const newBreakpoint = _.get(slider, 'state.breakpoint') || BREAKPOINTS.xl;

            if (newBreakpoint !== breakpoint) {
                setBreakpoint(newBreakpoint);
                setCurrentIndex(0);

                slider.slickGoTo(0);
            }
        }, 100),
        [slider, breakpoint],
    );

    const scrollLastSlide = useCallback(
        (current: number) => {
            const lastSlide = childrenCount - slidesToShowCount;

            if (autoplay && lastSlide === current) {
                // Slick doesn't support autoplay with no infinity scroll
                autoplayTimeId.current = setTimeout(() => {
                    if (slider) {
                        slider.slickGoTo(0, false);
                        slider.slickPause();
                    }
                    setTimeout(() => {
                        if (slider) {
                            slider.slickPlay();
                        }
                    }, 500);
                }, autoplay);
            }
        },
        [autoplay, childrenCount, slider, slidesToShowCount],
    );

    useEffect(() => {
        if (hasFocus && autoplayTimeId.current) {
            clearTimeout(autoplayTimeId.current);
        } else {
            scrollLastSlide(currentIndex);
        }
    }, [currentIndex, hasFocus, scrollLastSlide]);

    useEffect(() => {
        onResize();

        window.addEventListener('resize', onResize, {passive: true});

        return () => window.removeEventListener('resize', onResize);
    }, [onResize]);

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
                slider.slickGoTo(nextIndex);
            }
        },
        [childrenCount, currentIndex, slider, slidesCountByBreakpoint],
    );

    const onBeforeChange = useCallback(
        (current: number, next: number) => {
            if (handleBeforeChange) {
                handleBeforeChange(current, next);
            }

            setCurrentIndex(Math.ceil(next));
        },
        [handleBeforeChange],
    );

    const onAfterChange = useCallback(
        (current: number) => {
            if (handleAfterChange) {
                handleAfterChange(current);
            }

            if (autoplayTimeId.current) {
                clearTimeout(autoplayTimeId.current);
            }

            if (!hasFocus) {
                scrollLastSlide(current);
            }
        },
        [handleAfterChange, hasFocus, scrollLastSlide],
    );

    const handleDotClick = useCallback(
        (index: number) => {
            const nextIndex = index > currentIndex ? index + 1 - slidesCountByBreakpoint : index;

            if (slider) {
                slider.slickGoTo(nextIndex);
            }
        },
        [slider, currentIndex, slidesCountByBreakpoint],
    );

    const renderBar = () => {
        const barPosition = (DOT_GAP + DOT_WIDTH) * currentIndex;
        const barWidth = DOT_WIDTH + (DOT_GAP + DOT_WIDTH) * (slidesCountByBreakpoint - 1);

        return (
            slidesCountByBreakpoint > 1 && (
                <div
                    className={b('bar')}
                    style={{
                        left: barPosition,
                        width: barWidth,
                    }}
                />
            )
        );
    };

    const renderDot = (index: number) => {
        return (
            <div
                key={index}
                className={b('dot', {active: index === currentIndex})}
                onClick={() => handleDotClick(index)}
            />
        );
    };

    const renderNavigation = () => {
        if (childrenCount <= slidesCountByBreakpoint || !dots || childrenCount === 1) {
            return null;
        }

        return (
            <div className={b('dots', dotsClassName)}>
                <ul className={b('dots-list')}>
                    {renderBar()}
                    {Array(childrenCount)
                        .fill(null)
                        .map((_item, index) => renderDot(index))}
                </ul>
            </div>
        );
    };

    const renderDisclaimer = () => {
        return disclaimer ? (
            <div className={b('disclaimer', {size: disclaimer.size || 'm'})}>{disclaimer.text}</div>
        ) : null;
    };

    const renderSlider = () => {
        /* Disable adding of width in inline styles when SSR to prevent overriding of default styles */
        /* Calculate appropriate breakpoint for mobile devices with user agent */
        const variableWidth = isServer && isMobile;

        const settings = {
            ref: (slickSlider: SlickSlider) => setSlider(slickSlider),
            className: slick(null, className),
            arrows,
            variableWidth,
            infinite: false,
            speed: 1000,
            adaptiveHeight: adaptive,
            autoplay: Boolean(autoplay),
            autoplaySpeed: autoplay,
            slidesToShow: slidesToShowCount,
            slidesToScroll: 1,
            responsive: getSliderResponsiveParams(slidesToShow),
            beforeChange: onBeforeChange,
            afterChange: onAfterChange,
            initialSlide: 0,
            nextArrow: <Arrow type="right" handleClick={handleArrowClick} size={arrowSize} />,
            prevArrow: <Arrow type="left" handleClick={handleArrowClick} size={arrowSize} />,
            lazyLoad,
        };

        return (
            <OutsideClick onOutsideClick={isMobile ? unsetFocus : _.noop}>
                <SlickSlider {...settings}>{disclosedChildren}</SlickSlider>
                <div className={b('footer')}>
                    {renderDisclaimer()}
                    {renderNavigation()}
                </div>
            </OutsideClick>
        );
    };

    return (
        <StylesContext.Provider value={{...childStyles, setStyles: setChildStyles}}>
            <div
                className={b(
                    {
                        'align-left': childrenCount < slidesCountByBreakpoint,
                        'one-slide': childrenCount === 1,
                        'only-arrows': !title?.text && !description && arrows,
                        mobile: isMobile,
                        type,
                    },
                    blockClassName,
                )}
            >
                {anchorId && <Anchor id={anchorId} />}
                <BlockHeader
                    title={title}
                    description={description}
                    className={b('header', {'no-description': !description})}
                />
                <AnimateBlock className={b('animate-slides')} animate={animated}>
                    {renderSlider()}
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

export default SliderBlock;
