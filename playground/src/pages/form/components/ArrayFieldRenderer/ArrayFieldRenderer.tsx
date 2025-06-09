import * as React from 'react';
import {Button, DropdownMenu, Text} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import {ArrayObjectInput, ConfigInput} from '../../../../../../src/editor-v2';
import {ConfigRow} from '../ConfigRow/ConfigRow';
import {AddPropertyButton} from '../AddPropertyButton/AddPropertyButton';
import {SectionHeader} from '../SectionHeader/SectionHeader';
import {useFormContext} from '../../hooks/FormContext';
import {FormArrayField, InputTypeMenuItem} from '../../hooks/types';

import './ArrayFieldRenderer.scss';

const b = block('array-field-renderer');

interface ArrayFieldRendererProps {
    field: FormArrayField;
    fieldName: string;
    inputTypeMenuItems: InputTypeMenuItem[];
    renderNestedField: (
        field: ConfigInput,
        index: number,
        parentId: string,
        optionIndex?: number,
    ) => React.ReactNode;
}

export const ArrayFieldRenderer: React.FC<ArrayFieldRendererProps> = ({
    field,
    fieldName: _fieldName,
    inputTypeMenuItems,
    renderNestedField,
}) => {
    const {addObjectProperty, updateField} = useFormContext();

    return (
        <div className={b('config')}>
            {/* Array Type Selection */}
            <div className={b('config-row')}>
                <Text variant="body-2">Array Type:</Text>
                <DropdownMenu
                    items={[
                        {
                            action: () => updateField(field.id, {arrayType: 'text'}),
                            text: 'Text',
                        },
                        {
                            action: () => updateField(field.id, {arrayType: 'object'}),
                            text: 'Object',
                        },
                    ]}
                    renderSwitcher={(props) => (
                        <Button {...props} view="normal" size="s">
                            {field.arrayType === 'object' ? 'Object' : 'Text'}
                        </Button>
                    )}
                />
            </div>

            {/* Button Text Configuration */}
            <ConfigRow
                label="Button Text"
                value={field.buttonText}
                onUpdate={(value) => updateField(field.id, {buttonText: value})}
            />

            {/* Properties for Object Array Type */}
            {field.arrayType === 'object' && (
                <div className={b('nested-fields')}>
                    <SectionHeader title="Properties:" />

                    {(field as ArrayObjectInput)?.properties?.map((property, index) =>
                        renderNestedField(property, index, field.id),
                    )}

                    <AddPropertyButton
                        inputTypeMenuItems={inputTypeMenuItems}
                        onAdd={(type) => addObjectProperty(field.id, type)}
                    />
                </div>
            )}
        </div>
    );
};
