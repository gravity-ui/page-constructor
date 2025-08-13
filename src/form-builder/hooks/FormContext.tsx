import * as React from 'react';
import {useFormFields} from './useFormFields';
import {FormContextType, FormField} from '../types';

export const FormContext = React.createContext<FormContextType>({} as FormContextType);

interface FormProviderProps {
    children: React.ReactNode;
    formFields: FormField[];
    onChange?: (fields: FormField[]) => void;
}

export const FormProvider: React.FC<FormProviderProps> = ({children, formFields, onChange}) => {
    const formFieldsData = useFormFields({initialFields: formFields, onChange});
    return <FormContext.Provider value={formFieldsData}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
    const context = React.useContext(FormContext);

    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }

    return context;
};
