import {parse, format} from 'url';

export type Query = Record<string, number | string | null>;

const EXAMPLE_URL = 'https://example.org';
export const EXTERNAL_LINK_PROPS = {target: '_blank', rel: 'noopener noreferrer'};

export function getLinkProps(url: string, hostname?: string, target?: string) {
    let linkProps = {target};

    if (isLinkExternal(url, hostname)) {
        linkProps = {...linkProps, ...EXTERNAL_LINK_PROPS};
    }

    return linkProps;
}

export function isAbsoluteUrl(url: string | URL) {
    // Using example URL as base for relative links
    const urlObj = new URL(url, EXAMPLE_URL);

    return (
        // Compare url origin with example and check that original url was not example one
        urlObj.origin !== EXAMPLE_URL || (typeof url === 'string' && url.startsWith(EXAMPLE_URL))
    );
}

export function isLinkExternal(url: string, routerHostname?: string) {
    return (
        isAbsoluteUrl(url) &&
        getNonLocaleHostName(new URL(url).hostname) !== getNonLocaleHostName(routerHostname ?? '')
    );
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
