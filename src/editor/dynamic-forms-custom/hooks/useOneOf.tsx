import React from 'react';

import {
    FieldObjectValue,
    ObjectIndependentInputProps,
    Spec,
    SpecTypes,
} from '@gravity-ui/dynamic-forms';
import {RadioButton, Select} from '@gravity-ui/uikit';
import _ from 'lodash';

const MAX_TAB_TITLE_LENGTH = 20;

export interface UseOneOfParams {
    props: ObjectIndependentInputProps;
    onTogglerChange?: (value: string) => void;
}

export const getSpecTypeDefaultValue = (type: SpecTypes) => {
    switch (type) {
        case SpecTypes.Array:
            return [];
        case SpecTypes.Boolean:
        case SpecTypes.Number:
        case SpecTypes.String:
            return undefined;
        default:
            return {};
    }
};

export const useOneOf = ({props, onTogglerChange}: UseOneOfParams) => {
    const {name, input, spec, Layout} = props;
    const {order, disabled, oneOfParams} = spec.viewSpec;

    const specProperties = React.useMemo(
        () => (_.isObjectLike(spec.properties) ? (spec.properties as Record<string, Spec>) : {}),
        [spec.properties],
    );

    const [oneOfValue, setOneOfValue] = React.useState(() => {
        let valueKeys: string[] | undefined;

        if (_.isObjectLike(input.value)) {
            const keys = Object.keys(input.value);

            if (keys.length) {
                valueKeys = keys;
            }
        }

        return (valueKeys || order || Object.keys(specProperties))[0];
    });

    const onOneOfChange = React.useCallback(
        ([newValue]: string[]) => {
            if (newValue !== oneOfValue) {
                const specType = specProperties[newValue]?.type || SpecTypes.Object;
                input.onChange(getSpecTypeDefaultValue(specType) as FieldObjectValue);
                setOneOfValue(newValue);
                onTogglerChange?.(newValue);
            }
        },
        [setOneOfValue, input, oneOfValue, specProperties, onTogglerChange],
    );

    const options = React.useMemo(
        () =>
            (order || Object.keys(specProperties)).map((value) => {
                const title =
                    spec.description?.[value] ||
                    specProperties[value]?.viewSpec.layoutTitle ||
                    value ||
                    '';

                return {
                    value,
                    title,
                    content: title,
                };
            }),
        [spec.description, order, specProperties],
    );

    const togglerInput = React.useMemo(() => {
        if (
            oneOfParams?.toggler !== 'radio' &&
            (oneOfParams?.toggler === 'select' ||
                options.length > 3 ||
                _.some(options, ({title}) => title.length > MAX_TAB_TITLE_LENGTH))
        ) {
            return (
                <Select
                    width="max"
                    value={[oneOfValue]}
                    onUpdate={onOneOfChange}
                    options={options}
                    disabled={disabled}
                    filterable={options.length > 7}
                    qa={name}
                />
            );
        }

        return (
            <RadioButton
                value={oneOfValue}
                onChange={(event) => onOneOfChange([event.target.value])}
                disabled={disabled}
                qa={name}
            >
                {options.map(({value, title}) => (
                    <RadioButton.Option key={value} value={value}>
                        {title}
                    </RadioButton.Option>
                ))}
            </RadioButton>
        );
    }, [options, oneOfValue, onOneOfChange, name, oneOfParams?.toggler, disabled]);

    const toggler = React.useMemo(() => {
        if (Layout) {
            return <Layout {...props}>{togglerInput}</Layout>;
        }

        return togglerInput;
    }, [Layout, togglerInput, props]);

    return {oneOfValue, specProperties, toggler, togglerInput};
};
