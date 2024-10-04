import * as React from 'react';

import {useUniqId} from '@gravity-ui/uikit';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import noop from 'lodash/noop';
import _SlickSlider, {Settings} from 'react-slick';

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
} from '../../models';
import {block} from '../../utils';

import Arrow, {ArrowType} from './Arrow/Arrow';
import {i18n} from './i18n';
import {SliderBreakpointParams} from './models';
import {
    getSliderResponsiveParams,
    getSlidesCountByBreakpoint,
    getSlidesToShowCount,
    getSlidesToShowWithDefaults,
    isFocusable,
    useRovingTabIndex,
} from './utils';

import './Slider.scss';

const b = block('SliderBlock');
const slick = block('slick-origin');

const DOT_WIDTH = 8;
const DOT_GAP = 16;

const SlickSlider =
    'default' in _SlickSlider && _SlickSlider.default
        ? (_SlickSlider.default as typeof _SlickSlider)
        : _SlickSlider;

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

export const SliderBlock = (props: React.PropsWithChildren<SliderProps>) => {
    const {
        animated,
        title,
        description,
        type,
        anchorId,
        arrows = true,
        adaptive,
        autoplay: autoplaySpeed,
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

    const {isServer} = React.useContext(SSRContext);
    const isMobile = React.useContext(MobileContext);
    const [breakpoint, setBreakpoint] = React.useState<number>(BREAKPOINTS.xl);
    const sliderId = useUniqId();
    const disclosedChildren = React.useMemo<React.ReactElement[]>(
        () => discloseAllNestedChildren(children as React.ReactElement[], sliderId),
        [children, sliderId],
    );
    const childrenCount = disclosedChildren.length;
    const isAutoplayEnabled = autoplaySpeed !== undefined && autoplaySpeed > 0;
    const isUserInteractionRef = React.useRef(false);

    const slidesToShow = React.useMemo<SliderBreakpointParams>(
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

    const [currentIndex, setCurrentIndex] = React.useState<number>(0);
    const [childStyles, setChildStyles] = React.useState<Object>({});
    const [slider, setSlider] = React.useState<_SlickSlider>();
    const prevIndexRef = React.useRef<number>(0);
    const autoplayTimeId = React.useRef<Timeout>();
    const {hasFocus, unsetFocus} = useFocus(slider?.innerSlider?.list);

    const asUserInteraction =
        <T extends unknown[], R>(fn: (...args: T) => R) =>
        (...args: T): R => {
            isUserInteractionRef.current = true;
            return fn(...args);
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onResize = React.useCallback(
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

    const scrollLastSlide = React.useCallback(
        (current: number) => {
            const lastSlide = childrenCount - slidesToShowCount;

            if (isAutoplayEnabled && lastSlide === current) {
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
                }, autoplaySpeed);
            }
        },
        [autoplaySpeed, childrenCount, isAutoplayEnabled, slider, slidesToShowCount],
    );

    React.useEffect(() => {
        if (hasFocus && autoplayTimeId.current) {
            clearTimeout(autoplayTimeId.current);
        } else {
            scrollLastSlide(currentIndex);
        }
    }, [currentIndex, hasFocus, scrollLastSlide]);

    React.useEffect(() => {
        onResize();

        window.addEventListener('resize', onResize, {passive: true});

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

    const onBeforeChange = React.useCallback(
        (current: number, next: number) => {
            if (handleBeforeChange) {
                handleBeforeChange(current, next);
            }

            prevIndexRef.current = current;

            setCurrentIndex(Math.ceil(next));
        },
        [handleBeforeChange],
    );

    const onAfterChange = React.useCallback(
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

            if (isUserInteractionRef.current) {
                const focusIndex =
                    prevIndexRef.current >= current
                        ? current
                        : Math.max(current, prevIndexRef.current + slidesCountByBreakpoint);

                const firstNewSlide = document.getElementById(getSlideId(sliderId, focusIndex));
                if (firstNewSlide) {
                    const focusableChild = Array.from(firstNewSlide.querySelectorAll('*')).find(
                        isFocusable,
                    ) as HTMLElement | undefined;
                    focusableChild?.focus();
                }
            }

            isUserInteractionRef.current = false;
        },
        [handleAfterChange, hasFocus, scrollLastSlide, sliderId, slidesCountByBreakpoint],
    );

    const handleDotClick = (index: number) => {
        const nextIndex = index > currentIndex ? index + 1 - slidesCountByBreakpoint : index;

        if (slider) {
            slider.slickGoTo(nextIndex);
        }
    };

    const barSlidesCount = childrenCount - slidesCountByBreakpoint + 1;
    const barPosition = (DOT_GAP + DOT_WIDTH) * currentIndex;
    const barWidth = DOT_WIDTH + (DOT_GAP + DOT_WIDTH) * (slidesCountByBreakpoint - 1);

    const {getRovingItemProps, rovingListProps} = useRovingTabIndex({
        itemCount: barSlidesCount,
        activeIndex: currentIndex + 1,
        firstIndex: 1,
        uniqId: sliderId,
    });

    const renderBar = () => {
        return (
            slidesCountByBreakpoint > 1 && (
                <li
                    className={b('bar')}
                    style={{
                        left: barPosition,
                        width: barWidth,
                    }}
                />
            )
        );
    };

    // renders additional bar, not visible in the layout but visible for screenreaders
    const renderAccessibleBar = (index: number) => {
        return (
            // To have this key differ from keys used in renderDot function, added `-accessible-bar` part
            <React.Fragment key={`${index}-accessible-bar`}>
                {slidesCountByBreakpoint > 0 && (
                    <li
                        className={b('accessible-bar')}
                        role="menuitemradio"
                        aria-checked
                        aria-label={i18n('dot-label', {
                            index: currentIndex + 1,
                            count: barSlidesCount,
                        })}
                        style={{
                            left: barPosition,
                            width: barWidth,
                        }}
                        {...getRovingItemProps(currentIndex + 1)}
                    />
                )}
            </React.Fragment>
        );
    };

    const getCurrentSlideNumber = (index: number) => {
        const currentIndexDiff = index - currentIndex;

        let currentSlideNumber;
        if (0 <= currentIndexDiff && currentIndexDiff < slidesCountByBreakpoint) {
            currentSlideNumber = currentIndex + 1;
        } else if (currentIndexDiff >= slidesCountByBreakpoint) {
            currentSlideNumber = index - slidesCountByBreakpoint + 2;
        } else {
            currentSlideNumber = index + 1;
        }
        return currentSlideNumber;
    };
    const isVisibleSlide = (index: number) => {
        const currentIndexDiff = index - currentIndex;

        const result =
            slidesCountByBreakpoint > 0 &&
            0 <= currentIndexDiff &&
            currentIndexDiff < slidesCountByBreakpoint;
        return result;
    };

    const renderDot = (index: number) => {
        const isVisible = isVisibleSlide(index);
        const currentSlideNumber = getCurrentSlideNumber(index);
        const rovingItemProps = isVisible ? undefined : getRovingItemProps(currentSlideNumber);
        return (
            <li
                key={index}
                className={b('dot', {active: index === currentIndex})}
                onClick={asUserInteraction(() => handleDotClick(index))}
                onKeyDown={(e) => {
                    const key = e.key.toLowerCase();
                    if (key === 'space' || key === 'enter') {
                        e.currentTarget.click();
                    }
                }}
                role="menuitemradio"
                aria-checked={false}
                tabIndex={-1}
                aria-hidden={isVisible}
                aria-label={i18n('dot-label', {
                    index: currentSlideNumber,
                    count: barSlidesCount,
                })}
                {...rovingItemProps}
            />
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
                <ul
                    className={b('dots-list')}
                    role="menu"
                    aria-label={i18n('pagination-label')}
                    {...rovingListProps}
                >
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
            ref: (slickSlider: _SlickSlider) => setSlider(slickSlider),
            className: slick(null, className),
            arrows,
            variableWidth,
            infinite: false,
            speed: 1000,
            adaptiveHeight: adaptive,
            autoplay: isAutoplayEnabled,
            autoplaySpeed,
            slidesToShow: slidesToShowCount,
            slidesToScroll: 1,
            responsive: getSliderResponsiveParams(slidesToShow),
            beforeChange: onBeforeChange,
            afterChange: onAfterChange,
            initialSlide: 0,
            nextArrow: (
                <Arrow
                    type="right"
                    handleClick={asUserInteraction(handleArrowClick)}
                    size={arrowSize}
                />
            ),
            prevArrow: (
                <Arrow
                    type="left"
                    handleClick={asUserInteraction(handleArrowClick)}
                    size={arrowSize}
                />
            ),
            lazyLoad,
            accessibility: false,
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

function getSlideId(sliderId: string, index: number) {
    return `slider-${sliderId}-child-${index}`;
}

// TODO remove this and rework PriceDetailed CLOUDFRONT-12230
function discloseAllNestedChildren(
    children: React.ReactElement[],
    sliderId: string,
): React.ReactElement[] {
    if (!children) {
        return [];
    }

    let childIndex = 0;
    const wrapped = (child: React.ReactElement) => {
        const id = getSlideId(sliderId, childIndex++);

        return (
            <div key={id} id={id}>
                {child}
            </div>
        );
    };

    return React.Children.map(children, (child) => {
        if (child) {
            // TODO: if child has 'items' then 'items' determinate like nested children for Slider.
            const nestedChildren = child.props.data?.items;

            if (nestedChildren) {
                return nestedChildren.map((nestedChild: React.ReactElement) => {
                    return wrapped(
                        React.cloneElement(child, {
                            data: {
                                ...child.props.data,
                                items: [nestedChild],
                            },
                        }),
                    );
                });
            }
        }
        return child && wrapped(child);
    }).filter(Boolean);
}

export default SliderBlock;
