export type ArrowDirection = 'left' | 'right';

export type ReactPlayerBlockHandler =
    | Pick<HTMLVideoElement, 'play' | 'pause' | 'addEventListener'>
    | undefined;
