import {MetrikaGoal} from './';

export interface Refable<T> {
    ref?: React.Ref<T>;
}

export enum Theme {
    Light = 'light',
    Dark = 'dark',
}

/**
 * @deprecated Pixel will be deleted
 */
type PixelCommand = 'track' | 'trackCustom';

/**
 * @deprecated Pixel will be deleted
 */
export interface PixelEvent {
    command: PixelCommand;
    event: PixelEventType | string;
    data?: Object;
}

/**
 * @deprecated Pixel will be deleted from package
 */
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

/**
 * @deprecated Pixel will be deleted
 */
export interface Pixel<TEvent = string> {
    trackStandard: (event: TEvent, data?: Object) => void;
    trackCustom: (event: string, data?: Object) => void;
    track: (trackEvents: string | string[] | PixelEvent[] | PixelEvent) => void;
}

/**
 * @deprecated Metrika will be deleted
 */
export interface Metrika {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reachGoal: (counterName: string, ...args: any) => void;
    reachGoals: (goals: MetrikaGoal, counterName?: string) => void;
}

export interface ClassNameProps {
    className?: string;
}

export type Timeout = ReturnType<typeof setTimeout> | undefined;

export enum PredefinedEventTypes {
    Default = 'default-event',
    Play = 'play',
    Stop = 'stop',
}

export enum DefaultEventNames {
    ShareButton = 'share-button-click',
    Button = 'button-click',
    CardBase = 'card-base-click',
    Link = 'link-click',
    ReactPlayerControls = 'react-player-controls-click',
    YandexFormSubmit = 'yandex-form-submit',
    HubspotFormSubmit = 'hubspot-form-submit',
    QuoteButton = 'quote-button-click',
    BackLink = 'back-link-click',
    Breadcrumb = 'breadcrumb-click',
}

export type AnalyticsCounters = {
    include?: string[];
    exclude?: string[];
};

export type AnalyticsEvent<T = {}> = T & {
    name: string;
    type?: string;
    counters?: AnalyticsCounters;
    context?: string;
    target?: string;
};

export interface AnalyticsEventsBase {
    analyticsEvents?: AnalyticsEvent | AnalyticsEvent[];
}
