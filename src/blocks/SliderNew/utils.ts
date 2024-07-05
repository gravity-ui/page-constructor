import pickBy from 'lodash/pickBy';

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
    breakpoints?: SlidesToShow;
    mobileFullscreen?: boolean;
}
export function getSlidesToShowWithDefaults({
    contentLength,
    breakpoints,
    mobileFullscreen,
}: GetSlidesToShowParams) {
    let result;

    if (typeof breakpoints === 'number') {
        result = Object.keys(DEFAULT_SLIDE_BREAKPOINTS).reduce(
            (acc, breakpointName) => ({...acc, [breakpointName]: breakpoints}),
            {} as SliderBreakpointParams,
        );
    } else {
        result = breakpoints || DEFAULT_SLIDE_BREAKPOINTS;
    }

    return {
        ...DEFAULT_SLIDE_BREAKPOINTS,
        ...pickBy(result, (value) => !isNaN(value)),
        xs: !mobileFullscreen && contentLength > 1 ? DEFAULT_SLIDE_BREAKPOINTS.xs : 1,
    };
}

export function getSliderResponsiveParams(breakpoints: SliderBreakpointParams) {
    return Object.entries(breakpoints).reduce((res, [breakpointName, slidesToShow]) => {
        res[BREAKPOINTS[breakpointName as SliderBreakpointNames] + 1] = {
            slidesPerView: slidesToShow,
        };
        return res;
    }, {} as Record<number, {slidesPerView: number}>);
}

export function getSlidesToShowCount(breakpoints: SliderBreakpointParams) {
    return Math.floor(Math.max(...Object.values(breakpoints)));
}
