import {ContentBlock} from '../../sub-blocks/Content/schema';
import {filteredArray} from '../../schema/validators/utils';
import {
    contentSizes,
    contentTextWidth,
    contentThemes,
    FileLinkProps,
    BlockBaseProps,
} from '../../schema/validators/common';
import {ImageObjectProps} from '../../components/Image/schema';

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
