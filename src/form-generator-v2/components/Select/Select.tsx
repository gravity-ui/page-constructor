import {Select as SelectUIKIT} from '@gravity-ui/uikit';

import {CommonProps, SelectField} from '../../types';
import {getValueByPath} from '../../utils/fields';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';

type SelectProps = CommonProps & SelectField;

const Select = ({title, name, options, when, content, onUpdate, hasClear, defaultValue}: SelectProps) => {
    const selected = getValueByPath(content, name) ?? defaultValue;
    const value = selected ? [selected] : [];

    return (
        <Base when={when} content={content} name={name} onUpdate={onUpdate} defaultValue={defaultValue}>
            <BaseInput title={title}>
                <SelectUIKIT
                    name={name}
                    options={options.map((option) => ({
                        value: option.value,
                        content: option.content || option.value,
                    }))}
                    placeholder="Not selected"
                    onUpdate={(v) => onUpdate(name, v[0])}
                    value={value}
                    hasClear={hasClear}
                />
            </BaseInput>
        </Base>
    );
};

export default Select;
