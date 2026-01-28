import * as React from 'react';

import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';
import type {SwiperOptions} from 'swiper/types';

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

    return Object.entries(showCount).reduce(
        (res, [breakpointName, value]) => {
            // eslint-disable-next-line no-param-reassign
            res[BREAKPOINTS[breakpointName as SliderBreakpointNames] + 1] = {
                slidesPerView: value,
            };
            return res;
        },
        {} as Record<number, SwiperOptions>,
    );
}

export const useMemoized = <T>(value: T): T => {
    const [memoizedValue, setMemoizedValue] = React.useState(value);

    React.useEffect(() => {
        setMemoizedValue((memoized) =>
            value && typeof value === 'object' && isEqual(memoized, value) ? memoized : value,
        );
    }, [value]);

    return memoizedValue;
};

export const setElementAtrributes = (element: Element, attributes: Record<string, unknown>) =>
    Object.entries(attributes).forEach(([attribute, value]) =>
        element.setAttribute(attribute, String(value)),
    );
