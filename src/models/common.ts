export interface Refable<T> {
    ref?: React.Ref<T>;
}

export enum Lang {
    Ru = 'ru',
    En = 'en',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PixelEventType = any;

export type Modifiers = {[name: string]: string | boolean | undefined};
