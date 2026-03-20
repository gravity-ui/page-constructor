import {TextArea as TextAreaUIKIT} from '@gravity-ui/uikit';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';
import {getValueByPath} from '../../utils/fields';

const TextArea = ({when, title, content, name, onUpdate}) => {
    const raw = getValueByPath(content, name);
    const value = raw == null ? '' : String(raw);

    return (
        <Base when={when} content={content} clearPath={name} onUpdate={onUpdate}>
            <BaseInput title={title}>
                <TextAreaUIKIT value={value} name={name} onUpdate={(v) => onUpdate(name, v)} />
            </BaseInput>
        </Base>
    );
};

export default TextArea;
