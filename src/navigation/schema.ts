import {ButtonProps} from '../schema/validators/common';
import {ImageProps, urlPattern} from '../components/Image/schema';
import {omit} from 'lodash';
import {filteredArray} from '../schema/validators/utils';

const NavigationItemType = {
    type: 'string',
    enum: ['link', 'button', 'dropdown'],
};

export const LogoProps = {
    type: 'object',
    additionalProperties: false,
    required: ['icon'],
    properties: {
        icon: ImageProps,
        text: {
            type: 'string',
            contentType: 'text',
        },
        url: {
            type: 'string',
        },
    },
};

const NavigationItemBaseProps = {
    text: {
        type: 'string',
        contentType: 'text',
    },
    url: {
        type: 'string',
    },
    icon: {
        type: 'string',
        pattern: urlPattern,
    },
};

const NavigationItemBaseLinkProps = omit(NavigationItemBaseProps, ['url']);

const NavigationLinkItemProps = {
    type: 'object',
    additionalProperties: false,
    required: ['type', 'text'],
    properties: {
        ...NavigationItemBaseLinkProps,
        type: {...NavigationItemType},
        url: {
            type: 'string',
        },
        target: {
            type: 'string',
        },
        arrow: {
            type: 'boolean',
        },
    },
};

const NavigationButtonItemProps = {
    type: 'object',
    additionalProperties: false,
    required: ['type', 'text', 'url'],
    properties: {
        ...ButtonProps,
        type: {...NavigationItemType},
    },
};

const NavigationDropdownItemProps = {
    type: 'object',
    additionalProperties: false,
    required: ['type', 'items'],
    properties: {
        ...NavigationItemBaseProps,
        type: {...NavigationItemType},
        items: filteredArray(NavigationLinkItemProps),
    },
};

const NavigationItemProps = {
    oneOf: [
        filteredArray(NavigationLinkItemProps),
        filteredArray(NavigationButtonItemProps),
        filteredArray(NavigationDropdownItemProps),
    ],
};

export const NavigationHeaderProps = {
    type: 'object',
    additionalProperties: false,
    required: ['leftItems'],
    properties: {
        leftItems: NavigationItemProps,
        rightItems: NavigationItemProps,
    },
};
