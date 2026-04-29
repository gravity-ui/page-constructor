import * as React from 'react';

import {TextInput} from '@gravity-ui/uikit';

import type {BuilderLeafField, FieldUpdate} from '../../../types';

import {Row} from './Row';

interface TextFieldSettingsProps {
    field: BuilderLeafField & {type: 'textInput' | 'textArea'};
    updateField: (id: string, updates: FieldUpdate) => void;
    commonRows: React.ReactNode;
    whenEditorSection: React.ReactNode;
}

export const TextFieldSettings: React.FC<TextFieldSettingsProps> = ({
    field,
    updateField,
    commonRows,
    whenEditorSection,
}) => (
    <React.Fragment>
        {commonRows}
        <Row label="Default">
            <TextInput
                value={field.defaultValue ?? ''}
                onUpdate={(value) => updateField(field.id, {defaultValue: value || undefined})}
                placeholder="Default value"
            />
        </Row>
        {whenEditorSection}
    </React.Fragment>
);
