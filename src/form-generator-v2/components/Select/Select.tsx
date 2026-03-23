import {Select as SelectUIKIT} from '@gravity-ui/uikit';

import {CommonProps, SelectField} from '../../types';
import {getValueByPath} from '../../utils/fields';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';

type SelectProps = CommonProps & SelectField;

const Select = ({title, name, options, when, content, onUpdate}: SelectProps) => {
    const selected = getValueByPath(content, name);
    const value = selected ? [selected] : [];

    return (
        <Base when={when} content={content} name={name} onUpdate={onUpdate}>
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
                />
            </BaseInput>
        </Base>
    );
};

export default Select;
