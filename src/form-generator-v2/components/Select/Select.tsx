import {Select as SelectUIKIT} from '@gravity-ui/uikit';

import {CommonProps, SelectField} from '../../types';
import {formGeneratorCn} from '../../utils/cn';
import {getValueByPath} from '../../utils/fields';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';

import './Select.scss';

type SelectProps = CommonProps & SelectField;

const b = formGeneratorCn('select');
const Select = ({
    title,
    name,
    options,
    when,
    content,
    onUpdate,
    hasClear,
    defaultValue,
    placeholder,
    multiple,
}: SelectProps) => {
    const stored = getValueByPath(content, name) ?? defaultValue;
    let value: string[] = [];
    if (multiple) {
        value = Array.isArray(stored) ? stored : [];
    } else if (stored !== undefined && stored !== null && stored !== '') {
        value = [String(stored)];
    }

    return (
        <Base
            when={when}
            content={content}
            name={name}
            onUpdate={onUpdate}
            defaultValue={defaultValue}
        >
            <BaseInput title={title}>
                <SelectUIKIT
                    name={name}
                    multiple={multiple}
                    options={options.map((option) => ({
                        value: option.value,
                        content: option.content || option.value,
                    }))}
                    placeholder={placeholder || 'Not selected'}
                    onUpdate={(v) => {
                        if (multiple) {
                            onUpdate(name, v);
                        } else if (v.length > 0) {
                            onUpdate(name, v[0]);
                        } else {
                            onUpdate(name, '');
                        }
                    }}
                    value={value}
                    hasClear={hasClear}
                    className={b()}
                />
            </BaseInput>
        </Base>
    );
};

export default Select;
