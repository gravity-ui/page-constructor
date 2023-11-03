import omit from 'lodash/omit';

import {ImageProps} from '../../components/Image/schema';
import {YandexFormProps} from '../../components/YandexForm/schema';
import {BlockBaseProps} from '../../schema/validators/common';
import {ContentBase} from '../../sub-blocks/Content/schema';
import {HubspotFormProps} from '../../sub-blocks/HubspotForm/schema';

const FormBlockContentProps = omit(ContentBase, ['size', 'centered', 'colSizes']);

export const FormBlock = {
    'form-block': {
        additionalProperties: false,
        required: ['formData'],
        properties: {
            ...BlockBaseProps,
            title: {
                type: 'string',
            },
            formData: {
                oneOf: [
                    {
                        type: 'object',
                        optionName: 'yandex',
                        properties: {
                            yandex: YandexFormProps,
                        },
                    },
                    {
                        type: 'object',
                        optionName: 'hubspot-inline',
                        properties: {
                            hubspot: HubspotFormProps,
                        },
                    },
                ],
            },
            textContent: {
                additionalProperties: false,
                properties: FormBlockContentProps,
            },
            direction: {
                enum: ['content-form', 'form-content', 'center'],
            },
            image: ImageProps,
            backgroundColor: {
                type: 'string',
            },
        },
    },
};
