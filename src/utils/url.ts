import {parse, format} from 'url';

export type Query = Record<string, number | string | null>;

export function getLinkProps(url: string, hostname?: string) {
    return isLinkExternal(url, hostname) ? {target: '_blank', rel: 'noopener noreferrer'} : {};
}

export function isLinkExternal(url: string, routerHostname?: string) {
    if (!routerHostname) {
        return true;
    }

    const {hostname} = parse(url);

    if (!hostname) {
        return false;
    }

    return getNonLocaleHostName(hostname) !== getNonLocaleHostName(routerHostname);
}

export function getNonLocaleHostName(hostname: string) {
    return hostname.replace(/\.(ru|com)$/, '');
}

export function setUrlTld(url: string, tld = 'ru') {
    return typeof url === 'string' ? url?.replace(/\${tld}/g, tld) : url;
}

export const getPageSearchParams = (query: Query = {}) => {
    const searchParams = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        searchParams.set(key, String(value));
    });

    return searchParams;
};

export function getAbsolutePath(hostname?: string, pathname?: string, url?: string) {
    if (!pathname) {
        return url ?? '';
    }

    const parsed = parse(url || '');

    return format({
        ...parsed,
        protocol: parsed.protocol || 'https',
        hostname: parsed.hostname || hostname,
        pathname: parsed.pathname || pathname,
    });
}
