import React, {Fragment, PropsWithChildren} from 'react';

import SwiperCore, {A11y, Autoplay, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import Anchor from '../../components/Anchor/Anchor';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import Title from '../../components/Title/Title';
import {ClassNameProps, Refable, SliderProps as SliderParams} from '../../models';
import {block} from '../../utils';

import Arrow from './Arrow/Arrow';
import {i18n} from './i18n';
import {useSlider} from './useSlider';

import './Slider.scss';
import 'swiper/swiper-bundle.css';

const b = block('SliderNewBlock');

export interface SliderNewProps
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
}

SwiperCore.use([Autoplay, A11y, Pagination]);

const ACTIVE_BULLET_CLASSNAME = b('dot_active');

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
}: PropsWithChildren<SliderNewProps>) => {
    const {
        childrenCount,
        breakpoints,
        autoplay,
        onSwiper,
        onPrev,
        onNext,
        isLocked,
        setIsLocked,
        getSlideProps,
        onPaginationUpdate,
        onPaginationHide,
    } = useSlider({
        slidesToShow,
        children,
        type,
        autoplayMs,
        activeBulletClassName: ACTIVE_BULLET_CLASSNAME,
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
                    pagination={
                        dots && {
                            clickable: true,
                            bulletClass: b('dot', dotsClassName),
                            bulletActiveClass: ACTIVE_BULLET_CLASSNAME,
                        }
                    }
                    speed={1000}
                    autoplay={autoplay}
                    autoHeight={adaptive}
                    initialSlide={0}
                    noSwiping={false}
                    breakpoints={breakpoints}
                    onSlideChange={onSlideChange}
                    onSlideChangeTransitionStart={onSlideChangeTransitionStart}
                    onSlideChangeTransitionEnd={onSlideChangeTransitionEnd}
                    onActiveIndexChange={onActiveIndexChange}
                    onBreakpoint={onBreakpoint}
                    onLock={() => setIsLocked(true)}
                    onUnlock={() => setIsLocked(false)}
                    onPaginationUpdate={onPaginationUpdate}
                    onPaginationHide={onPaginationHide}
                    watchSlidesVisibility
                    watchOverflow
                    a11y={{
                        slideLabelMessage: '',
                        paginationBulletMessage: i18n('dot-label', {
                            index: '{{index}}',
                        }),
                    }}
                >
                    {React.Children.map(children, (elem, index) => (
                        <SwiperSlide className={b('slide')} key={index} {...getSlideProps(index)}>
                            {elem}
                        </SwiperSlide>
                    ))}
                </Swiper>
                {arrows && !isLocked && (
                    <Fragment>
                        <div aria-hidden={Boolean(autoplay)}>
                            <Arrow
                                className={b('arrow', {prev: true})}
                                type="left"
                                onClick={onPrev}
                                size={arrowSize}
                                extraProps={{tabIndex: autoplay ? -1 : 0}}
                            />
                            <Arrow
                                className={b('arrow', {next: true})}
                                type="right"
                                onClick={onNext}
                                size={arrowSize}
                                extraProps={{tabIndex: autoplay ? -1 : 0}}
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

export default SliderNewBlock;
