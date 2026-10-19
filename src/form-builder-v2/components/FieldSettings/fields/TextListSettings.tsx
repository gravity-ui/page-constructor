import * as React from 'react';

import {TextInput} from '@gravity-ui/uikit';

import TextListInput from '../../../../form-generator-v2/components/TextListInput/TextListInput';
import type {TextListField} from '../../../../form-generator-v2/types';
import type {FieldUpdate} from '../../../types';

import {Row} from './Row';

export const TextListSettings = ({
    field,
    updateField,
    commonRows,
    whenEditorSection,
}: {
    field: TextListField & {id: string};
    updateField: (id: string, updates: FieldUpdate) => void;
    commonRows: React.ReactNode;
    whenEditorSection: React.ReactNode;
}) => (
    <React.Fragment>
        {commonRows}
        <TextListInput
            type="textListInput"
            name="defaults"
            title="Default values"
            content={{defaults: field.defaultValue ?? []}}
            onUpdate={(_, value) => updateField(field.id, {defaultValue: value as string[]})}
        />
        <Row label="Add button text">
            <TextInput
                value={field.addButtonText ?? ''}
                placeholder="Add item"
                onUpdate={(value) => updateField(field.id, {addButtonText: value || undefined})}
            />
        </Row>
        <Row label="Placeholder">
            <TextInput
                value={field.placeholder ?? ''}
                onUpdate={(value) => updateField(field.id, {placeholder: value})}
            />
        </Row>
        {whenEditorSection}
    </React.Fragment>
);
