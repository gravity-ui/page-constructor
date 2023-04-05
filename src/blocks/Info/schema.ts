import _ from 'lodash';

import {
    BaseProps,
    ButtonBlock,
    LinkProps,
    ThemeProps,
    withTheme,
} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';
import {ContentBase} from '../../sub-blocks/Content/schema';

const ContentProps = {
    additionalProperties: false,
    properties: _.omit(ContentBase, ['size', 'colSizes', 'theme']),
};

export const InfoBlock = {
    'info-block': {
        additionalProperties: false,
        required: ['title', 'sectionsTitle'],
        properties: {
            ...BaseProps,
            title: {
                type: 'string',
                contentType: 'text',
            },
            backgroundColor: withTheme({
                type: 'string',
            }),
            sectionsTitle: {
                type: 'string',
                contentType: 'text',
            },
            buttons: filteredArray(ButtonBlock),
            theme: ThemeProps,
            links: filteredArray(LinkProps),
            leftContent: ContentProps,
            rightContent: ContentProps,
        },
    },
};
