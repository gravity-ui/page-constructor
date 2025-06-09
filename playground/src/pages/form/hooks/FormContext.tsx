import * as React from 'react';
import {useFormFields} from './useFormFields';
import {FormContextType} from './types';

// Создаем контекст с дефолтными значениями
export const FormContext = React.createContext<FormContextType>({} as FormContextType);

// Provider компонент, который будет оборачивать наше приложение
export const FormProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    // Используем наш существующий хук
    const formFieldsData = useFormFields();

    return <FormContext.Provider value={formFieldsData}>{children}</FormContext.Provider>;
};

// Кастомный хук для использования контекста
export const useFormContext = () => {
    const context = React.useContext(FormContext);

    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }

    return context;
};
