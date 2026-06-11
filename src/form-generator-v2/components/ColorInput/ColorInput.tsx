import {Xmark} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';
import {unstable_ColorPicker as ColorPicker} from '@gravity-ui/uikit/unstable';

import {ClassNameProps} from '../../../models/common';
import {ColorField, CommonProps} from '../../types';
import {getValueByPath} from '../../utils/fields';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';

type ColorInputProps = ClassNameProps & CommonProps & ColorField;

const ColorInput = ({
    title,
    name,
    when,
    content,
    onUpdate,
    className,
    defaultValue,
}: ColorInputProps) => {
    const storedValue = getValueByPath(content, name);
    const value = (storedValue ?? defaultValue ?? '') as string;

    return (
        <Base
            when={when}
            content={content}
            name={name}
            onUpdate={onUpdate}
            defaultValue={defaultValue}
        >
            <BaseInput title={title} className={className}>
                <ColorPicker
                    onUpdate={(v: string) => onUpdate(name, v)}
                    value={value}
                    size="s"
                    withAlpha
                />
                {storedValue ? (
                    <Button
                        view="flat"
                        size="s"
                        onClick={() => onUpdate(name, undefined, {unset: true})}
                    >
                        <Icon data={Xmark} width={16} height={16} />
                    </Button>
                ) : null}
            </BaseInput>
        </Base>
    );
};

export default ColorInput;
