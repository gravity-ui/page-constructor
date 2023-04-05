import {ImageObjectProps} from '../../components/Image/schema';
import {
    BlockBaseProps,
    FileLinkProps,
    contentSizes,
    contentTextWidth,
    contentThemes,
} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';
import {ContentBlock} from '../../sub-blocks/Content/schema';

export const ContentLayoutBlock = {
    'content-layout-block': {
        additionalProperties: false,
        properties: {
            ...BlockBaseProps,
            textContent: ContentBlock,
            fileContent: filteredArray(FileLinkProps),
            properties: {
                size: {
                    type: 'string',
                    enum: contentSizes,
                },
                background: ImageObjectProps,
                centered: {
                    type: 'boolean',
                },
                theme: {
                    type: 'string',
                    enum: contentThemes,
                },
                textWidth: {
                    type: 'string',
                    enum: contentTextWidth,
                },
            },
        },
    },
};
