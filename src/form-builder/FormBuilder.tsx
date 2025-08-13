'use client';

import * as React from 'react';
import {FormBuilderProps} from './types';
import {FormBuilderBody} from './components/FormBuilderBody/FormBuilderBody';
import {FormProvider} from './hooks/FormContext';

export const FormBuilder: React.FC<FormBuilderProps> = ({formFields, className, onChange}) => {
    return (
        <FormProvider formFields={formFields} onChange={onChange}>
            <FormBuilderBody className={className} />
        </FormProvider>
    );
};
