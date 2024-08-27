import camelCase from 'lodash/camelCase';
import flatten from 'lodash/flatten';

import {ConstructorBlock, CustomConfig, PCShareSocialNetwork, TextSize} from '../models';

const BLOCK_ELEMENTS = [
    'div',
    'p',
    'h[1-6]',
    'address',
    'article',
    'aside',
    'blockquote',
    'canvas',
    'dd',
    'dl',
    'dt',
    'fieldset',
    'figcaption',
    'footer',
    'header',
    'hr',
    'main',
    'nav',
    'section',
    'video',
    'pre',
    'figure',
    'form',
    'pre',
    'ol',
    'ul',
    'li',
    'table',
    'thead',
    'tbody',
    'tfoot',
    'tr',
    'th',
    'td',
];

const BLOCK_ELEMENTS_REGEX = `<(${BLOCK_ELEMENTS.join('|')})[^>]*>`;

const QA_ATTRIBUTES_KEYS = ['container', 'content', 'wrapper', 'image', 'button', 'animate'];

export function getHeaderTag(size: TextSize) {
    switch (size) {
        case 'l':
            return 'h1';
        case 's':
            return 'h3';
        case 'xs':
            return 'h4';
        case 'm':
        default:
            return 'h2';
    }
}

export function hasBlockTag(content?: string): boolean {
    if (!content) {
        return false;
    }

    const regex = new RegExp(BLOCK_ELEMENTS_REGEX, 'g');
    return regex.test(content);
}

export function getBlockKey(block: ConstructorBlock, index: number) {
    return `${block.type}-${index}`;
}

export const getCustomItems = (types: (keyof CustomConfig)[], customBlocks: CustomConfig = {}) => {
    return types.reduce((result, type: keyof CustomConfig) => {
        return Object.assign(result, customBlocks[type] || {});
    }, {});
};

export const getCustomTypes = (types: (keyof CustomConfig)[], customBlocks: CustomConfig = {}) => {
    return types.reduce((result, type: keyof CustomConfig) => {
        return result.concat(Object.keys(customBlocks[type] || {}));
    }, [] as string[]);
};

const getShareUrlWithParams = (url: string, params: Record<string, string | undefined> = {}) => {
    const result = new URL(url);

    Object.entries(params).forEach(([name, value]) => {
        if (value) {
            result.searchParams.set(name, value);
        }
    });

    return result.toString();
};

export const getOrderedBlocks = (blocks: ConstructorBlock[], headerBlockTypes: string[] = []) => {
    return blocks.filter(({type}) => !headerBlockTypes.includes(type));
};

export const getHeaderBlock = (blocks: ConstructorBlock[], headerBlockTypes: string[] = []) => {
    return blocks.find(({type}) => headerBlockTypes.includes(type));
};

export const getShareLink = (
    url: string,
    type: PCShareSocialNetwork,
    title?: string,
    text?: string,
) => {
    // https://github.com/bradvin/social-share-urls
    switch (type) {
        case PCShareSocialNetwork.Telegram:
            return getShareUrlWithParams('https://t.me/share/url', {url, text: title});
        case PCShareSocialNetwork.Facebook:
            return getShareUrlWithParams('https://facebook.com/sharer.php', {u: url});
        case PCShareSocialNetwork.Twitter:
            return getShareUrlWithParams('https://twitter.com/intent/tweet', {
                url,
                text: title,
            });
        case PCShareSocialNetwork.Vk:
            return getShareUrlWithParams('https://vk.com/share.php', {
                url,
                title,
                comment: text,
            });
        case PCShareSocialNetwork.LinkedIn:
            return getShareUrlWithParams('https://www.linkedin.com/sharing/share-offsite/', {
                url,
            });
        default:
            // eslint-disable-next-line no-console
            console.error(`Unknown share type: ${type}`);

            return undefined;
    }
};

export const getQaAttrubutes = (qa?: string, ...customKeys: (string | Array<string>)[]) => {
    const attributes: Record<string, string> = {};

    if (qa) {
        const keys = QA_ATTRIBUTES_KEYS.concat(flatten(customKeys));

        keys.forEach((key) => {
            attributes[camelCase(key)] = `${qa}-${key}`;
        });

        attributes.default = qa;
    }

    return attributes;
};
