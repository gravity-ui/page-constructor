import {GAEventParams, MetrikaGoal} from './';

export interface Refable<T> {
    ref?: React.Ref<T>;
}

export enum Theme {
    Light = 'light',
    Dark = 'dark',
}

type PixelCommand = 'track' | 'trackCustom';

export interface PixelEvent {
    command: PixelCommand;
    event: PixelEventType | string;
    data?: Object;
}

export enum PixelEventType {
    AddPaymentInfo = 'AddPaymentInfo',
    AddToCart = 'AddToCart',
    AddToWishlist = 'AddToWishlist',
    CompleteRegistration = 'CompleteRegistration',
    Contact = 'Contact',
    CustomizeProduct = 'CustomizeProduct',
    Donate = 'Donate',
    FindLocation = 'FindLocation',
    InitiateCheckout = 'InitiateCheckout',
    Lead = 'Lead',
    PageView = 'PageView',
    Purchase = 'Purchase',
    Schedule = 'Schedule',
    Search = 'Search',
    StartTrial = 'StartTrial',
    SubmitApplication = 'SubmitApplication',
    Subscribe = 'Subscribe',
    ViewContent = 'ViewContent',
}

export type Modifiers = {[name: string]: string | boolean | undefined};

export interface Pixel<TEvent = string> {
    trackStandard: (event: TEvent, data?: Object) => void;
    trackCustom: (event: string, data?: Object) => void;
    track: (trackEvents: string | string[] | PixelEvent[] | PixelEvent) => void;
}

export interface Metrika {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reachGoal: (counterName: string, ...args: any) => void;
    reachGoals: (goals: MetrikaGoal, counterName?: string) => void;
}

export interface GaInline {
    event: (eventName: string, params?: GAEventParams) => void;
}

export interface ClassNameProps {
    className?: string;
}

export type Timeout = ReturnType<typeof setTimeout> | undefined;
