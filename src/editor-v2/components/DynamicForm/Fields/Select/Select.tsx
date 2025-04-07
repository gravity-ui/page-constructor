import {SegmentedRadioGroup, Select} from '@gravity-ui/uikit';

import {SelectMultipleInput, SelectSingleInput} from '../../../../../../common/types';
import {editorCn} from '../../../../utils/cn';
import FieldBase, {FieldBaseParams} from '../../FieldBase/FieldBase';

import './Select.scss';

const b = editorCn('editor-select-field');

type SelectInput = SelectSingleInput | SelectMultipleInput;

interface SelectDynamicFieldProps extends FieldBaseParams {
    input: SelectInput;
    value: string;
    onUpdate: (value: string | undefined) => void;
    className?: string;
}

const SelectDynamicField = ({input, value, onUpdate, className}: SelectDynamicFieldProps) => {
    const inputView = input.view || 'radiobutton';

    return (
        <FieldBase title={input.title} className={b(null, className)} onRefresh={onUpdate}>
            {inputView === 'select' && (
                <Select
                    placeholder={'Value'}
                    value={value ? [value] : []}
                    onUpdate={([selectValue]) => onUpdate(selectValue)}
                    options={input.enum}
                    className={b('select')}
                />
            )}
            {inputView === 'radiobutton' && (
                <SegmentedRadioGroup options={input.enum} value={value} onUpdate={onUpdate} />
            )}
        </FieldBase>
    );
};

export default SelectDynamicField;
