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

export async function setQueryParams(
    params: QueryParam | QueryParam[],
    hash?: string,
    options?: RouterActionOptions,
): Promise<void>;
export async function setQueryParams(
    params: QueryParam | QueryParam[],
    upScroll?: Boolean,
    options?: RouterActionOptions,
): Promise<void>;
export async function setQueryParams(
    params: QueryParam | QueryParam[],
    upScrollHash: Boolean | string = true,
    options?: RouterActionOptions,
) {
    const queryParams = new URLSearchParams(location.search);
    const newParams = Array.isArray(params) ? params : [params];

    newParams.forEach(({name, value}) => {
        if (value) {
            queryParams.set(name, value.toString());
        } else {
            queryParams.delete(name);
        }
    });

    const url =
        [...queryParams.keys()].length > 0
            ? `${location.pathname}?${queryParams}`
            : location.pathname;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (routerInstance as any).push(url, url, options);

    if (upScrollHash) {
        if (typeof upScrollHash === 'string') {
            scrollToHash(upScrollHash);
        } else {
            window.scrollTo(0, 0);
        }
    }
}

export function getAbsolutePath(router: any, url?: string) {
    if (!router || !router.pathname) {
        return url ?? '';
    }

    const parsed = parse(url || router.as || '');

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
