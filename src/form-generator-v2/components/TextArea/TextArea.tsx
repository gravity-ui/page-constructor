import {TextArea as TextAreaUIKIT} from '@gravity-ui/uikit';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';
import {getValueByPath} from '../../utils/fields';
import {CommonProps, TextField} from '../../types';

type TextAreaProps = CommonProps & TextField;

const TextArea = ({when, title, content, name, onUpdate}: TextAreaProps) => {
    const value = getValueByPath(content, name) || '';

    return (
        <Base when={when} content={content} name={name} onUpdate={onUpdate}>
            <BaseInput title={title}>
                <TextAreaUIKIT value={value} name={name} onUpdate={(v) => onUpdate(name, v)} />
            </BaseInput>
        </Base>
    );
};

export default TextArea;
