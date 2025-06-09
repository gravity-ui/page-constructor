import {
    AnyOfInput,
    ArrayObjectInput,
    ArrayTextInput,
    ConfigInput,
    ObjectInput,
    OneOfInput,
} from '../../../../../src/editor-v2';

// Базовый тип для поля формы
export type FormField = ConfigInput & {id: string};

// Типизированные поля формы
export type FormObjectField = ObjectInput & {id: string};
export type FormArrayField = (ArrayTextInput | ArrayObjectInput) & {
    id: string;
    properties?: FormField[];
};
export type FormOneOfField = OneOfInput & {id: string};
export type FormAnyOfField = AnyOfInput & {id: string};
export type FormOptionsField = (OneOfInput | AnyOfInput) & {id: string};

// Тип для элемента меню выбора типа поля
export interface InputTypeMenuItem {
    action: () => void;
    text: string;
    type: string;
}

// Тип для конфигурации контента
export interface ContentConfig {
    [key: string]: unknown;
}

// Интерфейс для методов работы с полями формы
export interface FormFieldsActions {
    // Основные методы для работы с полями
    createField: (type: ConfigInput['type'], name?: string) => FormField;
    addField: (type: ConfigInput['type']) => void;
    removeField: (fieldId: string) => void;
    updateField: (fieldId: string, updates: Partial<ConfigInput>) => void;

    // Методы для работы с объектными полями
    addObjectProperty: (objectId: string, type: ConfigInput['type']) => void;
    removeObjectProperty: (fieldId: string, propertyIndex: number) => void;
    updateObjectProperty: (
        fieldId: string,
        propertyIndex: number,
        updates: Partial<ConfigInput>,
    ) => void;

    // Методы для работы с опциями
    addOption: (fieldId: string) => void;
    removeOption: (fieldId: string, optionIndex: number) => void;
    addOptionProperty: (
        fieldId: string,
        optionIndex: number,
        isOneOf: boolean,
        type?: ConfigInput['type'],
    ) => void;
    removeOptionProperty: (fieldId: string, optionIndex: number, propertyIndex: number) => void;
    updateOptionProperty: (
        fieldId: string,
        optionIndex: number,
        propertyIndex: number,
        updates: Partial<ConfigInput>,
    ) => void;

    // Сброс формы
    resetForm: () => void;
}

// Интерфейс для данных формы
export interface FormData {
    formFields: Array<FormField>;
    contentConfig: ContentConfig;
    handleFormUpdate: (key: string, value: unknown) => void;
}

// Полный интерфейс контекста формы
export interface FormContextType extends FormData, FormFieldsActions {}
