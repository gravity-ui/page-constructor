import {TextInput} from '@gravity-ui/uikit';

import {formGeneratorCn} from '../../../utils/cn';
import FieldBase, {FieldBaseParams} from '../../FieldBase/FieldBase';

const b = formGeneratorCn('number-dynamic-field');

interface NumberDynamicFieldProps extends FieldBaseParams {
    value: string;
    onUpdate: (value: number | undefined) => void;
    className?: string;
}

const NumberDynamicField = ({title, value, onUpdate, className}: NumberDynamicFieldProps) => {
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
