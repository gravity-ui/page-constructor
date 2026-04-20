import omit from 'lodash/omit';

import {ImageObjectProps} from '../../components/Image/schema';
import {
    BaseProps,
    CardBase,
    CardLayoutProps,
    containerSizesObject,
    withTheme,
} from '../../gravity-blocks/schema/validators/common';
import {AnalyticsEventSchema} from '../../gravity-blocks/schema/validators/event';
import {ContentBase} from '../Content/schema';

const BackgroundCardContentProps = omit(ContentBase, ['controlPosition']);

export const BackgroundCard = {
    'background-card': {
        additionalProperties: false,
        required: ['title', 'text'],
        properties: {
            ...BaseProps,
            ...CardBase,
            ...CardLayoutProps,
            ...BackgroundCardContentProps,
            url: {
                type: 'string',
            },
            urlTitle: {
                type: 'string',
            },
            background: withTheme(ImageObjectProps),
            backgroundColor: {
                type: 'string',
            },
            paddingBottom: {
                type: 'string',
                enum: ['s', 'm', 'l', 'xl'],
            },
            analyticsEvents: {
                oneOf: [
                    {
                        ...AnalyticsEventSchema,
                        optionName: 'single',
                    },
                    {
                        type: 'array',
                        items: AnalyticsEventSchema,
                        optionName: 'list',
                    },
                ],
            },
            controlPosition: {
                type: 'string',
                enum: ['content', 'footer'],
            },
            colSizes: containerSizesObject,
        },
    },
};
