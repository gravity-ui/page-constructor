import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';
import Swiper from 'swiper';
import type {SwiperOptions} from 'swiper/types/swiper-options';

import {BREAKPOINTS} from '../../constants';

import {i18n} from './i18n';
import {SliderBreakpointNames, SliderBreakpointParams, SlidesToShow} from './models';

export const DEFAULT_SLIDE_BREAKPOINTS = {
    [SliderBreakpointNames.Lg]: 3,
    [SliderBreakpointNames.Md]: 2,
    [SliderBreakpointNames.Sm]: 2,
    [SliderBreakpointNames.Xs]: 1.15,
};

export interface GetSlidesToShowParams {
    contentLength: number;
    slidesToShow?: SlidesToShow;
    mobileFullscreen?: boolean;
}
export function getSliderResponsiveParams({
    contentLength,
    slidesToShow,
    mobileFullscreen,
}: GetSlidesToShowParams) {
    let result;

    if (typeof slidesToShow === 'number') {
        result = Object.keys(DEFAULT_SLIDE_BREAKPOINTS).reduce(
            (acc, breakpointName) => ({...acc, [breakpointName]: slidesToShow}),
            {} as SliderBreakpointParams,
        );
    } else {
        result = slidesToShow || DEFAULT_SLIDE_BREAKPOINTS;
    }

    const showCount = {
        ...DEFAULT_SLIDE_BREAKPOINTS,
        ...pickBy(result, (value) => !isNaN(value)),
        xs: !mobileFullscreen && contentLength > 1 ? DEFAULT_SLIDE_BREAKPOINTS.xs : 1,
    };

    return Object.entries(showCount).reduce((res, [breakpointName, value]) => {
        // eslint-disable-next-line no-param-reassign
        res[BREAKPOINTS[breakpointName as SliderBreakpointNames] + 1] = {
            slidesPerView: value,
        };
        return res;
    }, {} as Record<number, SwiperOptions>);
}

export const getSlideId = (sliderId: string, index: number) => `slider-${sliderId}-child-${index}`;

const MEMOIZABLE_TYPES = ['object', 'function'];
export const useMemoized = <T>(value: T): T => {
    const [memoizedValue, setMemoizedValue] = useState(value);

    useEffect(() => {
        setMemoizedValue((memoized) =>
            typeof value in MEMOIZABLE_TYPES && isEqual(memoized, value) ? memoized : value,
        );
    }, [value]);

    return memoizedValue;
};

interface PaginationBulletData {
    bullet: HTMLElement;
    onFocus: () => void;
}

interface UsePaginationBulletsProps {
    currentBulletIndex: number;
    activeBulletClassName: string;
    getBulletAttributes: (
        flags: {isActive: boolean; isCurrent: boolean},
        index: number,
    ) => Record<string, string | number | boolean | undefined>;
    getOnBulletFocus: (index: number) => () => void;
}

const initBullets = (bullets: PaginationBulletData[]) => {
    bullets.forEach(({bullet, onFocus: onFocus}) => {
        bullet.addEventListener('focus', onFocus);
    });
};

const makeUpdateBullets = (
    activeBulletClassName: string,
    getBulletAttributes: UsePaginationBulletsProps['getBulletAttributes'],
) => {
    return (bullets: PaginationBulletData[], currentBulletIndex: number) => {
        bullets.forEach(({bullet}, index) => {
            const isCurrent = index === currentBulletIndex;
            const isActive = bullet.classList.contains(activeBulletClassName);
            const attributes = Object.entries(getBulletAttributes({isCurrent, isActive}, index));
            attributes.forEach(([key, value]) => {
                const currentValue = bullet.getAttribute(key);
                if (currentValue === value || (currentValue === null && value === undefined)) {
                    return;
                }

                const isEmptyAttribute = value === undefined;
                if (isEmptyAttribute) {
                    bullet.removeAttribute(key);
                } else {
                    bullet.setAttribute(key, value.toString());
                }
            });
        });
    };
};

const clearBullets = (bullets: PaginationBulletData[]) => {
    bullets.forEach(({bullet, onFocus: onFocus}) => {
        bullet.removeEventListener('focus', onFocus);
    });
};

const usePaginationBullets = ({
    currentBulletIndex,
    activeBulletClassName,
    getBulletAttributes,
    getOnBulletFocus,
}: UsePaginationBulletsProps) => {
    const bulletsRef = useRef<PaginationBulletData[]>([]);
    const [bulletCount, setBulletCount] = useState(0);
    const updateBullets = useMemo(
        () => makeUpdateBullets(activeBulletClassName, getBulletAttributes),
        [activeBulletClassName, getBulletAttributes],
    );

    const onBulletsRerender = (s: Swiper) => {
        clearBullets(bulletsRef.current);
        const bullets = s.pagination.bullets as unknown as HTMLElement[];
        bulletsRef.current = bullets.map((bullet, index) => ({
            bullet,
            onFocus: getOnBulletFocus(index),
        }));
        initBullets(bulletsRef.current);
        updateBullets(bulletsRef.current, currentBulletIndex);
        setBulletCount(bulletsRef.current.length);
    };

    useEffect(() => {
        updateBullets(bulletsRef.current, currentBulletIndex);
    }, [currentBulletIndex, updateBullets]);

    useEffect(() => () => clearBullets(bulletsRef.current), []);

    return {bulletCount, onBulletsRerender};
};

const getRovingTabindexCurrentItemId = (uniqId: string) => `${uniqId}-roving-tabindex-current-item`;
const makeGetRovingTabIndexBulletAttributes =
    (currentItemId: string): UsePaginationBulletsProps['getBulletAttributes'] =>
    ({isActive, isCurrent}) => ({
        id: isCurrent ? currentItemId : undefined,
        tabindex: isCurrent ? 0 : -1,
        'aria-checked': isActive,
        role: 'menuitemradio',
    });

export const useRovingTabIndex = (props: {
    uniqId: string;
    activeBulletClassName: string;
    autoplayEnabled: boolean;
    firstIndex?: number;
}) => {
    const {uniqId, activeBulletClassName, autoplayEnabled, firstIndex = 0} = props;

    const [currentIndex, setCurrentIndex] = useState(firstIndex);
    const rovingListElementRef = useRef<HTMLElement>();
    const currentItemId = getRovingTabindexCurrentItemId(uniqId);
    const getRovingTabIndexBulletAttributes = useMemo(
        () => makeGetRovingTabIndexBulletAttributes(currentItemId),
        [currentItemId],
    );
    const {bulletCount, onBulletsRerender} = usePaginationBullets({
        currentBulletIndex: currentIndex,
        activeBulletClassName,
        getBulletAttributes: getRovingTabIndexBulletAttributes,
        getOnBulletFocus: (index) => () => {
            setCurrentIndex(index + firstIndex);
        },
    });
    const lastIndex = bulletCount + firstIndex - 1;
    const firstIndexRef = useRef(firstIndex);
    const lastIndexRef = useRef(lastIndex);

    useEffect(() => {
        firstIndexRef.current = firstIndex;
        lastIndexRef.current = lastIndex;
    }, [firstIndex, lastIndex]);

    const isInitialRenderRef = useRef(true);
    useEffect(() => {
        if (isInitialRenderRef.current) {
            isInitialRenderRef.current = false;
            return;
        }
        if (!autoplayEnabled) {
            document.getElementById(currentItemId)?.focus();
        }
    }, [autoplayEnabled, currentIndex, currentItemId]);

    const onRovingListKeyDown = useCallback((e: KeyboardEvent) => {
        const key = e.key.toLowerCase();

        if (key !== 'tab' && key !== 'enter') {
            e.preventDefault();
        }

        switch (key) {
            case 'arrowleft':
            case 'arrowup':
                setCurrentIndex((prev) =>
                    prev <= firstIndexRef.current ? lastIndexRef.current : prev - 1,
                );
                return;
            case 'arrowright':
            case 'arrowdown':
                setCurrentIndex((prev) =>
                    prev >= lastIndexRef.current ? firstIndexRef.current : prev + 1,
                );
                return;
        }
    }, []);

    const onPaginationRerender = (s: Swiper) => {
        rovingListElementRef.current?.removeEventListener('keydown', onRovingListKeyDown);

        const pagination = s.pagination.el;
        pagination.addEventListener('keydown', onRovingListKeyDown);
        pagination.setAttribute('role', 'menu');
        pagination.setAttribute('aria-hidden', String(autoplayEnabled));
        pagination.setAttribute('aria-label', i18n('pagination-label'));

        rovingListElementRef.current = pagination;

        onBulletsRerender(s);
    };

    return onPaginationRerender;
};
