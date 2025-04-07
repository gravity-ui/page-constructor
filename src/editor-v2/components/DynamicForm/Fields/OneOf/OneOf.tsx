import {Card, SegmentedRadioGroup, Select} from '@gravity-ui/uikit';
import * as React from 'react';

import {DynamicFormValue, OneOfInput} from '../../../../../../common/types';
import {editorCn} from '../../../../utils/cn';
import DynamicForm from '../../DynamicForm';
import FieldBase from '../../FieldBase/FieldBase';

import './OneOf.scss';

const b = editorCn('oneof-dynamic-field');

interface OneOfDynamicFieldProps {
    contentConfig: DynamicFormValue;
    onUpdate: (key: string, value: DynamicFormValue) => void;
    inputConfig: OneOfInput;
    className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getOneOfContentConfig = (contentConfig: any, name: string) => {
    if (name) {
        return contentConfig ? contentConfig[name] : {};
    }
    return contentConfig;
};

const OneOfDynamicField = ({
    contentConfig,
    onUpdate,
    className,
    inputConfig,
}: OneOfDynamicFieldProps) => {
    const defaultValue = inputConfig.options[0].value;

    const [oneOfMetaValue, setOneOfMetaValue] = React.useState(defaultValue);

    const oneOfContentConfig = getOneOfContentConfig(contentConfig, inputConfig.name);
    const oneOfChosenOption = React.useMemo(
        () =>
            inputConfig.options.find(
                ({value: foundOneOfValue}) => foundOneOfValue === oneOfMetaValue,
            ),
        [inputConfig.options, oneOfMetaValue],
    );

    const onUpdateOneOf = React.useCallback((value: string) => {
        setOneOfMetaValue(value);
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
                        value={oneOfMetaValue}
                        onUpdate={onUpdateOneOf}
                    />
                ) : (
                    <Select
                        options={inputConfig.options.map((option) => ({
                            content: option.title,
                            value: option.value,
                        }))}
                        value={oneOfMetaValue ? [oneOfMetaValue] : []}
                        onUpdate={([selectValue]) => onUpdateOneOf(selectValue)}
                        className={b('select')}
                    />
                )}
                {oneOfChosenOption && (
                    <DynamicForm
                        blockConfig={oneOfChosenOption.properties}
                        contentConfig={oneOfContentConfig}
                        onUpdate={onUpdate}
                    />
                )}
            </Card>
        </FieldBase>
    );
};

export default OneOfDynamicField;
