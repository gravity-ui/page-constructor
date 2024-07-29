export enum SliderBreakpointNames {
    Xs = 'xs',
    Sm = 'sm',
    Md = 'md',
    Lg = 'lg',
}

export type SliderBreakpointParams = Record<SliderBreakpointNames, number>;
export type SlidesToShow = Partial<SliderBreakpointParams> | number;
