import omit from 'lodash/omit';

import {Media} from '../../blocks/Media/schema';
import metaInfo from '../../components/MetaInfo/schema';
import {BaseProps, CardLayoutProps} from '../../schema/validators/common';
import {AnalyticsEventSchema} from '../../schema/validators/event';
import {ContentBase} from '../../sub-blocks/Content/schema';

export const LayoutItem = {
    type: 'object',
    additionalProperties: false,
    required: ['content', 'media'],
    properties: {
        ...BaseProps,
        ...CardLayoutProps,
        media: Media,
        content: {
            type: 'object',
            properties: omit(ContentBase, ['colSize', 'size', 'centered']),
        },
        metaInfo: metaInfo,
        border: {
            type: 'boolean',
        },
        fullscreen: {
            type: 'boolean',
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
    },
};
