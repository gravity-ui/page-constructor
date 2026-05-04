import * as React from 'react';

import {Switch} from '@gravity-ui/uikit';

import type {BuilderLeafField, FieldUpdate} from '../../../types';

import {Row} from './Row';

interface SwitchSettingsProps {
    field: BuilderLeafField & {type: 'switch'};
    updateField: (id: string, updates: FieldUpdate) => void;
    commonRows: React.ReactNode;
    whenEditorSection: React.ReactNode;
}

export const SwitchSettings = ({
    field,
    updateField,
    commonRows,
    whenEditorSection,
}: SwitchSettingsProps) => (
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
