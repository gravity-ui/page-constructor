import {unstable_ColorPicker as ColorPicker} from '@gravity-ui/uikit/unstable';

import {ColorField, CommonProps} from '../../types';
import {getValueByPath} from '../../utils/fields';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';

type ColorInputProps = CommonProps & ColorField;

const ColorInput = ({title, name, when, content, onUpdate}: ColorInputProps) => {
    const value = getValueByPath(content, name) || undefined;

    return (
        <Base when={when} content={content} name={name} onUpdate={onUpdate}>
            <BaseInput title={title}>
                <ColorPicker onUpdate={(v) => onUpdate(name, v)} value={value} />
            </BaseInput>
        </Base>
    );
};

export default ColorInput;
