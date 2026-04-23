import {TextInput as TextInputUIKIT} from '@gravity-ui/uikit';

import {CommonProps, TextField} from '../../types';
import {getValueByPath} from '../../utils/fields';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';

type TextInputProps = CommonProps & TextField;

const TextInput = ({title, name, when, content, onUpdate, defaultValue}: TextInputProps) => {
    const value = getValueByPath(content, name) ?? defaultValue ?? '';

    return (
        <Base
            when={when}
            content={content}
            name={name}
            onUpdate={onUpdate}
            defaultValue={defaultValue}
        >
            <BaseInput title={title}>
                <TextInputUIKIT name={name} onUpdate={(v) => onUpdate(name, v)} value={value} />
            </BaseInput>
        </Base>
    );
};

export default TextInput;
