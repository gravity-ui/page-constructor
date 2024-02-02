import {
    AnimatableProps,
    BaseProps,
    ButtonBlock,
    ThemeProps,
    mediaView,
    withTheme,
} from '../../schema/validators/common';

export const BannerCardProps = {
    additionalProperties: false,
    required: ['title', 'button'],
    properties: {
        ...BaseProps,
        ...AnimatableProps,
        title: {
            type: 'string',
            contentType: 'text',
        },
        subtitle: {
            type: 'string',
            contentType: 'yfm',
        },
        image: withTheme({
            type: 'string',
        }),
        mediaView: {
            type: 'string',
            enum: mediaView,
        },
        disableCompress: {
            type: 'boolean',
        },
        color: withTheme({
            type: 'string',
        }),
        theme: ThemeProps,
        width: {
            type: 'string',
            enum: ['s', 'm', 'l'],
        },
        button: ButtonBlock,
    },
};

export const BannerBlock = {
    'banner-block': BannerCardProps,
};

export const BannerCard = {
    'banner-card': BannerCardProps,
};
