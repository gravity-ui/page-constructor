import React, {useMemo} from 'react';

import {
    Controller,
    FieldObjectValue,
    FieldValue,
    GroupIndent,
    ObjectIndependentInputProps,
    ObjectSpec,
    SpecTypes,
    ValidateError,
    transformArrOut,
} from '@gravity-ui/dynamic-forms';
import Ajv from 'ajv';
import _ from 'lodash';

import {block} from '../../../../utils';
import {getSpecTypeDefaultValue, useOneOf} from '../../hooks/useOneOf';
import {SpecCustomProps} from '../../parser/types';

import './OneOfCustom.scss';

const b = block('oneof-custom');

const ajv = new Ajv({
    $data: true,
    strict: false,
    strictSchema: false,
    strictTypes: false,
    strictRequired: false,
});

const getOneOfCsutomSpecDefaultType = (spec: ObjectSpec) =>
    spec.viewSpec?.order?.[0] || Object.keys(spec.properties || {})[0];

// dynamic-forms pass {} as default value for required properties of all types
// this function replaces {} with default value accordingly to selected OneOf option spec type
const getControllerDefautValue = (value: FieldValue, valueSpecType?: SpecTypes) => {
    const isDefaultValue = typeof value === 'object' && _.isEmpty(value);
    const defaultValue = valueSpecType ? getSpecTypeDefaultValue(valueSpecType) : undefined;

    return isDefaultValue ? (defaultValue as FieldValue) : value;
};

export const OneOfCustom: React.FC<ObjectIndependentInputProps> = (props) => {
    //getting oneOf option type from initial value
    const valueType = useMemo(
        () =>
            (props.spec?.properties &&
                Object.keys(props.spec?.properties)?.find((key) => {
                    const fieldSchema = (props.spec?.properties?.[key] as SpecCustomProps).__schema;

                    return (
                        fieldSchema && ajv.validate(fieldSchema, transformArrOut(props.input.value))
                    );
                })) ||
            getOneOfCsutomSpecDefaultType(props.spec),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const {oneOfValue, specProperties, toggler} = useOneOf({
        props: {
            ...props,
            input: {
                ...props.input,
                value: valueType ? {[valueType]: props.input.value} : props.input.value,
            },
        },
    });

    const parentOnChange = React.useCallback(
        (
            _childName: string,
            childValue: FieldValue,
            childErrors?: Record<string, ValidateError>,
        ) => {
            props.input.onChange(childValue as FieldObjectValue, childErrors);
        },
        [props.input],
    );

    const parentOnUnmount = React.useCallback(
        (childName: string) =>
            props.input.onChange((currentValue) => currentValue, {[childName]: false}),
        [props.input],
    );

    const valueSpecType = specProperties[oneOfValue]?.type || SpecTypes.Object;

    return (
        <div className={b()}>
            <div>{toggler}</div>
            {specProperties[oneOfValue] ? (
                <GroupIndent>
                    <Controller
                        value={getControllerDefautValue(props.input.value, valueSpecType)}
                        name={props.name}
                        spec={specProperties[oneOfValue]}
                        parentOnChange={parentOnChange}
                        parentOnUnmount={parentOnUnmount}
                        key={`${props.name}.${oneOfValue}`}
                    />
                </GroupIndent>
            ) : null}
        </div>
    );
};
