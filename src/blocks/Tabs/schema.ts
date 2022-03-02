import {filteredArray} from '../../schema/utils';
import {ImageProps, LinkProps, withTheme} from '../../schema/common';
import {BlockBaseProps, TitleProps, MediaProps} from '../../schema/v2/common';

export const tabsItem = {
    type: 'object',
    additionalProperties: false,
    required: ['tabName', 'text'],
    properties: {
        tabName: {
            type: 'string',
        },
        title: {
            type: 'string',
        },
        text: {
            type: 'string',
        },
        caption: {
            type: 'string',
        },
        media: withTheme({
            type: 'object',
            properties: MediaProps,
        }),
        //TODO deprecated
        link: LinkProps,
        links: filteredArray(LinkProps),
        image: withTheme(ImageProps),
    },
};

export const TabsBlock = {
    'tabs-block': {
        additionalProperties: false,
        required: ['title', 'items'],
        properties: {
            ...BlockBaseProps,
            title: TitleProps,
            description: {
                type: 'string',
            },
            items: filteredArray(tabsItem),
        },
    },
};
