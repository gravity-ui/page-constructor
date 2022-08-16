import {parse} from 'fast-html-parser';

import {format} from './date';

const NodeType = {
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
};

const kBlockElements = {
    div: true,
    p: true,
    // ul: true,
    // ol: true,
    li: true,
    // table: true,
    // tr: true,
    td: true,
    section: true,
    br: true,
};

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

// modified function from 'fast-html-parser'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getStructuredText(node: any) {
    let currentBlock = [];
    const blocks = [currentBlock];

    function dfs(node) {
        if (node.nodeType === NodeType.ELEMENT_NODE) {
            if (node.attributes['data-no-index']) {
                return;
            }
            if (node.tagName === 'pre') {
                const text = getContent(node.rawText);
                currentBlock.push(text);
            } else if (kBlockElements[node.tagName]) {
                if (currentBlock.length > 0) {
                    blocks.push((currentBlock = []));
                }
                node.childNodes.forEach(dfs);
                if (currentBlock.length > 0) {
                    blocks.push((currentBlock = []));
                }
            } else {
                node.childNodes.forEach(dfs);
            }
        } else if (node.nodeType === NodeType.TEXT_NODE) {
            if (node.isWhitespace) {
                // Whitespace node, postponed output
                currentBlock.prependWhitespace = true;
            } else {
                let text = node.text;
                if (currentBlock.prependWhitespace) {
                    text = ' ' + text;
                    currentBlock.prependWhitespace = false;
                }
                currentBlock.push(text);
            }
        }
    }

    dfs(node);

    return blocks
        .map((block) => {
            // Normalize each line's whitespace
            const line = block
                .join(' ')
                .trim()
                .replace(/\s{2,}/g, ' ')
                .replace(/\s([.,!?:;])/g, '$1');
            return !line || /[.,!?:;]$/g.test(line) ? line : `${line}.`;
        })
        .join('\n')
        .trimRight();
}

function getContent(html: string, selector?: string) {
    const parsedHtml = parse(html, {pre: true});
    const content = selector
        ? parsedHtml.querySelector(selector) || parsedHtml.querySelector('body')
        : parsedHtml;
    return content && getStructuredText(content);
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
