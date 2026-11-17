import * as React from 'react';

import {TextInput} from '@gravity-ui/uikit';

import {MarkdownEditorInput} from '../../../../components/MarkdownEditorInput/MarkdownEditorInput';
import type {BuilderLeafField, FieldUpdate} from '../../../types';

import {Row} from './Row';

interface MarkdownEditorSettingsProps {
    field: BuilderLeafField & {type: 'markdownEditor'};
    updateField: (id: string, updates: FieldUpdate) => void;
    commonRows: React.ReactNode;
    whenEditorSection: React.ReactNode;
}

export const MarkdownEditorSettings = ({
    field,
    updateField,
    commonRows,
    whenEditorSection,
}: MarkdownEditorSettingsProps) => (
    <React.Fragment>
        {commonRows}
        <Row label="Placeholder">
            <TextInput
                value={field.placeholder ?? ''}
                onUpdate={(value) => updateField(field.id, {placeholder: value || undefined})}
                placeholder="Editor placeholder"
            />
        </Row>
        <Row label="Default" fullWidth>
            <MarkdownEditorInput
                value={field.defaultValue ?? ''}
                onUpdate={(value) => updateField(field.id, {defaultValue: value || undefined})}
                placeholder="Default Markdown value"
            />
        </Row>
        {whenEditorSection}
    </React.Fragment>
);
