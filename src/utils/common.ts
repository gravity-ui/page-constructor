import {parse} from 'fast-html-parser';
import {format} from 'url';

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
