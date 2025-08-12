import * as React from 'react';
import {Card} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import {ConfigInput} from '../../../editor-v2';
import {ConfigRow} from '../ConfigRow/ConfigRow';
import {FieldHeader} from '../FieldHeader/FieldHeader';
import {ArrayFieldRenderer} from '../ArrayFieldRenderer/ArrayFieldRenderer';
import {ObjectFieldRenderer} from '../ObjectFieldRenderer/ObjectFieldRenderer';
import {OptionsRenderer} from '../OptionsRenderer/OptionsRenderer';
import {SelectFieldRenderer} from '../SelectFieldRenderer/SelectFieldRenderer';
import {useFormContext} from '../../hooks/FormContext';
import {
    FormAnyOfField,
    FormArrayField,
    FormField,
    FormObjectField,
    FormOneOfField,
    InputTypeMenuItem,
} from '../../hooks/types';

import './FieldCard.scss';

const b = block('field-card');

interface FieldCardProps {
    field: FormField;
    inputTypeMenuItems: InputTypeMenuItem[];
}

export const FieldCard: React.FC<FieldCardProps> = ({field, inputTypeMenuItems}) => {
    const {
        removeField,
        updateField,
        removeObjectProperty,
        removeOptionProperty,
        updateObjectProperty,
        updateOptionProperty,
    } = useFormContext();

    const renderNestedField = (
        nestedField: ConfigInput,
        index: number,
        parentId: string,
        optionIndex?: number,
    ) => {
        const isInOption = optionIndex !== undefined;

        const handleRemove = () => {
            if (isInOption) {
                removeOptionProperty(parentId, optionIndex, index);
            } else {
                removeObjectProperty(parentId, index);
            }
        };

        const handleUpdate = (updates: Partial<ConfigInput>) => {
            if (isInOption) {
                updateOptionProperty(parentId, optionIndex, index, updates);
            } else {
                updateObjectProperty(parentId, index, updates);
            }
        };

        return (
            <div key={`${parentId}_${index}`} className={b('nested-field')}>
                <FieldHeader
                    title={nestedField.type.toUpperCase()}
                    onRemove={handleRemove}
                    variant="subheader-3"
                    buttonSize="xs"
                />

                <div className={b('config')}>
                    <ConfigRow
                        label="Name"
                        value={nestedField.name}
                        onUpdate={(value) => handleUpdate({name: value})}
                    />
                    <ConfigRow
                        label="Title"
                        value={nestedField.title}
                        onUpdate={(value) => handleUpdate({title: value})}
                    />

                    {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
                    {renderFieldTypeSpecificContent(nestedField, parentId)}
                </div>
            </div>
        );
    };

    const renderFieldTypeSpecificContent = (fieldConfig: ConfigInput, parentId: string) => {
        switch (fieldConfig.type) {
            case 'object':
                return (
                    <ObjectFieldRenderer
                        field={fieldConfig as FormObjectField}
                        fieldName={parentId}
                        inputTypeMenuItems={inputTypeMenuItems}
                        renderNestedField={renderNestedField}
                    />
                );

            case 'oneOf':
                return (
                    <OptionsRenderer
                        field={fieldConfig as FormOneOfField}
                        fieldName={parentId}
                        inputTypeMenuItems={inputTypeMenuItems}
                        renderNestedField={renderNestedField}
                    />
                );

            case 'anyOf':
                return (
                    <OptionsRenderer
                        field={fieldConfig as FormAnyOfField}
                        fieldName={parentId}
                        inputTypeMenuItems={inputTypeMenuItems}
                        renderNestedField={renderNestedField}
                    />
                );

            case 'select':
                return <SelectFieldRenderer field={fieldConfig as FormField} />;

            case 'array':
                return (
                    <ArrayFieldRenderer
                        field={fieldConfig as FormArrayField}
                        fieldName={parentId}
                        inputTypeMenuItems={inputTypeMenuItems}
                        renderNestedField={renderNestedField}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <Card key={field.id} className={b()}>
            <FieldHeader title={field.type.toUpperCase()} onRemove={() => removeField(field.id)} />

            <div className={b('config')}>
                <ConfigRow
                    label="Name"
                    value={field.name}
                    onUpdate={(value) => updateField(field.id, {name: value})}
                />
                <ConfigRow
                    label="Title"
                    value={field.title}
                    onUpdate={(value) => updateField(field.id, {title: value})}
                />

                {/* Render type-specific configuration */}
                {renderFieldTypeSpecificContent(field, field.id)}
            </div>
        </Card>
    );
};
