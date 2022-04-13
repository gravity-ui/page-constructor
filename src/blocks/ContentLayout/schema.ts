import {ContentBlock} from '../../components/Content/schema';
import {filteredArray} from '../../schema/utils';
import {
    contentSizes,
    contentTextWidth,
    contentThemes,
    FileLinkProps,
    ImageObjectProps,
} from '../../schema/common';
import {BlockBaseProps} from '../../schema/v2/common';

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
