import * as React from 'react';
import {Button, DropdownMenu, Text, TextInput} from '@gravity-ui/uikit';
import {formBuilderCn} from '../../utils/cn';
import {FormField} from '../../types';
import {useFormContext} from '../../hooks/FormContext';

import './SelectFieldRenderer.scss';

const b = formBuilderCn('select-field-renderer');

interface SelectFieldRendererProps {
    field: FormField;
}

interface SelectFieldOption {
    content: string;
    value: string;
}

export const SelectFieldRenderer: React.FC<SelectFieldRendererProps> = ({field}) => {
    const {updateField} = useFormContext();

    if (field.type !== 'select') {
        return null;
    }

    const view = field.view as 'select' | 'radiobutton';
    const mode = field.mode as 'single' | 'multiple';
    const enumValues = (field.enum || []) as SelectFieldOption[];

    return (
        <React.Fragment>
            <div className={b('config-row')}>
                <Text variant="body-2">View:</Text>
                <DropdownMenu
                    items={[
                        {
                            action: () => updateField(field.id, {view: 'select'}),
                            text: 'Select',
                        },
                        {
                            action: () => updateField(field.id, {view: 'radiobutton'}),
                            text: 'Radio Button',
                        },
                    ]}
                    renderSwitcher={(props) => (
                        <Button {...props} view="normal" size="s">
                            {view === 'radiobutton' ? 'Radio Button' : 'Select'}
                        </Button>
                    )}
                />
            </div>

            <div className={b('config-row')}>
                <Text variant="body-2">Mode:</Text>
                <DropdownMenu
                    items={[
                        {
                            action: () => updateField(field.id, {mode: 'single'}),
                            text: 'Single',
                        },
                        {
                            action: () => updateField(field.id, {mode: 'multiple'}),
                            text: 'Multiple',
                        },
                    ]}
                    renderSwitcher={(props) => (
                        <Button {...props} view="normal" size="s">
                            {mode === 'multiple' ? 'Multiple' : 'Single'}
                        </Button>
                    )}
                />
            </div>

            <div className={b('config-row', {vertical: true})}>
                <Text variant="body-2" className={b('options-title')}>
                    Options:
                </Text>
                {enumValues.map((option, index) => (
                    <div key={`enum_${index}`} className={b('enum-option')}>
                        <div className={b('config-row')}>
                            <Text variant="body-2">Label:</Text>
                            <TextInput
                                value={option.content}
                                onUpdate={(value) => {
                                    const newEnum = [...enumValues];
                                    newEnum[index] = {
                                        ...newEnum[index],
                                        content: value,
                                    };
                                    updateField(field.id, {enum: newEnum});
                                }}
                                size="s"
                            />
                        </div>
                        <div className={b('config-row')}>
                            <Text variant="body-2">Value:</Text>
                            <TextInput
                                value={option.value}
                                onUpdate={(value) => {
                                    const newEnum = [...enumValues];
                                    newEnum[index] = {
                                        ...newEnum[index],
                                        value,
                                    };
                                    updateField(field.id, {enum: newEnum});
                                }}
                                size="s"
                            />
                        </div>
                        <Button
                            view="flat-danger"
                            size="xs"
                            onClick={() => {
                                const newEnum = [...enumValues];
                                newEnum.splice(index, 1);
                                updateField(field.id, {enum: newEnum});
                            }}
                            className={b('remove-button')}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                <Button
                    view="normal"
                    size="s"
                    onClick={() => {
                        const newEnum = [...(enumValues || [])];
                        newEnum.push({
                            content: `Option ${newEnum.length + 1}`,
                            value: `option${newEnum.length + 1}`,
                        });
                        updateField(field.id, {enum: newEnum});
                    }}
                    className={b('add-button')}
                >
                    + Add Option
                </Button>
            </div>
        </React.Fragment>
    );
};
