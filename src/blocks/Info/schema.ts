import _ from 'lodash';

import {filteredArray} from '../../schema/utils';
import {BaseProps, LinkProps, ThemeProps, withTheme} from '../../schema/common';
import {ButtonBlock} from '../../schema/v2/common';
import {ContentBase} from '../../components/Content/schema';

const ContentProps = {
    additionalProperties: false,

    properties: _.omit(ContentBase, ['size', 'colSizes', 'theme']),
};

export const InfoBlock = {
    'info-block': {
        additionalProperties: false,
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
            leftContent: ContentProps,
            rightContent: ContentProps,
        },
    },
};
