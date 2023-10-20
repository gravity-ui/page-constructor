export type ArrowDirection = 'left' | 'right';

export interface ReactPlayerBlockHandler
    extends Pick<HTMLVideoElement, 'play' | 'pause' | 'addEventListener'> {}
