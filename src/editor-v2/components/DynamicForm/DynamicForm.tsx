import _ from 'lodash';
import * as React from 'react';

import {ConfigInput, DynamicFormValue} from '../../../common/types';
import {editorCn} from '../../utils/cn';

import ArrayDynamicField from './Fields/Array/Array';
import BooleanDynamicField from './Fields/Boolean/Boolean';
import NumberDynamicField from './Fields/Number/Number';
import ObjectDynamicField from './Fields/Object/Object';
import AnyOfDynamicField from './Fields/AnyOf/AnyOf';
import OneOfDynamicField from './Fields/OneOf/OneOf';
import SelectDynamicField from './Fields/Select/Select';
import TextDynamicField from './Fields/Text/Text';
import TextAreaDynamicField from './Fields/TextArea/TextArea';
import {getContent, getFullPath} from './utils';

import './DynamicForm.scss';

const b = editorCn('dynamic-form');

interface DynamicFormProps {
    blockConfig: Array<ConfigInput>;
    contentConfig?: object;
    onUpdateByKey?: (key: string, value: DynamicFormValue) => void;
    onUpdate?: (value: object) => void;
    className?: string;
}

const DynamicForm = ({blockConfig, onUpdateByKey, onUpdate, contentConfig}: DynamicFormProps) => {
    const inputs = blockConfig;

    const onDataUpdate = React.useCallback(
        (key: string, value: DynamicFormValue) => {
            if (onUpdateByKey) {
                onUpdateByKey(key, value);
            }
            if (onUpdate && contentConfig) {
                const newContentConfig = _.cloneDeep(contentConfig);
                _.set(newContentConfig, key, value);
                onUpdate(newContentConfig);
            }
        },
        [onUpdateByKey, onUpdate, contentConfig],
    );

    const getData = React.useCallback(
        (variable: string) => {
            if (variable.startsWith('block.')) {
                const purePath = variable.replace('block.', '');
                return _.get(contentConfig, purePath);
            }

            if (
                (variable.startsWith(`'`) && variable.endsWith(`'`)) ||
                (variable.startsWith(`"`) && variable.endsWith(`"`))
            ) {
                // @ts-ignore TODO: replaceAll types
                return variable.replaceAll(`'`, '').replaceAll(`"`, '');
            }

            return undefined;
        },
        [contentConfig],
    );

    const decide = React.useCallback(
        (showIf: string): boolean => {
            const parts = showIf.split(' ');

            if (!(parts.length === 3)) {
                // eslint-disable-next-line no-console
                console.log('Something bad happened in showIf, ignored');
                return true;
            }

            const [firstVariable, equals, secondVariable] = parts;

            const data1 = getData(firstVariable);
            const data2 = getData(secondVariable);

            if (equals === '===') {
                return data1 === data2;
            } else {
                return data1 !== data2;
            }
        },
        [getData],
    );

    const renderInput = React.useCallback(
        (input: ConfigInput) => {
            const fieldPath = input.name;
            const fieldValue = getContent(contentConfig, input.name);

            if (input.showIf) {
                const decision = decide(input.showIf);

                if (!decision) {
                    return <div>Hidden Field: {input.name}</div>;
                }
            }

            // Text, Select, Boolean and etc
            const onSimpleDynamicFieldUpdate = (value: DynamicFormValue) => {
                onDataUpdate(fieldPath, value);
            };

            // Array and Objects
            const onComplexDynamicFieldUpdate = (key: string, value: DynamicFormValue) => {
                onDataUpdate(getFullPath(fieldPath, key), value);
            };

            switch (input.type) {
                case 'text': {
                    return (
                        <TextDynamicField
                            onRefresh={(value) => onDataUpdate(fieldPath, value)}
                            title={input.title}
                            value={fieldValue}
                            onUpdate={onSimpleDynamicFieldUpdate}
                        />
                    );
                }
                case 'boolean': {
                    return (
                        <BooleanDynamicField
                            onRefresh={(value) => onDataUpdate(fieldPath, value)}
                            title={input.title}
                            value={fieldValue}
                            onUpdate={onSimpleDynamicFieldUpdate}
                        />
                    );
                }
                case 'textarea': {
                    return (
                        <TextAreaDynamicField
                            onRefresh={(value) => onDataUpdate(fieldPath, value)}
                            title={input.title}
                            value={fieldValue}
                            onUpdate={onSimpleDynamicFieldUpdate}
                        />
                    );
                }
                case 'select': {
                    return (
                        <SelectDynamicField
                            onRefresh={(value) => onDataUpdate(fieldPath, value)}
                            input={input}
                            value={fieldValue}
                            onUpdate={onSimpleDynamicFieldUpdate}
                        />
                    );
                }
                case 'number': {
                    return (
                        <NumberDynamicField
                            onRefresh={(value) => onDataUpdate(fieldPath, value)}
                            title={input.title}
                            value={fieldValue}
                            onUpdate={onSimpleDynamicFieldUpdate}
                        />
                    );
                }
                case 'object': {
                    if (!input || !('properties' in input)) {
                        return null;
                    }

                    return (
                        <ObjectDynamicField
                            onRefresh={(value) => onDataUpdate(fieldPath, value)}
                            blockConfig={input.properties}
                            title={input.title}
                            value={fieldValue}
                            onUpdate={onComplexDynamicFieldUpdate}
                        />
                    );
                }
                case 'array': {
                    return (
                        <ArrayDynamicField
                            blockConfig={input}
                            title={input.title}
                            values={fieldValue}
                            onUpdate={onComplexDynamicFieldUpdate}
                        />
                    );
                }
                case 'oneOf': {
                    if (!input || !('options' in input)) {
                        return null;
                    }

                    return (
                        <OneOfDynamicField
                            inputConfig={input}
                            contentConfig={contentConfig}
                            onUpdate={onComplexDynamicFieldUpdate}
                        />
                    );
                }
                case 'anyOf': {
                    if (!input || !('options' in input)) {
                        return null;
                    }

                    return (
                        <AnyOfDynamicField
                            inputConfig={input}
                            contentConfig={contentConfig}
                            onUpdate={onComplexDynamicFieldUpdate}
                        />
                    );
                }
                default: {
                    return <div>Ignore {JSON.stringify(input)}</div>;
                }
            }
        },
        [contentConfig, decide, onDataUpdate],
    );

    const sortedInputs = inputs.sort((x, y) => {
        const nestingFieldTypes = ['object', 'array', 'oneOf', 'anyOf'];
        if (nestingFieldTypes.includes(x.type)) {
            return 1;
        }
        if (nestingFieldTypes.includes(y.type)) {
            return -1;
        }
        return 0;
    });

    return (
        <div className={b()}>
            {sortedInputs.map((input, index) => (
                <React.Fragment key={index}>{renderInput(input)}</React.Fragment>
            ))}
        </div>
    );
};

export default DynamicForm;
