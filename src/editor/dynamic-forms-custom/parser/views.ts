import {Schema} from '../../../schema';

import {CustomObjectSpec, CustomSpec} from './types';

interface BaseParams {
    layoutTitle?: string;
}

interface GetObjectViewSpecParams
    extends BaseParams,
        Partial<Extract<CustomSpec, CustomObjectSpec>> {
    layout?: string;
}

type GetPrimitiveViewSpecParams = BaseParams & Schema;

export const getOneOfViewSpec = ({layoutTitle}: BaseParams) => {
    return {
        type: 'oneof_custom',
        layout: 'row',
        layoutTitle,
        oneOfParams: {
            toggler: 'select' as const,
        },
    };
};

export const getObjectViewSpec = ({
    properties,
    disabled,
    layoutTitle,
    layout = 'accordeon',
}: GetObjectViewSpecParams) => {
    return {
        layoutTitle,
        type: 'base',
        layout,
        order: properties && Object.keys(properties).sort(),
        disabled,
    };
};

export const getArrayViewSpec = ({layoutTitle}: BaseParams) => ({
    layoutTitle,
    type: 'base',
    layout: 'accordeon',
    layoutOpen: true,
    itemLabel: 'Add Item',
});

export const getPrimitiveViewSpec = ({layoutTitle, ...data}: GetPrimitiveViewSpecParams) => {
    let type = data?.inputType || 'base';

    if (data && 'enum' in data && data.enum) {
        type = 'select';
    }
    return {
        layout: 'row',
        type,
        layoutTitle,
    };
};
