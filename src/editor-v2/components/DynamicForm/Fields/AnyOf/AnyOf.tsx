import {Card, SegmentedRadioGroup, Select} from '@gravity-ui/uikit';
import * as React from 'react';

import {AnyOfInput, DynamicFormValue} from '../../../../../common/types';
import {editorCn} from '../../../../utils/cn';
import DynamicForm from '../../DynamicForm';
import FieldBase from '../../FieldBase/FieldBase';

import './AnyOf.scss';

const b = editorCn('anyof-dynamic-field');

interface AnyOfDynamicFieldProps {
    contentConfig: DynamicFormValue;
    onUpdate: (key: string, value: DynamicFormValue) => void;
    inputConfig: AnyOfInput;
    className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAnyOfContentConfig = (contentConfig: any, name: string) => {
    if (name) {
        return contentConfig ? contentConfig[name] : {};
    }
    return contentConfig;
};

const AnyOfDynamicField = ({
    contentConfig,
    onUpdate,
    className,
    inputConfig,
}: AnyOfDynamicFieldProps) => {
    const defaultValue = inputConfig.options[0].value;

    const [anyOfMetaValue, setAnyOfMetaValue] = React.useState(defaultValue);

    const anyOfContentConfig = getAnyOfContentConfig(contentConfig, inputConfig.name);
    const anyOfChosenOption = React.useMemo(
        () =>
            inputConfig.options.find(
                ({value: foundAnyOfValue}) => foundAnyOfValue === anyOfMetaValue,
            ),
        [inputConfig.options, anyOfMetaValue],
    );

    const onUpdateAnyOf = React.useCallback((value: string) => {
        setAnyOfMetaValue(value);
    }, []);

    return (
        <FieldBase
            title={inputConfig.title}
            className={b(null, className)}
            onRefresh={(value) => onUpdate('', value)}
            expandable
        >
            <Card>
                {inputConfig.options.length < 4 ? (
                    <SegmentedRadioGroup
                        className={b('radio')}
                        options={inputConfig.options.map((option) => ({
                            content: option.title,
                            value: option.value,
                        }))}
                        value={anyOfMetaValue}
                        onUpdate={onUpdateAnyOf}
                    />
                ) : (
                    <Select
                        options={inputConfig.options.map((option) => ({
                            content: option.title,
                            value: option.value,
                        }))}
                        value={anyOfMetaValue ? [anyOfMetaValue] : []}
                        onUpdate={([selectValue]) => onUpdateAnyOf(selectValue)}
                        className={b('select')}
                    />
                )}
                {anyOfChosenOption && (
                    <DynamicForm
                        blockConfig={anyOfChosenOption.properties}
                        contentConfig={anyOfContentConfig}
                        onUpdateByKey={onUpdate}
                    />
                )}
            </Card>
        </FieldBase>
    );
};

export default AnyOfDynamicField;
