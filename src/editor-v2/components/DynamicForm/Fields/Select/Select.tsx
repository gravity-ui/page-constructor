import React from 'react';

import {RadioButton, Select} from '@gravity-ui/uikit';

import {SelectMultipleInput, SelectSingleInput} from '../../../../../common/types';
import {ClassNameProps} from '../../../../../models';
import {block} from '../../../../../utils';
import FieldBase, {FieldBaseParams} from '../../FieldBase/FieldBase';

const b = block('select-field');

type SelectInput = SelectSingleInput | SelectMultipleInput;

interface SelectDynamicFieldProps extends ClassNameProps, FieldBaseParams {
    input: SelectInput;
    value: string;
    onUpdate: (value: string | undefined) => void;
}

const SelectDynamicField: React.FC<SelectDynamicFieldProps> = (props) => {
    const {input, value, onUpdate, className} = props;

    const inputView = input.view || 'radiobutton';

    return (
        <FieldBase title={input.title} className={b(null, className)} onRefresh={onUpdate}>
            {inputView === 'select' && (
                <Select
                    placeholder={'Value'}
                    value={value ? [value] : []}
                    onUpdate={([selectValue]) => onUpdate(selectValue)}
                    options={input.enum}
                />
            )}
            {inputView === 'radiobutton' && (
                <RadioButton options={input.enum} value={value} onUpdate={onUpdate} />
            )}
        </FieldBase>
    );
};

export default SelectDynamicField;
