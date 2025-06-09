import * as React from 'react';
import block from 'bem-cn-lite';
import {Button} from '@gravity-ui/uikit';
import {ConfigInput} from '../../../../../../src/editor-v2';
import {AddPropertyButton} from '../AddPropertyButton/AddPropertyButton';
import {OptionHeader} from '../OptionHeader/OptionHeader';
import {SectionHeader} from '../SectionHeader/SectionHeader';
import {useFormContext} from '../../hooks/FormContext';
import {FormOptionsField, InputTypeMenuItem} from '../../hooks/types';

import './OptionsRenderer.scss';

const b = block('options-renderer');

interface OptionsRendererProps {
    field: FormOptionsField;
    fieldName: string;
    inputTypeMenuItems: InputTypeMenuItem[];
    renderNestedField: (
        field: ConfigInput,
        index: number,
        parentId: string,
        optionIndex?: number,
    ) => React.ReactNode;
}

export const OptionsRenderer: React.FC<OptionsRendererProps> = ({
    field,
    fieldName: _fieldName,
    inputTypeMenuItems,
    renderNestedField,
}) => {
    const {addOptionProperty, addOption, removeOption} = useFormContext();

    // Отладочный вывод для проверки поля
    console.log('OptionsRenderer rendering field:', field);
    console.log('OptionsRenderer options:', field.options);

    return (
        <div className={b('nested-fields')}>
            <div className={b('header')}>
                <SectionHeader title="Options:" />
                <Button
                    view="normal"
                    size="s"
                    onClick={() => {
                        console.log('Add Option button clicked for field ID:', field.id);
                        addOption(field.id);
                    }}
                    className={b('add-option-button')}
                >
                    + Add Option
                </Button>
            </div>

            {field.options.map((option, optionIndex) => (
                <div key={`option_${optionIndex}`} className={b('option')}>
                    <div className={b('option-header')}>
                        <OptionHeader title={option.title} />
                        {field.options.length > 1 && (
                            <Button
                                view="normal"
                                size="xs"
                                onClick={() => {
                                    console.log(
                                        'Remove Option button clicked for field ID:',
                                        field.id,
                                        'optionIndex:',
                                        optionIndex,
                                    );
                                    removeOption(field.id, optionIndex);
                                }}
                                className={b('remove-option-button')}
                            >
                                Remove
                            </Button>
                        )}
                    </div>

                    <div className={b('nested-fields')}>
                        <SectionHeader title="Properties:" variant="body-2" />

                        {option.properties.map((property, propIndex) =>
                            renderNestedField(property, propIndex, field.id, optionIndex),
                        )}

                        <AddPropertyButton
                            inputTypeMenuItems={inputTypeMenuItems}
                            onAdd={(type) => {
                                console.log('AddPropertyButton onAdd called with:', {
                                    fieldId: field.id,
                                    optionIndex,
                                    isOneOf: field.type === 'oneOf',
                                    type,
                                    currentProperties: option.properties,
                                });
                                addOptionProperty(
                                    field.id,
                                    optionIndex,
                                    field.type === 'oneOf',
                                    type,
                                );
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
