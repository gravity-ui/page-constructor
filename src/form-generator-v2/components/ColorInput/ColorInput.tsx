import {unstable_ColorPicker as ColorPicker} from '@gravity-ui/uikit';

import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';

const ColorInput = ({title, name, when, content, onUpdate}) => (
    <Base when={when} content={content} name={name} onUpdate={onUpdate}>
        <BaseInput title={title}>
            <ColorPicker name={name} onUpdate={(value) => onUpdate(name, value)} />
        </BaseInput>
    </Base>
);

export default ColorInput;
