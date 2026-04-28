import * as React from 'react';

import {FormContextType, FormField} from '../types';

import {useFormFields} from './useFormFields';

export const FormContext = React.createContext<FormContextType | null>(null);

interface FormProviderProps {
    children: React.ReactNode;
    formFields: FormField[];
    onChange?: (fields: FormField[]) => void;
}

export const FormProvider: React.FC<FormProviderProps> = ({children, formFields, onChange}) => {
    const value = useFormFields({initialFields: formFields, onChange});
    return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = (): FormContextType => {
    const context = React.useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};
