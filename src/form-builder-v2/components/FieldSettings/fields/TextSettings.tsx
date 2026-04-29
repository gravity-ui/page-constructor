import * as React from 'react';

import {Select, TextArea} from '@gravity-ui/uikit';

import type {TextColor} from '../../../../form-generator-v2/types';
import type {BuilderLeafField, FieldUpdate} from '../../../types';

import {Row} from './Row';

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

interface TextSettingsProps {
    field: BuilderLeafField & {type: 'text'};
    updateField: (id: string, updates: FieldUpdate) => void;
    whenEditorSection: React.ReactNode;
}

export const TextSettings: React.FC<TextSettingsProps> = ({
    field,
    updateField,
    whenEditorSection,
}) => {
    const handleLevelUpdate = (next: string[]) => {
        const value = next[0];
        updateField(field.id, {
            level: (value || undefined) as 'info' | 'danger' | undefined,
        });
    };

    const handleColorUpdate = (next: string[]) => {
        const value = next[0];
        updateField(field.id, {
            color: (value || undefined) as TextColor | undefined,
        });
    };

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
                    onUpdate={handleLevelUpdate}
                />
            </Row>
            <Row label="Color">
                <Select
                    size="m"
                    value={[field.color ?? '']}
                    options={TEXT_COLOR_OPTIONS}
                    onUpdate={handleColorUpdate}
                />
            </Row>
            {whenEditorSection}
        </React.Fragment>
    );
};
