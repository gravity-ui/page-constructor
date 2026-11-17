import * as React from 'react';

import {TextArea, TextInput} from '@gravity-ui/uikit';

import type {BuilderLeafField, FieldUpdate} from '../../../types';

import {Row} from './Row';

interface TextFieldSettingsProps {
    field: BuilderLeafField & {type: 'textInput' | 'textArea' | 'markdownEditor'};
    updateField: (id: string, updates: FieldUpdate) => void;
    commonRows: React.ReactNode;
    whenEditorSection: React.ReactNode;
}

export const TextFieldSettings = ({
    field,
    updateField,
    commonRows,
    whenEditorSection,
}: TextFieldSettingsProps) => (
    <React.Fragment>
        {commonRows}
        <Row label="Default">
            {field.type === 'markdownEditor' ? (
                <TextArea
                    value={field.defaultValue ?? ''}
                    onUpdate={(value) => updateField(field.id, {defaultValue: value})}
                    placeholder="Default Markdown value"
                    minRows={4}
                />
            ) : (
                <TextInput
                    value={field.defaultValue ?? ''}
                    onUpdate={(value) => updateField(field.id, {defaultValue: value || undefined})}
                    placeholder="Default value"
                />
            )}
        </Row>
        {field.type === 'markdownEditor' && (
            <Row label="Placeholder">
                <TextInput
                    value={field.placeholder ?? ''}
                    onUpdate={(value) => updateField(field.id, {placeholder: value || undefined})}
                    placeholder="Hint shown when empty"
                />
            </Row>
        )}
        {whenEditorSection}
    </React.Fragment>
);
