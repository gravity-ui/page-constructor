import {omit} from 'lodash';

import {BaseProps, MediaProps} from '../../schema/validators/common';
import {ContentBase} from '../../sub-blocks/Content/schema';
import metaInfo from '../../components/MetaInfo/schema';

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
        fullScreen: {
            type: 'boolean',
        },
    },
};
