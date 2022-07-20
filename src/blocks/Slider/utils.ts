import {SliderBreakpointNames, SliderBreakpointParams, SlidesToShow} from './models';
import {BREAKPOINTS} from '../../constants';

export const DEFAULT_SLIDE_BREAKPOINTS = {
    [SliderBreakpointNames.Xl]: 3,
    [SliderBreakpointNames.Lg]: 2,
    [SliderBreakpointNames.Md]: 2,
    [SliderBreakpointNames.Sm]: 1.15,
};

const BREAKPOINT_NAMES_BY_VALUES = Object.entries(BREAKPOINTS).reduce<
    Record<number, SliderBreakpointNames>
>((acc, [key, value]) => ({...acc, [value]: key as SliderBreakpointNames}), {});

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
        ...result,
        sm: !mobileFullscreen && contentLength > 1 ? DEFAULT_SLIDE_BREAKPOINTS.sm : 1,
    };
}

export function getSliderResponsiveParams(breakpoints: SliderBreakpointParams) {
    return Object.entries(breakpoints).map(([breakpointName, slidesToShow]) => ({
        breakpoint: BREAKPOINTS[breakpointName as SliderBreakpointNames],
        settings: {slidesToShow},
    }));
}

export function getSlidesCountByBreakpoint(
    breakpoint: number,
    breakpoints: SliderBreakpointParams,
) {
    const breakpointName = BREAKPOINT_NAMES_BY_VALUES[breakpoint];

    return Math.floor(breakpoints[breakpointName]);
}

export function getSlidesToShowCount(breakpoints: SliderBreakpointParams) {
    return Math.floor(Math.max(...Object.values(breakpoints)));
}
