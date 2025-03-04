import _ from 'lodash';
import React, {useCallback} from 'react';

import {ConfigInput, DynamicFormValue} from '../../../common/types';
import {PageContent} from '../../../src/models';
import {editorCn} from '../../utils/cn';

import './DynamicForm.scss';
import ArrayDynamicField from './Fields/Array/Array';
import BooleanDynamicField from './Fields/Boolean/Boolean';
import NumberDynamicField from './Fields/Number/Number';
import ObjectDynamicField from './Fields/Object/Object';
import OneOfDynamicField from './Fields/OneOf/OneOf';
import SelectDynamicField from './Fields/Select/Select';
import TextDynamicField from './Fields/Text/Text';
import TextAreaDynamicField from './Fields/TextArea/TextArea';
import {getContent, getFullPath} from './utils';

const b = editorCn('dynamic-form');

interface DynamicFormProps {
    blockConfig: Array<ConfigInput>;
    contentConfig: PageContent;
    onUpdate: (key: string, value: DynamicFormValue) => void;
    className?: string;
}

const DynamicForm = ({blockConfig, onUpdate, contentConfig}: DynamicFormProps) => {
    const inputs = blockConfig;

    const getData = useCallback(
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

    const decide = useCallback(
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

    const renderInput = useCallback(
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
                onUpdate(fieldPath, value);
            };

            // Array and Objects
            const onComplexDynamicFieldUpdate = (key: string, value: DynamicFormValue) => {
                onUpdate(getFullPath(fieldPath, key), value);
            };

            switch (input.type) {
                case 'text': {
                    return (
                        <TextDynamicField
                            onRefresh={(value) => onUpdate(fieldPath, value)}
                            title={input.title}
                            value={fieldValue}
                            onUpdate={onSimpleDynamicFieldUpdate}
                        />
                    );
                }
                case 'boolean': {
                    return (
                        <BooleanDynamicField
                            onRefresh={(value) => onUpdate(fieldPath, value)}
                            title={input.title}
                            value={fieldValue}
                            onUpdate={onSimpleDynamicFieldUpdate}
                        />
                    );
                }
                case 'textarea': {
                    return (
                        <TextAreaDynamicField
                            onRefresh={(value) => onUpdate(fieldPath, value)}
                            title={input.title}
                            value={fieldValue}
                            onUpdate={onSimpleDynamicFieldUpdate}
                        />
                    );
                }
                case 'select': {
                    return (
                        <SelectDynamicField
                            onRefresh={(value) => onUpdate(fieldPath, value)}
                            input={input}
                            value={fieldValue}
                            onUpdate={onSimpleDynamicFieldUpdate}
                        />
                    );
                }
                case 'number': {
                    return (
                        <NumberDynamicField
                            onRefresh={(value) => onUpdate(fieldPath, value)}
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
                            onRefresh={(value) => onUpdate(fieldPath, value)}
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
                default: {
                    return <div>Ignore {JSON.stringify(input)}</div>;
                }
            }
        },
        [contentConfig, decide, onUpdate],
    );

    const sortedInputs = inputs.sort((x, y) => {
        const nestingFieldTypes = ['object', 'array', 'oneOf'];
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
