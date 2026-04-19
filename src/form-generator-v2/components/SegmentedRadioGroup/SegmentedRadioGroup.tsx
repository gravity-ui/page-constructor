import {SegmentedRadioGroup as SegmentedRadioGroupUIKIT} from '@gravity-ui/uikit';

import {CommonProps, SegmentedRadioGroupField} from '../../types';
import {getValueByPath} from '../../utils/fields';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';

type SegmentedRadioGroupProps = CommonProps & SegmentedRadioGroupField;

const SegmentedRadioGroup = ({
    title,
    name,
    options,
    when,
    content,
    onUpdate,
    defaultValue,
}: SegmentedRadioGroupProps) => {
    const selected = content ? getValueByPath(content, name) : undefined;

    const value = selected ?? defaultValue ?? null;

    return (
        <Base when={when} content={content} name={name} onUpdate={onUpdate} defaultValue={defaultValue}>
            <BaseInput title={title}>
                <SegmentedRadioGroupUIKIT
                    name={name}
                    options={options}
                    onUpdate={(v) => onUpdate(name, v)}
                    value={value}
                />
            </BaseInput>
        </Base>
    );
};

export default SegmentedRadioGroup;
