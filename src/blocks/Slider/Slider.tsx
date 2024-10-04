import React, {
    Fragment,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import debounce from 'lodash/debounce';
import get from 'lodash/get';
import noop from 'lodash/noop';
import SlickSlider, {Settings} from 'react-slick';

import Anchor from '../../components/Anchor/Anchor';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import OutsideClick from '../../components/OutsideClick/OutsideClick';
import Title from '../../components/Title/Title';
import ChildrenWrap from '../../components/editor/ChildrenWrap/ChildrenWrap';
import ItemWrap from '../../components/editor/ItemWrap/ItemWrap';
import {BREAKPOINTS} from '../../constants';
import {MobileContext} from '../../context/mobileContext';
import {SSRContext} from '../../context/ssrContext';
import {StylesContext} from '../../context/stylesContext/StylesContext';
import {Grid} from '../../grid';
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
    const disclosedChildren = useMemo<React.ReactElement[]>(
        () => discloseAllNestedChildren(children as React.ReactElement[]),
        [children],
    );
    const childrenCount = disclosedChildren.length;

    const slidesToShow = useMemo<SliderBreakpointParams>(
        () =>
            getSlidesToShowWithDefaults({
                contentLength: childrenCount,
                breakpoints: props.slidesToShow,
                mobileFullscreen: Boolean(
                    props.type && Object.values(SliderType).includes(props.type as SliderType),
                ),
            }),
        [childrenCount, props.slidesToShow, props.type],
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
        debounce(() => {
            if (!slider) {
                return;
            }

            const newBreakpoint = get(slider, 'state.breakpoint') || BREAKPOINTS.xl;

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
            <ChildrenWrap>
                <OutsideClick onOutsideClick={isMobile ? unsetFocus : noop}>
                    <SlickSlider {...settings}>
                        {React.Children.map(disclosedChildren, (child, index) => (
                            <ItemWrap index={index}>{child}</ItemWrap>
                        ))}
                    </SlickSlider>

                    <div className={b('footer')}>
                        {renderDisclaimer()}
                        {renderNavigation()}
                    </div>
                </OutsideClick>
            </ChildrenWrap>
        );
    };

    return (
        <StylesContext.Provider value={{...childStyles, setStyles: setChildStyles}}>
            <Grid>
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
                    <Title
                        title={title}
                        subtitle={description}
                        className={b('header', {'no-description': !description})}
                    />
                    <AnimateBlock className={b('animate-slides')} animate={animated}>
                        {renderSlider()}
                    </AnimateBlock>
                </div>
            </Grid>
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
