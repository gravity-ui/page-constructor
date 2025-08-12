import * as React from 'react';
import {formGeneratorCn} from '../../utils/cn';
import {Button} from '@gravity-ui/uikit';
import {ConfigInput} from '../../../editor-v2';
import {AddPropertyButton} from '../AddPropertyButton/AddPropertyButton';
import {OptionHeader} from '../OptionHeader/OptionHeader';
import {SectionHeader} from '../SectionHeader/SectionHeader';
import {useFormContext} from '../../hooks/FormContext';
import {FormOptionsField, InputTypeMenuItem} from '../../hooks/types';

import './OptionsRenderer.scss';

const b = formGeneratorCn('options-renderer');

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

    return (
        <div className={b('nested-fields')}>
            <div className={b('header')}>
                <SectionHeader title="Options:" />
                <Button
                    view="normal"
                    size="s"
                    onClick={() => {
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
                                addOptionProperty(field.id, optionIndex, type);
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
