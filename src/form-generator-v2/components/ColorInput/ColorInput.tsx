import {unstable_ColorPicker as ColorPicker} from '@gravity-ui/uikit/unstable';

import {ColorField, CommonProps} from '../../types';
import {getValueByPath} from '../../utils/fields';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';
import {ClassNameProps} from '../../../models/common';

type ColorInputProps = ClassNameProps & CommonProps & ColorField;

const COLOR_PICKER_DEFAULT = '#000000';

const ColorInput = ({title, name, when, content, onUpdate, className, defaultValue}: ColorInputProps) => {
    const resolvedDefault = defaultValue ?? COLOR_PICKER_DEFAULT;
    const value = getValueByPath(content, name) || resolvedDefault;

    return (
        <Base when={when} content={content} name={name} onUpdate={onUpdate} defaultValue={resolvedDefault}>
            <BaseInput title={title} className={className}>
                {/* unstable API — size prop type mismatch, cast required */}
                <ColorPicker onUpdate={(v: string) => onUpdate(name, v)} value={value as string} size={'xs' as never} />
            </BaseInput>
        </Base>
    );
};

export default ColorInput;
