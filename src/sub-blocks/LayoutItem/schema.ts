import {omit} from 'lodash';

import metaInfo from '../../components/MetaInfo/schema';
import {BaseProps, MediaProps} from '../../schema/validators/common';
import {ContentBase} from '../../sub-blocks/Content/schema';

export const LayoutItem = {
    type: 'object',
    additionalProperties: false,
    required: ['content', 'media'],
    properties: {
        ...BaseProps,
        media: MediaProps,
        content: omit(ContentBase, ['colSize', 'size', 'centered']),
        metaInfo: metaInfo,
        border: {
            type: 'boolean',
        },
        fullscreen: {
            type: 'boolean',
        },
    },
};
