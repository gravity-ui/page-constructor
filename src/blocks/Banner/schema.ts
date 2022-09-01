import {
    BaseProps,
    AnimatableProps,
    ThemeProps,
    withTheme,
    ButtonBlock,
} from '../../schema/validators/common';

export const BannerCardProps = {
    additionalProperties: false,
    required: ['title', 'button'],
    properties: {
        ...BaseProps,
        ...AnimatableProps,
        title: {
            type: 'string',
        },
        subtitle: {
            type: 'string',
        },
        image: withTheme({
            type: 'string',
        }),
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
