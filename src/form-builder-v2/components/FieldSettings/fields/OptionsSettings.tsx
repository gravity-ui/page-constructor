import * as React from 'react';

import {TrashBin} from '@gravity-ui/icons';
import {Button, Checkbox, Icon, Select, TextInput} from '@gravity-ui/uikit';

import type {BuilderLeafField, FieldUpdate} from '../../../types';
import {formBuilderV2Cn} from '../../../utils/cn';

import {Row} from './Row';

const b = formBuilderV2Cn('field-settings');

interface OptionsSettingsProps {
    field: BuilderLeafField & {type: 'select' | 'segmentedRadioGroup'};
    updateField: (id: string, updates: FieldUpdate) => void;
    commonRows: React.ReactNode;
    whenEditorSection: React.ReactNode;
}

export const OptionsSettings = ({
    field,
    updateField,
    commonRows,
    whenEditorSection,
}: OptionsSettingsProps) => {
    const options = field.options ?? [];

    const updateOption = (index: number, key: 'value' | 'content', value: string) => {
        const next = options.map((opt, i) => (i === index ? {...opt, [key]: value} : opt));
        updateField(field.id, {options: next});
    };

    const removeOption = (index: number) => {
        const next = options.filter((_, i) => i !== index);
        updateField(field.id, {options: next});
    };

    const addOption = () => {
        const nextIndex = options.length + 1;
        updateField(field.id, {
            options: [...options, {value: `option${nextIndex}`, content: `Option ${nextIndex}`}],
        });
    };

    const defaultValueOptions = [
        {value: '', content: '— none —'},
        ...options.map((o) => ({value: o.value, content: o.content ?? o.value})),
    ];

    return (
        <React.Fragment>
            {commonRows}
            <Row label="Default">
                <Select
                    size="m"
                    value={[field.defaultValue ?? '']}
                    options={defaultValueOptions}
                    onUpdate={(next) => {
                        const value = next[0];
                        updateField(field.id, {defaultValue: value || undefined});
                    }}
                />
            </Row>
            {field.type === 'select' && (
                <Row label="Has clear">
                    <Checkbox
                        checked={Boolean(field.hasClear)}
                        onUpdate={(value) => updateField(field.id, {hasClear: value})}
                    >
                        Allow clearing the selection
                    </Checkbox>
                </Row>
            )}
            <Row label="Options">
                <div className={b('options')}>
                    {options.map((opt, index) => (
                        <div key={index} className={b('option-row')}>
                            <TextInput
                                size="s"
                                value={opt.value}
                                onUpdate={(value) => updateOption(index, 'value', value)}
                                placeholder="value"
                            />
                            <TextInput
                                size="s"
                                value={opt.content ?? ''}
                                onUpdate={(value) => updateOption(index, 'content', value)}
                                placeholder="label"
                            />
                            <Button
                                size="s"
                                view="flat-danger"
                                disabled={options.length <= 1}
                                onClick={() => removeOption(index)}
                                title="Remove option"
                            >
                                <Icon data={TrashBin} size={12} />
                            </Button>
                        </div>
                    ))}
                    <Button className={b('add-option')} size="s" view="normal" onClick={addOption}>
                        + Add option
                    </Button>
                </div>
            </Row>
            {whenEditorSection}
        </React.Fragment>
    );
};
