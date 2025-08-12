import {
    AnyOfInput,
    ArrayObjectInput,
    ArrayTextInput,
    ConfigInput,
    ObjectInput,
    OneOfInput,
} from '../../editor-v2';

export type FormField = ConfigInput & {id: string};

export type FormObjectField = ObjectInput & {id: string};
export type FormArrayField = (ArrayTextInput | ArrayObjectInput) & {
    id: string;
    properties?: FormField[];
};
export type FormOneOfField = OneOfInput & {id: string};
export type FormAnyOfField = AnyOfInput & {id: string};
export type FormOptionsField = (OneOfInput | AnyOfInput) & {id: string};

export interface InputTypeMenuItem {
    action: () => void;
    text: string;
    type: string;
}

export interface ContentConfig {
    [key: string]: unknown;
}

export interface FormFieldsActions {
    createField: (type: ConfigInput['type'], name?: string) => FormField;
    addField: (type: ConfigInput['type']) => void;
    removeField: (fieldId: string) => void;
    updateField: (fieldId: string, updates: Partial<ConfigInput>) => void;

    addObjectProperty: (objectId: string, type: ConfigInput['type']) => void;
    removeObjectProperty: (fieldId: string, propertyIndex: number) => void;
    updateObjectProperty: (
        fieldId: string,
        propertyIndex: number,
        updates: Partial<ConfigInput>,
    ) => void;

    addOption: (fieldId: string) => void;
    removeOption: (fieldId: string, optionIndex: number) => void;
    addOptionProperty: (fieldId: string, optionIndex: number, type?: ConfigInput['type']) => void;
    removeOptionProperty: (fieldId: string, optionIndex: number, propertyIndex: number) => void;
    updateOptionProperty: (
        fieldId: string,
        optionIndex: number,
        propertyIndex: number,
        updates: Partial<ConfigInput>,
    ) => void;

    resetForm: () => void;
}

export interface FormData {
    formFields: Array<FormField>;
}

export interface FormContextType extends FormData, FormFieldsActions {}
