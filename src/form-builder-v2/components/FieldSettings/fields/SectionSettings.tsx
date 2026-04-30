import * as React from 'react';

import {Checkbox, Select, Switch, Text, TextInput} from '@gravity-ui/uikit';

import type {BuilderSectionField, FieldUpdate} from '../../../types';
import {
    prefixNameForArrayMode,
    stripArrayModePrefix,
    transformChildNames,
} from '../../../utils/fieldNames';

import {Row} from './Row';

interface SectionSettingsProps {
    field: BuilderSectionField;
    updateField: (id: string, updates: FieldUpdate) => void;
    whenEditorSection: React.ReactNode;
}

export const SectionSettings = ({field, updateField, whenEditorSection}: SectionSettingsProps) => {
    const isArray = Boolean(field.index);

    const handleArrayModeToggle = (value: boolean) => {
        if (value) {
            updateField(field.id, {
                index: 'index',
                withAddButton: true,
                itemTitle: 'Item {{index}}',
                itemView: 'card',
                fields: transformChildNames(field.fields, prefixNameForArrayMode),
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
    };

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
                <Switch checked={isArray} onUpdate={handleArrayModeToggle}>
                    Repeating group (array of items)
                </Switch>
            </Row>
            {isArray && (
                <React.Fragment>
                    <Row label="Hint">
                        <Text variant="caption-2" color="hint">
                            Child field names must include <code>{'{{index}}'}</code> so each row
                            gets its own value. New fields get an <code>{'items[{{index}}].'}</code>{' '}
                            prefix automatically.
                        </Text>
                    </Row>
                    <Row label="Index name">
                        <TextInput
                            value={field.index ?? ''}
                            onUpdate={(value) => updateField(field.id, {index: value || 'index'})}
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
};
