import metaInfo from '../../components/MetaInfo/schema';
import {MediaProps, BaseProps, AnimatableProps} from '../../schema/validators/common';
import {ContentBase} from '../Content/schema';

export const MediaCardBlock = {
    'media-card': {
        additionalProperties: false,
        required: [],
        properties: {
            ...BaseProps,
            ...MediaProps,
            ...AnimatableProps,
            content: ContentBase,
            metaInfo,
        },
    },
};
