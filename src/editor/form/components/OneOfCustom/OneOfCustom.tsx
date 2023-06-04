import React, {useMemo} from 'react';

import {
    Controller,
    FieldObjectValue,
    FieldValue,
    GroupIndent,
    ObjectIndependentInputProps,
    ObjectSpec,
    ValidateError,
    transformArrOut,
} from '@gravity-ui/dynamic-forms';
import Ajv from 'ajv';
import _ from 'lodash';

import {block} from '../../../../utils';
import {useOneOf} from '../../hooks/useOneOf';

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

export const OneOfCustom: React.FC<ObjectIndependentInputProps> = (props) => {
    //getting one of option type from initial value
    const valueType = useMemo(
        () =>
            (props.spec?.properties && Object.keys(props.spec?.properties)?.find((key) => {
                const fieldSchema = props.spec?.properties?.[key].__jsonSchema;

                return fieldSchema && ajv.validate(fieldSchema, transformArrOut(props.input.value));
            })) || getOneOfCsutomSpecDefaultType(props.spec),
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
        [props.input.onChange, props.input.name],
    );

    const parentOnUnmount = React.useCallback(
        (childName: string) =>
            props.input.onChange((currentValue) => currentValue, {[childName]: false}),
        [props.input.onChange],
    );

    return (
        <div className={b()}>
            <div>{toggler}</div>
            {specProperties[oneOfValue] ? (
                <GroupIndent>
                    <Controller
                        value={props.input.value}
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
