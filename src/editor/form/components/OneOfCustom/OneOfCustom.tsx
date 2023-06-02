import React, {useMemo} from 'react';

import {
    Controller,
    FieldValue,
    GroupIndent,
    ObjectIndependentInput,
    ObjectIndependentInputProps,
    ObjectSpec,
    ValidateError,
    transformArrOut,
} from '@gravity-ui/dynamic-forms';
import Ajv from 'ajv';
import _ from 'lodash';

import {block} from '../../../../utils';
import {useOneOf} from '../../hooks/useOneOf';
import {convertFormSchemaToJsonSchema} from '../../utils';

import './OneOfCustom.scss';

const b = block('oneof-custom');
// const VALUE_KEY = 'value';
const ajv = new Ajv({
    strict: false,
    strictSchema: false,
    strictTypes: false,
    strictRequired: false,
});

export interface OneOfCustomProps extends ObjectIndependentInputProps {
    withoutIndent?: boolean;
}

const getOneOfCsutomSpecDefaultType = (spec: ObjectSpec) =>
    spec.viewSpec?.order?.[0] || Object.keys(spec.properties || {})[0];

const OneOfCustomComponent: React.FC<OneOfCustomProps> = (props) => {
    const validatorSchema = React.useMemo(
        () => convertFormSchemaToJsonSchema(props.spec),
        [props.spec],
    );
    const valueType = useMemo(
        () =>
            Object.keys(validatorSchema?.properties)?.find((key) =>
                ajv.validate(validatorSchema.properties[key], transformArrOut(props.input.value)),
            ) || getOneOfCsutomSpecDefaultType(props.spec),
        [[props.input.value]],
    );

    console.log('valueType', valueType);

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
            // const value = _.set({}, childName.split(`${props.input.name}.`).join(''), childValue);

            // props.input.onChange(value, childErrors);
            //@ts-ignore
            props.input.onChange(childValue, childErrors);
        },
        [props.input.onChange, props.input.name],
    );

    const parentOnUnmount = React.useCallback(
        (childName: string) =>
            props.input.onChange((currentValue) => currentValue, {[childName]: false}),
        [props.input.onChange],
    );

    return (
        <div
            className={b({
                base: !props.withoutIndent,
                flat: props.withoutIndent,
            })}
        >
            <div>{toggler}</div>
            {specProperties[oneOfValue] ? (
                <GroupIndent>
                    <Controller
                        // value={props.input.value?.[VALUE_KEY]}
                        // name={`${props.name}.${VALUE_KEY}`}
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

export const OneOfCustom = OneOfCustomComponent;

export const OneOfCustomFlat: ObjectIndependentInput = (props) => (
    <OneOfCustomComponent {...props} withoutIndent />
);
