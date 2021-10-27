export interface Refable<T> {
    ref?: React.Ref<T>;
}

export enum Lang {
    Ru = 'ru',
    En = 'en',
}

//TODO manage with types CLOUDFRONT-8475
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PixelEventType = any;
