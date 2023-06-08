import {Schema} from '../../../schema';

export const getOneOfViewSpec = (layoutTitle: string) => {
    return {
        type: 'oneof_custom',
        layout: 'row',
        layoutTitle,
        oneOfParams: {
            toggler: 'select' as const,
        },
    };
};

export const getObjectViewSpec = (data: Schema, layoutTitle: string) => {
    return {
        layoutTitle,
        type: 'base',
        layout: 'accordeon',
        order: data.properties && Object.keys(data.properties).sort(),
        //@ts-ignore
        disabled: data.disabled,
    };
};

export const getArrayViewSpec = (layoutTitle: string) => ({
    layoutTitle,
    type: 'base',
    layout: 'accordeon',
    layoutOpen: true,
    itemLabel: 'Add Item',
});

export const getPrimitiveViewSpec = (layoutTitle: string, data: Schema) => {
    let type = data.inputType || 'base';

    if ('enum' in data && data.enum) {
        type = 'select';
    }
    return {
        layout: 'row',
        type,
        layoutTitle,
    };
};
