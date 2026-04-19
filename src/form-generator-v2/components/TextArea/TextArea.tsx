import {TextArea as TextAreaUIKIT} from '@gravity-ui/uikit';

import {CommonProps, TextField} from '../../types';
import {getValueByPath} from '../../utils/fields';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';

type TextAreaProps = CommonProps & TextField;

const TextArea = ({when, title, content, name, onUpdate, defaultValue}: TextAreaProps) => {
    const value = getValueByPath(content, name) ?? defaultValue ?? '';

    return (
        <Base when={when} content={content} name={name} onUpdate={onUpdate} defaultValue={defaultValue}>
            <BaseInput title={title}>
                <TextAreaUIKIT
                    value={value}
                    name={name}
                    onUpdate={(v) => onUpdate(name, v)}
                    minRows={3}
                />
            </BaseInput>
        </Base>
    );
};

export default TextArea;
