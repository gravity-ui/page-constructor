import React, {Fragment, PropsWithChildren} from 'react';

import {A11y, Autoplay, Pagination} from 'swiper/modules';
import type {SwiperProps} from 'swiper/react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/pagination';

import Anchor from '../../components/Anchor/Anchor';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import Title from '../../components/Title/Title';
import {ClassNameProps, Refable, SliderProps as SliderParams} from '../../models';
import {block} from '../../utils';

import Arrow from './Arrow/Arrow';
import {useSlider} from './useSlider';

import './Slider.scss';

const b = block('SliderNewBlock');

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

export const SliderNewBlock = ({
    animated,
    title,
    description,
    type,
    anchorId,
    arrows = true,
    adaptive,
    autoplay: autoplayMs,
    dots = true,
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
}: PropsWithChildren<SliderNewProps>) => {
    const {childrenCount, breakpoints, slider, autoplay, onSwiper} = useSlider({
        slidesToShow,
        children,
        type,
        autoplayMs,
    });

    return (
        <div
            className={b(
                {
                    'one-slide': childrenCount === 1,
                    'only-arrows': !title?.text && !description && arrows,
                    'without-dots': !dots,
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
                    onSwiper={onSwiper}
                    modules={[Autoplay, A11y, Pagination]}
                    pagination={{
                        horizontalClass: b('dots'),
                        enabled: dots,
                        clickable: true,
                        bulletClass: b('dot', dotsClassName),
                        bulletActiveClass: b('dot_active'),
                    }}
                    speed={1000}
                    autoplay={autoplay}
                    autoHeight={adaptive}
                    initialSlide={0}
                    rewind
                    breakpoints={breakpoints}
                    onSlideChange={onSlideChange}
                    onSlideChangeTransitionStart={onSlideChangeTransitionStart}
                    onSlideChangeTransitionEnd={onSlideChangeTransitionEnd}
                    onActiveIndexChange={onActiveIndexChange}
                    onBreakpoint={onBreakpoint}
                >
                    {React.Children.map(children, (elem, index) => (
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
                            onClick={() => slider?.slidePrev()}
                            size={arrowSize}
                        />
                        <Arrow
                            className={b('arrow', {next: true})}
                            type="right"
                            onClick={() => slider?.slideNext()}
                            size={arrowSize}
                        />
                    </Fragment>
                )}
                <div className={b('footer')}>
                    {disclaimer ? (
                        <div className={b('disclaimer', {size: disclaimer.size || 'm'})}>
                            {disclaimer.text}
                        </div>
                    ) : null}
                </div>
            </AnimateBlock>
        </div>
    );
};

export default SliderNewBlock;
