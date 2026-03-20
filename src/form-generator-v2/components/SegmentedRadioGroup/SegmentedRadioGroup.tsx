import * as React from 'react';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';
import {SegmentedRadioGroup as SegmentedRadioGroupUIKIT} from '@gravity-ui/uikit';
import {getValueByPath} from '../../utils/fields';
import {CommonProps, SegmentedRadioGroupField} from '../../types';

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

    React.useEffect(() => {
        if (!defaultValue) {
            return;
        }

        if (selected) {
            return;
        }

        onUpdate(name, defaultValue);
    }, [defaultValue, name, onUpdate, selected]);

    const value = selected || defaultValue || null;

    return (
        <Base when={when} content={content} name={name} onUpdate={onUpdate}>
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
