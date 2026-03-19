import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';
import {TextInput as TextInputUIKIT} from '@gravity-ui/uikit';
import {getValueByPath} from '../../utils/fields';

const TextInput = ({title, name, when, content, onUpdate}) => {
    const raw = getValueByPath(content, name);
    const value = raw == null ? '' : String(raw);

    return (
        <Base when={when} content={content}>
            <BaseInput title={title}>
                <TextInputUIKIT
                    name={name}
                    onUpdate={(value) => onUpdate(name, value)}
                    value={value}
                />
            </BaseInput>
        </Base>
    );
};

export default TextInput;
