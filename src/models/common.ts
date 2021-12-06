import {MetrikaGoal} from './blocks';

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

export interface Pixel<TEvent = string> {
    trackStandard: (event: TEvent, data?: Object) => void;
    trackCustom: (event: string, data?: Object) => void;
}

export interface Metrika {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reachGoal: (counterName: string, ...args: any) => void;
    reachGoals: (goals: MetrikaGoal, counterName?: string) => void;
}
