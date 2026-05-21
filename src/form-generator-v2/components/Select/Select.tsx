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
}: SelectProps) => {
    const stored = getValueByPath(content, name);
    const hasStored =
        stored !== undefined &&
        stored !== null &&
        (typeof stored !== 'string' || stored.length > 0);
    const value = hasStored ? [String(stored as string | number | boolean)] : [];

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
                    options={options.map((option) => ({
                        value: option.value,
                        content: option.content || option.value,
                    }))}
                    placeholder="Not selected"
                    onUpdate={(v) =>
                        v.length > 0
                            ? onUpdate(name, v[0] as string)
                            : onUpdate(name, undefined, {unset: true})
                    }
                    value={value}
                    hasClear={hasClear}
                    className={b()}
                />
            </BaseInput>
        </Base>
    );
};

export default Select;
