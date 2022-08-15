import {PageContent} from '@yandex-data-ui/page-constructor';
import {BlogPostData} from './blog';

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

export interface BlogPostPageData {
    withPage: boolean;
    post: BlogPostData;
    page: PageData;
}
