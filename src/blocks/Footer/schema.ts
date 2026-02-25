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
        title: {type: 'string', contentType: 'text'},
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

const FooterSection = {
    type: 'object',
    additionalProperties: false,
    required: ['columns'],
    properties: {
        columns: filteredArray(FooterLinkColumn),
    },
};

const FooterSocialLink = {
    type: 'object',
    additionalProperties: false,
    required: ['icon', 'url'],
    properties: {
        icon: withTheme(ImageProps),
        url: {type: 'string'},
        urlTitle: {type: 'string', contentType: 'text'},
    },
};

const FooterSocialFloor = {
    type: 'object',
    additionalProperties: false,
    required: ['socialLinks'],
    properties: {
        title: {type: 'string', contentType: 'text'},
        socialLinks: filteredArray(FooterSocialLink),
    },
};

const FooterDisclaimerFloor = {
    type: 'object',
    additionalProperties: false,
    required: ['content'],
    properties: {
        content: {type: 'string', contentType: 'yfm', inputType: 'textarea'},
    },
};

const FooterLanguage = {
    type: 'object',
    additionalProperties: false,
    required: [],
    properties: {
        label: {type: 'string', contentType: 'text'},
        url: {type: 'string'},
    },
};

const FooterLinksFloor = {
    type: 'object',
    additionalProperties: false,
    required: [],
    properties: {
        links: filteredArray(LinkProps),
        language: FooterLanguage,
        copyright: {type: 'string', contentType: 'text'},
    },
};

const FooterAttributionFloor = {
    type: 'object',
    additionalProperties: false,
    required: ['text'],
    properties: {
        text: {type: 'string', contentType: 'text'},
        logo: withTheme(ImageProps),
        href: {type: 'string'},
    },
};

const FooterSecondFloor = {
    type: 'object',
    additionalProperties: false,
    required: [],
    properties: {
        copyright: {type: 'string', contentType: 'text'},
        links: filteredArray(LinkProps),
        socialLinks: filteredArray(FooterSocialLink),
    },
};

export const FooterBlock = {
    'footer-block': {
        additionalProperties: false,
        required: ['columns'],
        properties: {
            ...BlockBaseProps,
            logo: FooterLogoProps,
            columns: filteredArray(FooterLinkColumn),
            additionalSections: filteredArray(FooterSection),
            socialFloor: FooterSocialFloor,
            disclaimerFloor: FooterDisclaimerFloor,
            linksFloor: FooterLinksFloor,
            secondFloor: FooterSecondFloor,
            attributionFloor: FooterAttributionFloor,
            backgroundColor: withTheme({type: 'string'}),
        },
    },
};
