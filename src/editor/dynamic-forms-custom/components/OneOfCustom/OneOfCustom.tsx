import * as React from 'react';

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
import isEmpty from 'lodash/isEmpty';

import {block} from '../../../../utils';
import {getSpecTypeDefaultValue, useOneOf} from '../../hooks/useOneOf';
import {SpecCustomProps} from '../../parser/types';

import './OneOfCustom.scss';

const b = block('one-of-custom');

const ajv = new Ajv({
    $data: true,
    strict: false,
    strictSchema: false,
    strictTypes: false,
    strictRequired: false,
});

const getOneOfCustomSpecDefaultType = (spec: ObjectSpec) =>
    spec.viewSpec?.order?.[0] || Object.keys(spec.properties || {})[0];

// dynamic-forms pass {} as default value for required properties of all types
// this function replaces {} with default value accordingly to selected OneOf option spec type
const getControllerDefautValue = (value: FieldValue, valueSpecType?: SpecTypes) => {
    const isDefaultValue = typeof value === 'object' && isEmpty(value);
    const defaultValue = valueSpecType ? getSpecTypeDefaultValue(valueSpecType) : undefined;

    return isDefaultValue ? (defaultValue as FieldValue) : value;
};

/**
 * Customization of @gravity-ui/dynamic-forms OneOf component
 *
 * Main differences from original component:
 *
 * 1. Custom component can detect initial data type by it's json schema passed it __schema property of spec and
 * shows according input
 *
 * 2. Custom component doesn't create additional nested level of data for each OneOf option and doesn't wraps data value, e.g.
 *
 * custom component: {propertyName: propertyValue}
 * original component: {propertyName: {option1: {value: propertyValue}}}
 *
 * @param {ObjectIndependentInputProps} props - props of original OneOf component
 * @returns {React.ReactNode}
 */

export const OneOfCustom = (props: ObjectIndependentInputProps) => {
    const {spec, input, name} = props;
    const {properties} = spec;

    //getting oneOf option type from initial value
    const valueType = React.useMemo(
        () =>
            (properties &&
                Object.keys(properties)?.find((key) => {
                    const fieldSchema = (properties?.[key] as SpecCustomProps).__schema;

                    return fieldSchema && ajv.validate(fieldSchema, transformArrOut(input.value));
                })) ||
            getOneOfCustomSpecDefaultType(spec),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const {oneOfValue, specProperties, toggler} = useOneOf({
        props: {
            ...props,
            input: {
                ...input,
                value: valueType ? {[valueType]: input.value} : input.value,
            },
        },
    });

    const parentOnChange = React.useCallback(
        (
            _childName: string,
            childValue: FieldValue,
            childErrors?: Record<string, ValidateError>,
        ) => {
            input.onChange(childValue as FieldObjectValue, childErrors);
        },
        [input],
    );

    const parentOnUnmount = React.useCallback(
        (childName: string) => input.onChange((currentValue) => currentValue, {[childName]: false}),
        [input],
    );

    const valueSpecType = specProperties[oneOfValue]?.type || SpecTypes.Object;

    return (
        <div className={b()}>
            <div>{toggler}</div>
            {specProperties[oneOfValue] && (
                <GroupIndent>
                    <Controller
                        value={getControllerDefautValue(input.value, valueSpecType)}
                        name={name}
                        spec={specProperties[oneOfValue]}
                        parentOnChange={parentOnChange}
                        parentOnUnmount={parentOnUnmount}
                        key={`${name}.${oneOfValue}`}
                    />
                </GroupIndent>
            )}
        </div>
    );
};
