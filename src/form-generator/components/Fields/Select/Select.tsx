import {SegmentedRadioGroup, Select} from '@gravity-ui/uikit';

import {SelectMultipleInput, SelectSingleInput} from '../../../types';
import {formGeneratorCn} from '../../../utils/cn';
import FieldBase, {FieldBaseParams} from '../../FieldBase/FieldBase';

import './Select.scss';

const b = formGeneratorCn('editor-select-field');

type SelectInput = SelectSingleInput | SelectMultipleInput;

interface SelectDynamicFieldProps extends FieldBaseParams {
    input: SelectInput;
    value: string | string[];
    onUpdate: (value: string | string[] | undefined) => void;
    className?: string;
}

const SelectDynamicField = ({input, value, onUpdate, className}: SelectDynamicFieldProps) => {
    const inputView = input.view || 'radiobutton';
    const isMultiple = input.mode === 'multiple';
    const currentValue = Array.isArray(value) ? value : [value];

    return (
        <FieldBase title={input.title} className={b(null, className)} onRefresh={onUpdate}>
            {(inputView === 'select' || isMultiple) && (
                <Select
                    placeholder={'Value'}
                    value={value ? currentValue : []}
                    onUpdate={(selectValues) =>
                        isMultiple ? onUpdate(selectValues) : onUpdate(selectValues[0])
                    }
                    options={input.enum}
                    className={b('select')}
                    multiple={isMultiple}
                />
            )}
            {inputView === 'radiobutton' && !isMultiple && (
                <SegmentedRadioGroup
                    options={input.enum}
                    value={Array.isArray(value) ? value[0] : value}
                    onUpdate={onUpdate}
                />
            )}
        </FieldBase>
    );
};

export default SelectDynamicField;
