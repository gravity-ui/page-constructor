import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';
import {Select as SelectUIKIT} from '@gravity-ui/uikit';
import { getValueByPath } from "../../utils/fields";

const Select = ({title, name, options, when, content, onUpdate}) => {
    const selected = getValueByPath(content, name);
    const value =
        selected !== undefined && selected !== null && selected !== '' ? [selected] : [];

    return (
        <Base when={when} content={content}>
            <BaseInput title={title}>
                <SelectUIKIT
                    name={name}
                    options={options.map(({value, content}) => ({value, content: content || value}))}
                    placeholder="Not selected"
                    onUpdate={(v) => onUpdate(name, v[0])}
                    value={value}
                />
            </BaseInput>
        </Base>
    );
};

export default Select;
