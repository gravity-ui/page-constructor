import * as React from 'react';

import Swiper, {A11y, Autoplay, Pagination} from 'swiper';
import {Swiper as SwiperReact, SwiperSlide} from 'swiper/react';

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

export type {Swiper, SwiperOptions} from 'swiper';

const b = block('SliderBlock');

export interface SliderProps
    extends Omit<SliderParams, 'children'>,
        Partial<
            Pick<
                SwiperReact,
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

// eslint-disable-next-line react-hooks/rules-of-hooks
Swiper.use([Autoplay, A11y, Pagination]);

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
}: React.PropsWithChildren<SliderProps>) => {
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
                    'only-arrows':
                        (!title || (typeof title !== 'string' && !title?.text)) &&
                        !description &&
                        arrows,
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
                <SwiperReact
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
                </SwiperReact>
                {arrows && !isLocked && (
                    <React.Fragment>
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
                    </React.Fragment>
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
