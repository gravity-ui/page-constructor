import {filteredArray} from '../../schema/validators/utils';
import {
    LinkProps,
    withTheme,
    BlockBaseProps,
    TitleProps,
    MediaProps,
} from '../../schema/validators/common';
import {ImageProps} from '../../components/Image/schema';

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
