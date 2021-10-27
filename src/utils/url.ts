import {parse} from 'url';

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
