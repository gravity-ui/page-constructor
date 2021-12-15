import React, {FC, useCallback, useContext, useEffect, useRef, useState} from 'react';
import SlickSlider, {Settings} from 'react-slick';
import _ from 'lodash';
import {ClassNameProps, Timeout} from '@yandex-data-ui/cloud-components';

import {block} from '../../utils';
import {Refable, SliderProps as SliderParams, SliderType} from '../../models';
import Arrow, {ArrowType} from './Arrow/Arrow';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import Anchor from '../../components/Anchor/Anchor';
import {
    getSliderResponsiveParams,
    getSlidesCountByBreakpoint,
    getSlidesToShowCount,
    getSlidesToShowWithDefaults,
} from './utils';
import {BREAKPOINTS} from '../../constants';
import BlockHeader from '../../components/BlockHeader/BlockHeader';
import {StylesContext} from '../../context/stylesContext/StylesContext';
import {SliderBreakpointParams} from './models';
import {MobileContext} from '../../context/mobileContext';
import OutsideClick from '../../components/OutsideClick/OutsideClick';
import useFocus from '../../hooks/useFocus';

import './slick.scss';
import './Slider.scss';
import {SSRContext} from '../../context/ssrContext';

const b = block('SliderBlock');
const slick = block('slick-origin');

const DOT_WIDTH = 8;
const DOT_GAP = 16;

export interface SlickSliderFull extends SlickSlider {
    innerSlider?: {
        list: HTMLElement;
    };
}

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
}

const SliderBlock: FC<SliderProps> = (props) => {
    const {
        animated,
        title,
        description,
        type,
        anchorId,
        arrows,
        adaptive,
        autoplay = undefined,
        dots = false,
        dotsClassName,
        disclaimer,
        children,
        className,
        blockClassName,
        lazyLoad,
        onAfterChange: handleAfterChange,
        onBeforeChange: handleBeforeChange,
    } = props;

    const {isServer} = useContext(SSRContext);
    const isMobile = useContext(MobileContext);
    const [breakpoint, setBreakpoint] = useState<number>(BREAKPOINTS.xl);
    const [disclosedChildren] = useState<React.ReactChildren[]>(() =>
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
    const showNavigation = arrows === undefined ? childrenCount > slidesCountByBreakpoint : arrows;

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [animating, setAnimating] = useState<boolean>(false);
    const [childStyles, setChildStyles] = useState<Object>({});
    const [slider, setSlider] = useState<SlickSliderFull>();
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
                setAnimating(false);

                slider.slickGoTo(0);
            }
        }, 100),
        [slider, breakpoint],
    );

    const scrollLastSlide = useCallback(() => {
        const lastSlide = childrenCount - slidesToShowCount;

        if (autoplay && lastSlide === currentIndex) {
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
    }, [autoplay, currentIndex, childrenCount, slider, slidesToShowCount]);

    useEffect(() => {
        if (hasFocus && autoplayTimeId.current) {
            clearTimeout(autoplayTimeId.current);
        } else {
            scrollLastSlide();
        }
    }, [hasFocus, scrollLastSlide]);

    useEffect(() => {
        onResize();

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, [onResize]);

    const handleArrowClick = (direction: ArrowType) => {
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
    };

    const onBeforeChange = (current: number, next: number) => {
        if (handleBeforeChange) {
            handleBeforeChange(current, next);
        }

        setCurrentIndex(next);
        setAnimating(true);
    };

    const onAfterChange = (current: number) => {
        if (handleAfterChange) {
            handleAfterChange(current);
        }

        setAnimating(false);

        if (autoplayTimeId.current) {
            clearTimeout(autoplayTimeId.current);
        }

        if (!hasFocus) {
            scrollLastSlide();
        }
    };

    const handleDotClick = (index: number) => {
        const nextIndex = index > currentIndex ? index + 1 - slidesCountByBreakpoint : index;

        if (slider) {
            slider.slickGoTo(nextIndex);
        }
    };

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
                onClick={() => !animating && handleDotClick(index)}
            />
        );
    };

    const renderNavigation = () => {
        if (!showNavigation && !dots) {
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
        const variableWidth = isServer;

        const settings = {
            ref: (slickSlider: SlickSliderFull) => setSlider(slickSlider),
            className: slick(null, className),
            arrows: showNavigation,
            variableWidth,
            infinite: false,
            speed: 500,
            adaptiveHeight: adaptive,
            autoplay: Boolean(autoplay),
            autoplaySpeed: autoplay,
            slidesToShow: slidesToShowCount,
            slidesToScroll: 1,
            responsive: getSliderResponsiveParams(slidesToShow),
            beforeChange: onBeforeChange,
            afterChange: onAfterChange,
            initialSlide: 0,
            nextArrow: <Arrow type="right" handleClick={handleArrowClick} />,
            prevArrow: <Arrow type="left" handleClick={handleArrowClick} />,
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
                        'only-arrows': !title?.text && !description && showNavigation,
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

function discloseAllNestedChildren(children: React.ReactElement[]): React.ReactChildren[] {
    if (!children) {
        return [];
    }

    return React.Children.map(children, (child: React.ReactElement) => {
        if (child) {
            // TODO: if child has 'items' then 'items' determinate like nested children for Slider.
            const nestedChildren = child.props.items;
            if (nestedChildren) {
                return nestedChildren.map((nestedChild: React.ReactChildren) =>
                    React.cloneElement(child, {items: [nestedChild]}),
                );
            }
        }
        return child;
    }).filter(Boolean);
}

export default SliderBlock;
