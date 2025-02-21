import React, {useCallback, useMemo, useState} from 'react';

import {Card, RadioButton} from '@gravity-ui/uikit';

import {DynamicFormValue, OneOfInput} from '../../../../../common/types';
import {ClassNameProps, PageContent} from '../../../../../models';
import {block} from '../../../../../utils';
import DynamicForm from '../../DynamicForm';
import FieldBase from '../../FieldBase/FieldBase';

import './OneOf.scss';

const b = block('oneof-dynamic-field');

interface OneOfDynamicFieldProps extends ClassNameProps {
    contentConfig: PageContent;
    onUpdate: (key: string, value: DynamicFormValue) => void;
    inputConfig: OneOfInput;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getOneOfContentConfig = (contentConfig: any, name: string) => {
    if (name) {
        return contentConfig ? contentConfig[name] : {};
    }
    return contentConfig;
};

const OneOfDynamicField: React.FC<OneOfDynamicFieldProps> = (props) => {
    const {contentConfig, onUpdate, className, inputConfig} = props;

    const defaultValue = inputConfig.options[0].value;

    const [oneOfMetaValue, setOneOfMetaValue] = useState(defaultValue);

    const oneOfContentConfig = getOneOfContentConfig(contentConfig, inputConfig.name);
    const oneOfChosenOption = useMemo(
        () =>
            inputConfig.options.find(
                ({value: foundOneOfValue}) => foundOneOfValue === oneOfMetaValue,
            ),
        [inputConfig.options, oneOfMetaValue],
    );

    const onUpdateOneOf = useCallback((value: string) => {
        setOneOfMetaValue(value);
    }, []);

    return (
        <FieldBase
            title={inputConfig.title}
            className={b(null, className)}
            onRefresh={(value) => onUpdate('', value)}
            expandable
        >
            <Card className={b('card')}>
                <RadioButton
                    className={b('radio')}
                    options={inputConfig.options.map((option) => ({
                        content: option.title,
                        value: option.value,
                    }))}
                    value={oneOfMetaValue}
                    onUpdate={onUpdateOneOf}
                />
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
