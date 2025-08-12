'use client';

import * as React from 'react';
import {Button, DropdownMenu} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import {FieldCard} from '../FieldCard/FieldCard';
import {useFormContext} from '../../hooks/FormContext';
import {FormField, InputTypeMenuItem} from '../../hooks/types';

import './FormBuilder.scss';

const b = block('form-builder');

interface FormBuilderProps {
    className?: string;
    formFields: Array<FormField>;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({className, formFields}) => {
    const {addField} = useFormContext();

    const inputTypeMenuItems: InputTypeMenuItem[] = [
        {
            type: 'text',
            action: () => addField('text'),
            text: 'Text Input',
        },
        {
            type: 'number',
            action: () => addField('number'),
            text: 'Number Input',
        },
        {
            type: 'boolean',
            action: () => addField('boolean'),
            text: 'Boolean Input',
        },
        {
            type: 'textarea',
            action: () => addField('textarea'),
            text: 'Textarea Input',
        },
        {
            type: 'select',
            action: () => addField('select'),
            text: 'Select Input',
        },
        {
            type: 'object',
            action: () => addField('object'),
            text: 'Object Input',
        },
        {
            type: 'array',
            action: () => addField('array'),
            text: 'Array Input',
        },
        {
            type: 'oneOf',
            action: () => addField('oneOf'),
            text: 'OneOf Input',
        },
        {
            type: 'anyOf',
            action: () => addField('anyOf'),
            text: 'AnyOf Input',
        },
    ];

    return (
        <div className={b(null, className)}>
            <div className={b('fields-list')}>
                {formFields.map((field) => (
                    <FieldCard
                        key={field.id}
                        field={field}
                        inputTypeMenuItems={inputTypeMenuItems}
                    />
                ))}
            </div>

            <div className={b('field')}>
                <DropdownMenu
                    items={inputTypeMenuItems}
                    renderSwitcher={(props) => (
                        <Button {...props} view="action" size="l">
                            + Add Field
                        </Button>
                    )}
                />
            </div>
        </div>
    );
};
