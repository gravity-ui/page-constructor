import {Switch as SwitchUIKIT} from '@gravity-ui/uikit';

import {CommonProps, SwitchField} from '../../types';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';

type SwitchProps = SwitchField & CommonProps;

const Switch = ({title, when, name, content, onUpdate}: SwitchProps) => {
    return (
        <Base content={content} when={when} onUpdate={onUpdate}>
            <BaseInput title={title}>
                <SwitchUIKIT name={name} />
            </BaseInput>
        </Base>
    );
};

export default Switch;
