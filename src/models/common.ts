import {IDevice, IBrowser} from 'ua-parser-js';

import {PageContent} from '@gravity-ui/page-constructor';

export enum Theme {
    Light = 'light',
    Dark = 'dark',
}

export type Query = Record<string, number | string | null>;

//page models

export interface Menu {
    title: string;
}

export interface BasePageData {
    name: string;
    title: string;
    metaDescription: string;
    keywords: string[];
    noIndex?: boolean;
    shareTitle?: string;
    shareDescription?: string;
    shareImage?: string;
    service?: unknown;
    solution?: unknown;
}

export interface PageData extends BasePageData {
    content: PageContent;
}

export interface WithDeviceProps {
    device: IDevice;
    browser: IBrowser;
    isRobot: boolean;
}
