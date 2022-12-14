import {ConstructorBlock} from '../models/constructor';

import {TextSize, CustomConfig, PCShareSocialNetwork} from '../models';

export function getHeaderTag(size: TextSize) {
    switch (size) {
        case 'l':
            return 'h1';
        case 's':
            return 'h4';
        case 'm':
        default:
            return 'h2';
    }
}

export function getBlockKey(block: ConstructorBlock, index: number) {
    return `${block.type}-${index}`;
}

export const getCustomBlockTypes = ({blocks = {}, headers = {}}: CustomConfig = {}) => [
    ...Object.keys(blocks),
    ...Object.keys(headers),
];

export const getCustomItems = ({blocks = {}, headers = {}, subBlocks = {}}: CustomConfig = {}) => ({
    ...blocks,
    ...headers,
    ...subBlocks,
});

export const getCustomHeaderTypes = (customBlocks: CustomConfig = {}) => {
    const {headers = {}} = customBlocks;

    return Object.keys(headers);
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
