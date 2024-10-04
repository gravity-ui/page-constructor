import React from 'react';

import {TextInput} from '@gravity-ui/uikit';

import {ClassNameProps} from '../../../../../models';
import {block} from '../../../../../utils';
import FieldBase, {FieldBaseParams} from '../../FieldBase/FieldBase';

const b = block('number-dynamic-field');

interface NumberDynamicFieldProps extends ClassNameProps, FieldBaseParams {
    value: string;
    onUpdate: (value: number | undefined) => void;
}

const NumberDynamicField: React.FC<NumberDynamicFieldProps> = (props) => {
    const {title, value, onUpdate, className} = props;

    const onUpdateFunc = (updateValue: string) => {
        onUpdate(Number(updateValue));
    };

    return (
        <FieldBase title={title} className={b(null, className)} onRefresh={onUpdate}>
            <TextInput value={value || ''} onUpdate={onUpdateFunc} />
        </FieldBase>
    );
};

export default NumberDynamicField;
