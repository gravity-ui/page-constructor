import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';
import {TextInput as TextInputUIKIT} from '@gravity-ui/uikit';
import {getValueByPath} from '../../utils/fields';

const TextInput = ({title, name, when, content, onUpdate}) => {
    return (
        <Base when={when} content={content}>
            <BaseInput title={title}>
                <TextInputUIKIT
                    name={name}
                    onUpdate={(value) => onUpdate(name, value)}
                    value={getValueByPath(content, name)}
                />
            </BaseInput>
        </Base>
    );
};

export default TextInput;
