import React, {Fragment, PropsWithChildren} from 'react';

export * as SwiperCore from 'swiper';
import SwiperCore, {A11y, Autoplay, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import Anchor from '../../components/Anchor/Anchor';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import Title from '../../components/Title/Title';
import {ClassNameProps, Refable, SliderProps as SliderParams, SliderType} from '../../models';
import {block} from '../../utils';

import Arrow from './Arrow/Arrow';
import {i18n} from './i18n';
import {useSlider} from './useSlider';
import {useSliderPagination} from './useSliderPagination';

import './Slider.scss';
import 'swiper/swiper-bundle.css';

const b = block('SliderBlock');

export interface SliderProps
    extends Omit<SliderParams, 'children'>,
        Partial<
            Pick<
                Swiper,
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
    initialSlide?: number;
}

export type OnSlideChange = SliderProps['onSlideChange'];
export type OnSlideChangeTransitionStart = SliderProps['onSlideChangeTransitionStart'];
export type OnSlideChangeTransitionEnd = SliderProps['onSlideChangeTransitionEnd'];
export type OnActiveIndexChange = SliderProps['onActiveIndexChange'];
export type OnBreakpoint = SliderProps['onBreakpoint'];

SwiperCore.use([Autoplay, A11y, Pagination]);

export const SliderBlock = ({
    animated,
    title,
    description,
    type,
    anchorId,
    arrows = true,
    adaptive,
    autoplay: autoplayMs,
    dots = true,
    initialSlide = 0,
    className,
    dotsClassName,
    disclaimer,
    children,
    blockClassName,
    arrowSize,
    slidesToShow,
    onSlideChange,
    onSlideChangeTransitionStart,
    onSlideChangeTransitionEnd,
    onActiveIndexChange,
    onBreakpoint,
}: PropsWithChildren<SliderProps>) => {
    const {
        autoplay,
        isLocked,
        childrenCount,
        breakpoints,
        onSwiper,
        onImagesReady,
        onPrev,
        onNext,
        setIsLocked,
    } = useSlider({
        slidesToShow,
        children,
        type,
        autoplayMs,
    });

    const isA11yControlHidden = Boolean(autoplay);
    const controlTabIndex = isA11yControlHidden ? -1 : 0;

    const paginationProps = useSliderPagination({
        enabled: dots,
        isA11yControlHidden,
        controlTabIndex,
        bulletClass: b('dot', dotsClassName),
        bulletActiveClass: b('dot_active'),
        paginationLabel: i18n('pagination-label'),
    });

    return (
        <div
            className={b(
                {
                    'one-slide': childrenCount === 1,
                    'only-arrows': !title?.text && !description && arrows,
                    'without-dots': !dots || isLocked,
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
                    className={b('slider', className)}
                    onSwiper={onSwiper}
                    speed={1000}
                    autoplay={autoplay}
                    autoHeight={adaptive}
                    initialSlide={initialSlide}
                    noSwiping={false}
                    breakpoints={breakpoints}
                    onSlideChange={onSlideChange}
                    onSlideChangeTransitionStart={onSlideChangeTransitionStart}
                    onSlideChangeTransitionEnd={onSlideChangeTransitionEnd}
                    onActiveIndexChange={onActiveIndexChange}
                    onBreakpoint={onBreakpoint}
                    onLock={() => setIsLocked(true)}
                    onUnlock={() => setIsLocked(false)}
                    onImagesReady={onImagesReady}
                    watchSlidesVisibility
                    watchOverflow
                    a11y={{
                        slideLabelMessage: '',
                        paginationBulletMessage: i18n('dot-label', {index: '{{index}}'}),
                    }}
                    {...paginationProps}
                >
                    {React.Children.map(children, (elem, index) => (
                        <SwiperSlide className={b('slide')} key={index}>
                            {({isVisible}) => (
                                <div
                                    className={b('slide-item')}
                                    aria-hidden={!isA11yControlHidden && !isVisible}
                                >
                                    {elem}
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
                {arrows && !isLocked && (
                    <Fragment>
                        <div aria-hidden={isA11yControlHidden}>
                            <Arrow
                                className={b('arrow', {prev: true})}
                                type="left"
                                transparent={type === SliderType.HeaderCard}
                                onClick={onPrev}
                                size={arrowSize}
                                extraProps={{tabIndex: controlTabIndex}}
                            />
                            <Arrow
                                className={b('arrow', {next: true})}
                                type="right"
                                transparent={type === SliderType.HeaderCard}
                                onClick={onNext}
                                size={arrowSize}
                                extraProps={{tabIndex: controlTabIndex}}
                            />
                        </div>
                    </Fragment>
                )}
                <div className={b('footer')}>
                    {disclaimer ? (
                        <div className={b('disclaimer', {size: disclaimer?.size || 'm'})}>
                            {disclaimer?.text}
                        </div>
                    ) : null}
                </div>
            </AnimateBlock>
        </div>
    );
};

export default SliderBlock;
