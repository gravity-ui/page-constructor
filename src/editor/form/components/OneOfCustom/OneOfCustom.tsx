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
import {convertFormSchemaToJson} from '../../../utils/form';
import {useOneOf} from '../../hooks/useOneOf';

import './OneOfCustom.scss';

const b = block('oneof-custom');
const ajv = new Ajv({
    strict: false,
    strictSchema: false,
    strictTypes: false,
    strictRequired: false,
});

const getOneOfCsutomSpecDefaultType = (spec: ObjectSpec) =>
    spec.viewSpec?.order?.[0] || Object.keys(spec.properties || {})[0];

export const OneOfCustom: React.FC<ObjectIndependentInputProps> = (props) => {
    const validatorSchema = React.useMemo(() => convertFormSchemaToJson(props.spec), [props.spec]);

    //getting one of option type from initial value
    const valueType = useMemo(
        () =>
            Object.keys(validatorSchema?.properties)?.find((key) =>
                ajv.validate(validatorSchema.properties[key], transformArrOut(props.input.value)),
            ) || getOneOfCsutomSpecDefaultType(props.spec),
        // [props.input.value],
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
