import omit from 'lodash/omit';

import {BaseProps, CardBase, CardLayoutProps, linkTarget} from '../../schema/validators/common';
import {ImageProps} from '../../schema/validators/components';
import {AnalyticsEventSchema} from '../../schema/validators/event';
import {ContentBase} from '../Content/schema';

const ImageCardBlockContentProps = omit(ContentBase, ['centered', 'colSizes', 'controlPosition']);

export const ImageCard = {
    'image-card': {
        additionalProperties: false,
        required: ['image'],
        properties: {
            ...BaseProps,
            ...CardBase,
            ...CardLayoutProps,
            ...ImageCardBlockContentProps,
            image: ImageProps,
            enableImageBorderRadius: {
                type: 'boolean',
            },
            direction: {
                type: 'string',
                enum: ['direct', 'reverse'],
            },
            margins: {
                type: 'string',
                enum: ['s', 'm'],
            },
            backgroundColor: {
                type: 'string',
            },
            url: {
                type: 'string',
            },
            urlTitle: {
                type: 'string',
            },
            target: {
                type: 'string',
                enum: linkTarget,
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
    },
};
