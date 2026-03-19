import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';
import {TextInput as TextInputUIKIT} from '@gravity-ui/uikit';

const TextInput = ({title, name, when, content, onUpdate}) => {
    return (
        <Base when={when} content={content}>
            <BaseInput title={title}>
                <TextInputUIKIT name={name} onUpdate={(value) => onUpdate(name, value)} />
            </BaseInput>
        </Base>
    );
};

export default TextInput;
