import * as React from 'react';

import {TextInput} from '@gravity-ui/uikit';

import type {When} from '../../../form-generator-v2/types';
import {useFormContext} from '../../hooks/FormContext';
import {collectNames} from '../../hooks/useFormFields';
import {FormField} from '../../types';
import {WhenEditor} from '../WhenEditor/WhenEditor';

import {ColorInputSettings} from './fields/ColorInputSettings';
import {OptionsSettings} from './fields/OptionsSettings';
import {Row} from './fields/Row';
import {SectionSettings} from './fields/SectionSettings';
import {SwitchSettings} from './fields/SwitchSettings';
import {TextFieldSettings} from './fields/TextFieldSettings';
import {TextSettings} from './fields/TextSettings';

import './FieldSettings.scss';

interface FieldSettingsProps {
    field: FormField;
}

export const FieldSettings: React.FC<FieldSettingsProps> = ({field}) => {
    const {updateField, formFields} = useFormContext();

    const availableFields = React.useMemo(() => {
        const all = Array.from(collectNames(formFields));
        if (field.type === 'section' || field.type === 'text') return all;
        return all.filter((n) => n !== field.name);
    }, [formFields, field]);

    const whenEditorSection = (
        <Row label="Visible when">
            <WhenEditor
                when={field.when}
                availableFields={availableFields}
                onChange={(next: When | undefined) => updateField(field.id, {when: next})}
            />
        </Row>
    );

    const commonRows = (
        <React.Fragment>
            <Row label="Title">
                <TextInput
                    value={'title' in field ? (field.title ?? '') : ''}
                    onUpdate={(value) => updateField(field.id, {title: value})}
                    placeholder="Label shown above the field"
                />
            </Row>
            <Row label="Name">
                <TextInput
                    value={'name' in field ? (field.name ?? '') : ''}
                    onUpdate={(value) => updateField(field.id, {name: value})}
                    placeholder="Path in content object"
                />
            </Row>
        </React.Fragment>
    );

    if (field.type === 'section') {
        return (
            <SectionSettings
                field={field}
                updateField={updateField}
                whenEditorSection={whenEditorSection}
            />
        );
    }

    if (field.type === 'text') {
        return (
            <TextSettings
                field={field}
                updateField={updateField}
                whenEditorSection={whenEditorSection}
            />
        );
    }

    if (field.type === 'textInput' || field.type === 'textArea') {
        return (
            <TextFieldSettings
                field={field}
                updateField={updateField}
                commonRows={commonRows}
                whenEditorSection={whenEditorSection}
            />
        );
    }

    if (field.type === 'switch') {
        return (
            <SwitchSettings
                field={field}
                updateField={updateField}
                commonRows={commonRows}
                whenEditorSection={whenEditorSection}
            />
        );
    }

    if (field.type === 'colorInput') {
        return (
            <ColorInputSettings
                field={field}
                updateField={updateField}
                commonRows={commonRows}
                whenEditorSection={whenEditorSection}
            />
        );
    }

    if (field.type === 'select' || field.type === 'segmentedRadioGroup') {
        return (
            <OptionsSettings
                field={field}
                updateField={updateField}
                commonRows={commonRows}
                whenEditorSection={whenEditorSection}
            />
        );
    }

    return null;
};
