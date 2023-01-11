import {filteredArray} from '../../schema/validators/utils';
import {
    LinkProps,
    withTheme,
    BlockBaseProps,
    BlockHeaderProps,
    MediaProps,
    containerSizesArray,
    sizeNumber,
    mediaDirection,
} from '../../schema/validators/common';
import {ImageProps} from '../../components/Image/schema';
import _ from 'lodash';
import {ContentBase} from '../../sub-blocks/Content/schema';

const TabsItemContentProps = _.omit(ContentBase, ['size', 'colSizes', 'centered', 'theme']);

export const tabsItem = {
    type: 'object',
    additionalProperties: false,
    required: ['tabName'],
    properties: {
        ...TabsItemContentProps,
        tabName: {
            type: 'string',
        },
        caption: {
            type: 'string',
            contentType: 'text',
        },
        media: withTheme({
            type: 'object',
            properties: MediaProps,
        }),
        //TODO deprecated
        link: LinkProps,
        image: withTheme(ImageProps),
    },
};

export const TabsBlock = {
    'tabs-block': {
        additionalProperties: false,
        required: ['title', 'items'],
        properties: {
            ...BlockBaseProps,
            ...BlockHeaderProps,
            tabsColSizes: containerSizesArray.reduce(
                (acc, size) => ({...acc, [size]: sizeNumber}),
                {},
            ),
            direction: {
                type: 'string',
                enum: mediaDirection,
            },
            centered: {type: 'boolean'},
            items: filteredArray(tabsItem),
        },
    },
};
