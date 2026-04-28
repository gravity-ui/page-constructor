import * as React from 'react';

import {TrashBin} from '@gravity-ui/icons';
import {Button, Checkbox, Icon, Select, Switch, TextArea, TextInput} from '@gravity-ui/uikit';

import type {TextColor, When} from '../../../form-generator-v2/types';
import {useFormContext} from '../../hooks/FormContext';
import {
    collectNames,
    prefixNameForArrayMode,
    stripArrayModePrefix,
    transformChildNames,
} from '../../hooks/useFormFields';
import {FormField} from '../../types';
import {formBuilderV2Cn} from '../../utils/cn';
import {WhenEditor} from '../WhenEditor/WhenEditor';

import './FieldSettings.scss';

const b = formBuilderV2Cn('field-settings');

const TEXT_COLOR_OPTIONS = [
    {value: '', content: 'Default'},
    {value: 'primary', content: 'Primary'},
    {value: 'secondary', content: 'Secondary'},
    {value: 'hint', content: 'Hint'},
    {value: 'info', content: 'Info'},
    {value: 'positive', content: 'Positive'},
    {value: 'warning', content: 'Warning'},
    {value: 'danger', content: 'Danger'},
    {value: 'utility', content: 'Utility'},
    {value: 'misc', content: 'Misc'},
];

const TEXT_LEVEL_OPTIONS = [
    {value: '', content: 'None'},
    {value: 'info', content: 'Info banner'},
    {value: 'danger', content: 'Danger banner'},
];

interface FieldSettingsProps {
    field: FormField;
}

interface RowProps {
    label: string;
    children: React.ReactNode;
}

const Row: React.FC<RowProps> = ({label, children}) => (
    <div className={b('row')}>
        <span className={b('row-label')}>{label}</span>
        <div>{children}</div>
    </div>
);

export const FieldSettings: React.FC<FieldSettingsProps> = ({field}) => {
    const {updateField, formFields} = useFormContext();

    const availableFields = React.useMemo(() => {
        const all = Array.from(collectNames(formFields));
        if (field.type === 'section' || field.type === 'text') return all;
        return all.filter((n) => n !== field.name);
    }, [formFields, field]);

    const whenEditorSection = (
        <Row label="Visible when">
            <WhenEditor
                when={field.when}
                availableFields={availableFields}
                onChange={(next: When | undefined) => updateField(field.id, {when: next})}
            />
        </Row>
    );

    if (field.type === 'section') {
        const isArray = Boolean(field.index);
        return (
            <React.Fragment>
                <Row label="Title">
                    <TextInput
                        value={field.title ?? ''}
                        onUpdate={(value) => updateField(field.id, {title: value})}
                        placeholder="Section heading"
                    />
                </Row>
                <Row label="Opened">
                    <Switch
                        checked={Boolean(field.opened)}
                        onUpdate={(value) => updateField(field.id, {opened: value})}
                    >
                        Expanded by default
                    </Switch>
                </Row>
                <Row label="Array mode">
                    <Switch
                        checked={isArray}
                        onUpdate={(value) => {
                            if (value) {
                                updateField(field.id, {
                                    index: 'index',
                                    withAddButton: true,
                                    itemTitle: 'Item {{index}}',
                                    itemView: 'card',
                                    fields: transformChildNames(
                                        field.fields,
                                        prefixNameForArrayMode,
                                    ),
                                });
                            } else {
                                updateField(field.id, {
                                    index: undefined,
                                    withAddButton: undefined,
                                    itemTitle: undefined,
                                    itemView: undefined,
                                    fields: transformChildNames(field.fields, stripArrayModePrefix),
                                });
                            }
                        }}
                    >
                        Repeating group (array of items)
                    </Switch>
                </Row>
                {isArray && (
                    <React.Fragment>
                        <Row label="Hint">
                            <span style={{fontSize: 12, color: 'var(--g-color-text-hint)'}}>
                                Child field names must include <code>{'{{index}}'}</code> so each
                                row gets its own value. New fields get an{' '}
                                <code>items[{'{{index}}'}].</code> prefix automatically.
                            </span>
                        </Row>
                        <Row label="Index name">
                            <TextInput
                                value={field.index ?? ''}
                                onUpdate={(value) =>
                                    updateField(field.id, {index: value || 'index'})
                                }
                                placeholder="index"
                            />
                        </Row>
                        <Row label="Item title">
                            <TextInput
                                value={field.itemTitle ?? ''}
                                onUpdate={(value) =>
                                    updateField(field.id, {itemTitle: value || undefined})
                                }
                                placeholder="Item {{index}}"
                            />
                        </Row>
                        <Row label="Item view">
                            <Select
                                size="m"
                                value={[field.itemView ?? 'clear']}
                                options={[
                                    {value: 'clear', content: 'Clear (flat)'},
                                    {value: 'card', content: 'Card (bordered)'},
                                ]}
                                onUpdate={(next) =>
                                    updateField(field.id, {
                                        itemView: next[0] as 'card' | 'clear',
                                    })
                                }
                            />
                        </Row>
                        <Row label="Add button">
                            <Checkbox
                                checked={Boolean(field.withAddButton)}
                                onUpdate={(value) => updateField(field.id, {withAddButton: value})}
                            >
                                Show &ldquo;Add item&rdquo; button
                            </Checkbox>
                        </Row>
                    </React.Fragment>
                )}
                {whenEditorSection}
            </React.Fragment>
        );
    }

    if (field.type === 'text') {
        return (
            <React.Fragment>
                <Row label="Text">
                    <TextArea
                        value={field.text ?? ''}
                        onUpdate={(value) => updateField(field.id, {text: value})}
                        minRows={2}
                        placeholder="Static hint text"
                    />
                </Row>
                <Row label="Banner">
                    <Select
                        size="m"
                        value={[field.level ?? '']}
                        options={TEXT_LEVEL_OPTIONS}
                        onUpdate={(next) => {
                            const value = next[0];
                            updateField(field.id, {
                                level: (value || undefined) as 'info' | 'danger' | undefined,
                            });
                        }}
                    />
                </Row>
                <Row label="Color">
                    <Select
                        size="m"
                        value={[field.color ?? '']}
                        options={TEXT_COLOR_OPTIONS}
                        onUpdate={(next) => {
                            const value = next[0];
                            updateField(field.id, {
                                color: (value || undefined) as TextColor | undefined,
                            });
                        }}
                    />
                </Row>
                {whenEditorSection}
            </React.Fragment>
        );
    }

    const commonRows = (
        <React.Fragment>
            <Row label="Title">
                <TextInput
                    value={field.title ?? ''}
                    onUpdate={(value) => updateField(field.id, {title: value})}
                    placeholder="Label shown above the field"
                />
            </Row>
            <Row label="Name">
                <TextInput
                    value={field.name ?? ''}
                    onUpdate={(value) => updateField(field.id, {name: value})}
                    placeholder="Path in content object"
                />
            </Row>
        </React.Fragment>
    );

    if (field.type === 'textInput' || field.type === 'textArea') {
        return (
            <React.Fragment>
                {commonRows}
                <Row label="Default">
                    <TextInput
                        value={field.defaultValue ?? ''}
                        onUpdate={(value) =>
                            updateField(field.id, {defaultValue: value || undefined})
                        }
                        placeholder="Default value"
                    />
                </Row>
                {whenEditorSection}
            </React.Fragment>
        );
    }

    if (field.type === 'switch') {
        return (
            <React.Fragment>
                {commonRows}
                <Row label="Default">
                    <Switch
                        checked={Boolean(field.defaultValue)}
                        onUpdate={(value) => updateField(field.id, {defaultValue: value})}
                    />
                </Row>
                {whenEditorSection}
            </React.Fragment>
        );
    }

    if (field.type === 'colorInput') {
        return (
            <React.Fragment>
                {commonRows}
                <Row label="Default">
                    <TextInput
                        value={field.defaultValue ?? ''}
                        onUpdate={(value) =>
                            updateField(field.id, {defaultValue: value || undefined})
                        }
                        placeholder="#000000"
                    />
                </Row>
                {whenEditorSection}
            </React.Fragment>
        );
    }

    if (field.type === 'select' || field.type === 'segmentedRadioGroup') {
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
                options: [
                    ...options,
                    {value: `option${nextIndex}`, content: `Option ${nextIndex}`},
                ],
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
                        <Button
                            className={b('add-option')}
                            size="s"
                            view="normal"
                            onClick={addOption}
                        >
                            + Add option
                        </Button>
                    </div>
                </Row>
                {whenEditorSection}
            </React.Fragment>
        );
    }

    return null;
};
