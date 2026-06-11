'use client';

import * as React from 'react';

import {FormBuilderBody} from './components/FormBuilderBody/FormBuilderBody';
import {FormProvider} from './hooks/FormContext';
import {FormBuilderProps} from './types';

export const FormBuilder: React.FC<FormBuilderProps> = ({formFields, className, onChange}) => {
    return (
        <FormProvider formFields={formFields} onChange={onChange}>
            <FormBuilderBody className={className} />
        </FormProvider>
    );
};
