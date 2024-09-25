import {useEffect, useState} from 'react';

import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';
import type {SwiperOptions} from 'swiper/types/swiper-options';

import {BREAKPOINTS} from '../../constants';

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

export const useMemoized = <T>(value: T): T => {
    const [memoizedValue, setMemoizedValue] = useState(value);

    useEffect(() => {
        setMemoizedValue((memoized) =>
            value && typeof value === 'object' && isEqual(memoized, value) ? memoized : value,
        );
    }, [value]);

    return memoizedValue;
};

const isFocusable = (element: Element): boolean => {
    if (!(element instanceof HTMLElement)) {
        return false;
    }
    const tabIndexAttr = element.getAttribute('tabindex');
    const hasTabIndex = tabIndexAttr !== null;
    const tabIndex = Number(tabIndexAttr);
    if (element.ariaHidden === 'true' || (hasTabIndex && tabIndex < 0)) {
        return false;
    }
    if (hasTabIndex && tabIndex >= 0) {
        return true;
    }

    // without this jest fails here for some reason
    let htmlElement:
        | HTMLAnchorElement
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement
        | HTMLButtonElement;
    switch (true) {
        case element instanceof HTMLAnchorElement:
            htmlElement = element as HTMLAnchorElement;
            return Boolean(htmlElement.href);
        case element instanceof HTMLInputElement:
            htmlElement = element as HTMLInputElement;
            return htmlElement.type !== 'hidden' && !htmlElement.disabled;
        case element instanceof HTMLSelectElement:
        case element instanceof HTMLTextAreaElement:
        case element instanceof HTMLButtonElement:
            htmlElement = element as HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement;
            return !htmlElement.disabled;
        default:
            return false;
    }
};

export const getFocusAnchor = (element: HTMLElement | null) => {
    if (!element) {
        return undefined;
    }

    if (isFocusable(element)) {
        return element;
    }

    return Array.from(element.querySelectorAll('*')).find(isFocusable) as HTMLElement | undefined;
};

export const setElementAtrributes = (element: Element, attributes: Record<string, unknown>) =>
    Object.entries(attributes).forEach(([attribute, value]) =>
        element.setAttribute(attribute, String(value)),
    );
