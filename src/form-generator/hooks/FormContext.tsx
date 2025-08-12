import * as React from 'react';
import {useFormFields} from './useFormFields';
import {FormContextType} from './types';

export const FormContext = React.createContext<FormContextType>({} as FormContextType);

export const FormProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const formFieldsData = useFormFields();

    return <FormContext.Provider value={formFieldsData}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
    const context = React.useContext(FormContext);

    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }

    return context;
};
