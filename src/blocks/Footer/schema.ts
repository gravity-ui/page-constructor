import {ImageProps} from '../../components/Image/schema';
import {BlockBaseProps, LinkProps, withTheme} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';

const FooterLogoProps = {
    type: 'object',
    additionalProperties: false,
    required: ['image'],
    properties: {
        image: withTheme(ImageProps),
        href: {type: 'string'},
        alt: {type: 'string', contentType: 'text'},
    },
};

const FooterLinkColumn = {
    type: 'object',
    additionalProperties: false,
    required: ['title', 'links'],
    properties: {
        title: {type: 'string', contentType: 'text'},
        links: filteredArray(LinkProps),
    },
};

const FooterlContactItem = {
    type: 'object',
    additionalProperties: false,
    required: ['icon', 'url'],
    properties: {
        icon: withTheme(ImageProps),
        url: {type: 'string'},
        urlTitle: {type: 'string', contentType: 'text'},
    },
};

const FooterContactsBlock = {
    type: 'object',
    additionalProperties: false,
    required: ['title', 'links'],
    properties: {
        title: {type: 'string', contentType: 'text'},
        iconsSize: {type: 'string', enum: ['m', 'l']},
        links: filteredArray(FooterlContactItem),
        linksPosition: {type: 'string', enum: ['left', 'center']},
        titlePosition: {type: 'string', enum: ['top', 'near']},
    },
};

const FooterDisclaimerContent = {
    type: 'string',
    contentType: 'yfm',
    inputType: 'textarea',
};

const FooterLanguageSwitcherItem = {
    type: 'object',
    additionalProperties: false,
    required: ['languageLabel', 'url'],
    properties: {
        text: {type: 'string', contentType: 'text'},
        href: {type: 'string'},
    },
};

const FooterCopyrightBlock = {
    type: 'object',
    additionalProperties: false,
    required: [],
    properties: {
        links: filteredArray(LinkProps),
        languageSwitcher: filteredArray(FooterLanguageSwitcherItem),
        copyrightText: {type: 'string', contentType: 'text'},
    },
};

const FooterAttributionBlock = {
    type: 'boolean',
};

export const FooterBlock = {
    'footer-block': {
        additionalProperties: false,
        properties: {
            ...BlockBaseProps,
            logo: FooterLogoProps,
            columns: filteredArray(FooterLinkColumn),
            contacts: FooterContactsBlock,
            disclaimer: FooterDisclaimerContent,
            copyright: FooterCopyrightBlock,
            backgroundColor: withTheme({type: 'string'}),
            attribution: FooterAttributionBlock,
        },
    },
};
