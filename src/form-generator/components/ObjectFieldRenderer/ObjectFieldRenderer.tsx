import * as React from 'react';
import block from 'bem-cn-lite';
import {ConfigInput} from '../../../editor-v2';
import {AddPropertyButton} from '../AddPropertyButton/AddPropertyButton';
import {SectionHeader} from '../SectionHeader/SectionHeader';
import {useFormContext} from '../../hooks/FormContext';
import {FormObjectField, InputTypeMenuItem} from '../../hooks/types';

import './ObjectFieldRenderer.scss';

const b = block('object-field-renderer');

interface ObjectFieldRendererProps {
    field: FormObjectField;
    fieldName: string;
    inputTypeMenuItems: InputTypeMenuItem[];
    renderNestedField: (
        field: ConfigInput,
        index: number,
        parentId: string,
        optionIndex?: number,
    ) => React.ReactNode;
}

export const ObjectFieldRenderer: React.FC<ObjectFieldRendererProps> = ({
    field,
    fieldName: _fieldName,
    inputTypeMenuItems,
    renderNestedField,
}) => {
    const {addObjectProperty} = useFormContext();

    return (
        <div className={b('nested-fields')}>
            <SectionHeader title="Properties:" />

            {field.properties.map((property, index) =>
                renderNestedField(property, index, field.id),
            )}

            <AddPropertyButton
                inputTypeMenuItems={inputTypeMenuItems}
                onAdd={(type) => addObjectProperty(field.id, type)}
            />
        </div>
    );
};
