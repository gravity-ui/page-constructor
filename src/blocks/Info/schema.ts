import {filteredArray} from '../../schema/validators/utils';
import {
    BaseProps,
    LinkProps,
    ThemeProps,
    withTheme,
    ButtonBlock,
} from '../../schema/validators/common';

export const InfoBlock = {
    'info-block': {
        additionalProperties: false,
        required: ['title', 'sectionsTitle'],
        properties: {
            ...BaseProps,
            title: {
                type: 'string',
            },
            backgroundColor: withTheme({
                type: 'string',
            }),
            sectionsTitle: {
                type: 'string',
            },
            buttons: filteredArray(ButtonBlock),
            theme: ThemeProps,
            links: filteredArray(LinkProps),
        },
    },
};
