import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';
import {Select as SelectUIKIT} from '@gravity-ui/uikit';

const Select = ({title, name, options, when, content, onUpdate}) => (
    <Base when={when} content={content}>
        <BaseInput title={title}>
            <SelectUIKIT
                name={name}
                options={options.map(({value, content}) => ({value, content: content || value}))}
                placeholder="Not selected"
                onUpdate={(value) => onUpdate(name, value[0])}
            />
        </BaseInput>
    </Base>
);

export default Select;
