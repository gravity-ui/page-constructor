import * as React from 'react';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';
import {SegmentedRadioGroup as SegmentedRadioGroupUIKIT} from '@gravity-ui/uikit';
import {getValueByPath} from '../../utils/fields';

type SegmentedRadioGroupProps = {
    title: string;
    name: string;
    options: {value: string; content?: string}[];
    when?: unknown;
    content?: unknown;
    onUpdate: (name: string, value: unknown) => void;
    /** Пишется в `content` при первом рендере, если значения ещё нет; при Clear all fields секции — см. `collectSectionClearTargets`. */
    defaultValue?: unknown;
};

const SegmentedRadioGroup = ({
    title,
    name,
    options,
    when,
    content,
    onUpdate,
    defaultValue,
}: SegmentedRadioGroupProps) => {
    const selected = getValueByPath(content, name);

    React.useEffect(() => {
        if (defaultValue === undefined) {
            return;
        }
        if (selected !== undefined && selected !== null) {
            return;
        }
        onUpdate(name, defaultValue);
    }, [defaultValue, name, onUpdate, selected]);

    const value =
        selected !== undefined && selected !== null
            ? selected
            : defaultValue !== undefined
              ? defaultValue
              : null;

    return (
        <Base when={when} content={content}>
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
