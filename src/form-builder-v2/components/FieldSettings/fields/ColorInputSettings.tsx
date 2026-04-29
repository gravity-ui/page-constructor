import * as React from 'react';

import {TextInput} from '@gravity-ui/uikit';

import type {BuilderLeafField, FieldUpdate} from '../../../types';

import {Row} from './Row';

interface ColorInputSettingsProps {
    field: BuilderLeafField & {type: 'colorInput'};
    updateField: (id: string, updates: FieldUpdate) => void;
    commonRows: React.ReactNode;
    whenEditorSection: React.ReactNode;
}

export const ColorInputSettings: React.FC<ColorInputSettingsProps> = ({
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
                placeholder="#000000"
            />
        </Row>
        {whenEditorSection}
    </React.Fragment>
);
