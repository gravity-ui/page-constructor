import omit from 'lodash/omit';

import {BackgroundImageProps} from '../../components/Image/schema';
import {YandexFormProps} from '../../components/YandexForm/schema';
import {BlockBaseProps, withDevice, withTheme} from '../../schema/validators/common';
import {ContentBase} from '../../sub-blocks/Content/schema';
import {HubspotFormProps} from '../../sub-blocks/HubspotForm/schema';

const FormBlockContentProps = omit(ContentBase, ['size', 'centered', 'colSizes']);

const deviceSupportingStyle = <T extends (typeof BackgroundImageProps)['oneOf'][number]>(
    branch: T,
) => ({
    ...branch,
    properties: {
        ...omit(branch.properties, ['style']),
        style: withDevice(branch.properties.style),
    },
});

const FormBlockBackground = {
    oneOf: BackgroundImageProps.oneOf.map(deviceSupportingStyle),
};

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
                            yandex: withTheme(YandexFormProps),
                        },
                    },
                    {
                        type: 'object',
                        optionName: 'hubspot',
                        properties: {
                            hubspot: withTheme(HubspotFormProps),
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
            background: FormBlockBackground,
        },
    },
};
