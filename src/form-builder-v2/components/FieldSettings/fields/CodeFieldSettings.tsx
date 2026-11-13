import * as React from 'react';

import {Select, TextArea} from '@gravity-ui/uikit';

import type {BuilderLeafField, FieldUpdate} from '../../../types';

import {Row} from './Row';

interface CodeFieldSettingsProps {
    field: BuilderLeafField & {type: 'codeInput'};
    updateField: (id: string, updates: FieldUpdate) => void;
    commonRows: React.ReactNode;
    whenEditorSection: React.ReactNode;
}

const LANGUAGE_OPTIONS = [
    {value: 'yaml', content: 'YAML'},
    {value: 'json', content: 'JSON'},
];

export const CodeFieldSettings = ({
    field,
    updateField,
    commonRows,
    whenEditorSection,
}: CodeFieldSettingsProps) => (
    <React.Fragment>
        {commonRows}
        <Row label="Language">
            <Select
                size="m"
                value={[field.language ?? 'yaml']}
                options={LANGUAGE_OPTIONS}
                onUpdate={(next) =>
                    updateField(field.id, {
                        language: next[0] === 'json' ? 'json' : 'yaml',
                    })
                }
            />
        </Row>
        <Row label="Default">
            <TextArea
                value={field.defaultValue ?? ''}
                onUpdate={(value) => updateField(field.id, {defaultValue: value || undefined})}
                minRows={3}
                placeholder="Default value"
            />
        </Row>
        {whenEditorSection}
    </React.Fragment>
);
