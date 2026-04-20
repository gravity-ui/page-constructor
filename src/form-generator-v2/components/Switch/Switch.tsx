import {Switch as SwitchUIKIT} from '@gravity-ui/uikit';

import {CommonProps, SwitchField} from '../../types';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';
import {ClassNameProps} from '../../../models/common';
import {getValueByPath} from '../../utils/fields';

type SwitchProps = ClassNameProps & SwitchField & CommonProps;

const Switch = ({title, when, name, content, onUpdate, className, defaultValue}: SwitchProps) => {
    const value = getValueByPath(content, name) ?? defaultValue ?? false;

    return (
        <Base content={content} when={when} onUpdate={onUpdate}>
            <BaseInput title={title} className={className}>
                <SwitchUIKIT name={name} onUpdate={(v) => onUpdate(name, v)} checked={value} />
            </BaseInput>
        </Base>
    );
};

export default Switch;
