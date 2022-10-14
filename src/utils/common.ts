/* eslint-disable @typescript-eslint/no-explicit-any */
import {parse} from 'fast-html-parser';
import {format} from 'url';

import {Query} from '../models/common';

export function setUrlTld(url: string, tld = 'ru', force = false) {
    if (!url || typeof url !== 'string') {
        return url;
    }

    const newUrl = url.replace(/\${tld}/g, tld);

    if (!force) {
        return newUrl;
    }

    const urlObject = new URL(newUrl);
    urlObject.hostname = urlObject.hostname.replace(/\.\w+$/, `.${tld}`);

    return urlObject.href;
}

export interface QueryParam {
    name: string;
    value?: string | number | null;
}

export interface RouterActionOptions {
    shallow?: boolean;
}

export function getAbsolutePath(router: any, url?: string) {
    if (!router || !router.pathname) {
        return url ?? '';
    }

    const parsed: any = parse(url || router.as || '');

    return format({
        ...parsed,
        protocol: parsed.protocol || 'https',
        hostname: parsed.hostname || router.hostname,
        pathname: parsed.pathname || router.pathname,
    });
}

export function isRootPage(pathname: string) {
    return pathname === '/';
}

export const getPageSearchParams = (query: Query = {}) => {
    const searchParams = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        searchParams.set(key, String(value));
    });

    return searchParams;
};

export const scrollToHash = (hash: string, browser?: string) => {
    if (!hash) {
        return;
    }

    const element = document.getElementById(hash);

    if (!element) {
        return;
    }

    setTimeout(
        () => element.scrollIntoView({behavior: browser === 'Yandex' ? 'auto' : 'smooth'}),
        0,
    );
};
