import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';
import {TextInput as TextInputUIKIT} from '@gravity-ui/uikit';
import {getValueByPath} from '../../utils/fields';

type TextInputProps = {
    title: string;
    name: string;
    when?: unknown;
    content?: unknown;
    onUpdate: (name: string, value: unknown) => void;
};

const TextInput = ({title, name, when, content, onUpdate}: TextInputProps) => {
    const raw = getValueByPath(content, name);
    const value = raw == null ? '' : String(raw);

    return (
        <Base when={when} content={content} clearPath={name} onUpdate={onUpdate}>
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
