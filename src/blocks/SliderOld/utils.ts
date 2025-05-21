import * as React from 'react';

import pickBy from 'lodash/pickBy';

import {BREAKPOINTS} from '../../constants';

import {SliderBreakpointNames, SliderBreakpointParams, SlidesToShow} from './models';

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

export const isFocusable = (element: Element): boolean => {
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

const getRovingListItemId = (uniqId: string, index: number) =>
    `${uniqId}-roving-tabindex-item-${index}`;
export function useRovingTabIndex(props: {
    itemCount: number;
    activeIndex: number;
    firstIndex?: number;
    uniqId: string;
}) {
    const {itemCount, activeIndex, firstIndex = 0, uniqId} = props;
    const [currentIndex, setCurrentIndex] = React.useState(firstIndex);
    const hasFocusRef = React.useRef(false);
    const lastIndex = itemCount + firstIndex - 1;

    const getRovingItemProps = (
        index: number,
    ): Pick<React.HTMLAttributes<HTMLElement>, 'id' | 'tabIndex' | 'onFocus'> => {
        return {
            id: getRovingListItemId(uniqId, index),
            tabIndex: index === activeIndex ? 0 : -1,
            onFocus: () => {
                setCurrentIndex(index);
                hasFocusRef.current = true;
            },
        };
    };

    React.useEffect(() => {
        if (!hasFocusRef.current) {
            return;
        }
        document.getElementById(getRovingListItemId(uniqId, currentIndex))?.focus();
    }, [activeIndex, currentIndex, uniqId]);

    const setNextIndex = () =>
        setCurrentIndex((prev: number) => (prev >= lastIndex ? firstIndex : prev + 1));
    const setPrevIndex = () =>
        setCurrentIndex((prev: number) => (prev <= firstIndex ? lastIndex : prev - 1));

    const onRovingListKeyDown: React.KeyboardEventHandler<HTMLElement> = (e) => {
        const key = e.key.toLowerCase();

        if (key !== 'tab' && key !== 'enter') {
            e.preventDefault();
        }

        switch (key) {
            case 'arrowleft':
            case 'arrowup':
                setPrevIndex();
                return;
            case 'arrowright':
            case 'arrowdown':
                setNextIndex();
                return;
        }
    };

    const onRovingListBlur: React.FocusEventHandler<HTMLElement> = () => {
        hasFocusRef.current = false;
    };

    const rovingListProps: React.HTMLAttributes<HTMLElement> = {
        onKeyDown: onRovingListKeyDown,
        onBlur: onRovingListBlur,
    };

    return {getRovingItemProps, rovingListProps};
}
