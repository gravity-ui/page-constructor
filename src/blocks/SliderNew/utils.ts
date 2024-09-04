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
            MEMOIZABLE_TYPES.includes(typeof value) && isEqual(memoized, value) ? memoized : value,
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

const updatePaginationBulletData = (
    bullets: HTMLElement[],
    oldBulletData: (PaginationBulletData | undefined)[],
    getOnBulletFocus: UsePaginationBulletsProps['getOnBulletFocus'],
): PaginationBulletData[] => {
    const updatedBulletData = bullets.map((bullet, index) => {
        const old = oldBulletData[index];
        if (bullet === old?.bullet) {
            return old;
        }

        old?.bullet.removeEventListener('focus', old.onFocus);

        const onFocus = getOnBulletFocus(index);
        bullet.addEventListener('focus', onFocus);

        return {bullet, onFocus};
    });

    if (updatedBulletData.length < oldBulletData.length) {
        oldBulletData.slice(updatedBulletData.length).forEach((old) => {
            old?.bullet.removeEventListener('focus', old.onFocus);
        });
    }

    return updatedBulletData;
};

const makeUpdateBulletAttributes = (
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
                const newValue = value?.toString();
                const shouldClearValue = newValue === undefined;
                if (currentValue === newValue || (currentValue === null && shouldClearValue)) {
                    return;
                }

                if (shouldClearValue) {
                    bullet.removeAttribute(key);
                } else {
                    bullet.setAttribute(key, newValue);
                }
            });
        });
    };
};

const clearBullets = (bullets: PaginationBulletData[]) => {
    bullets.forEach(({bullet, onFocus}) => {
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
    const updateBulletAttributes = useMemo(
        () => makeUpdateBulletAttributes(activeBulletClassName, getBulletAttributes),
        [activeBulletClassName, getBulletAttributes],
    );

    const onBulletsUpdate = (s: Swiper) => {
        const bullets = s.pagination.bullets as unknown as HTMLElement[];
        bulletsRef.current = updatePaginationBulletData(
            bullets,
            bulletsRef.current,
            getOnBulletFocus,
        );
        updateBulletAttributes(bulletsRef.current, currentBulletIndex);
        setBulletCount(bulletsRef.current.length);
    };

    useEffect(() => {
        updateBulletAttributes(bulletsRef.current, currentBulletIndex);
    }, [currentBulletIndex, updateBulletAttributes]);

    useEffect(() => () => clearBullets(bulletsRef.current), []);

    return {bulletCount, onBulletsUpdate};
};

const getRovingTabindexCurrentItemId = (uniqId: string) => `${uniqId}-roving-tabindex-current-item`;
const makeGetRovingTabIndexBulletAttributes =
    (
        currentItemId: string,
        autoplayEnabled: boolean,
    ): UsePaginationBulletsProps['getBulletAttributes'] =>
    ({isActive, isCurrent}) => ({
        id: isCurrent ? currentItemId : undefined,
        tabindex: isActive && !autoplayEnabled ? 0 : -1,
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
        () => makeGetRovingTabIndexBulletAttributes(currentItemId, autoplayEnabled),
        [autoplayEnabled, currentItemId],
    );
    const {bulletCount, onBulletsUpdate} = usePaginationBullets({
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

        if (key.startsWith('arrow')) {
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

    const hasEventListenerRef = useRef(false);
    const onPaginationUpdate = (s: Swiper) => {
        onBulletsUpdate(s);

        const pagination = s.pagination.el;
        if (pagination === rovingListElementRef.current && hasEventListenerRef.current) {
            return;
        }

        pagination.setAttribute('role', 'menu');
        pagination.setAttribute('aria-hidden', String(autoplayEnabled));
        pagination.setAttribute('aria-label', i18n('pagination-label'));

        if (!hasEventListenerRef.current) {
            pagination.addEventListener('keydown', onRovingListKeyDown);
            hasEventListenerRef.current = true;
        }

        rovingListElementRef.current = pagination;
    };

    const onPaginationHide = useCallback(() => {
        if (hasEventListenerRef.current) {
            rovingListElementRef.current?.removeEventListener('keydown', onRovingListKeyDown);
            hasEventListenerRef.current = false;
        }
    }, [onRovingListKeyDown]);

    useEffect(() => () => onPaginationHide(), [onPaginationHide]);

    return {onPaginationUpdate, onPaginationHide};
};
