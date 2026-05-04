import type {
    ColorField,
    SectionField,
    SegmentedRadioGroupField,
    SelectField,
    SwitchField,
    Text,
    TextField,
} from '../form-generator-v2/types';

type LeafField =
    | TextField
    | SelectField
    | SegmentedRadioGroupField
    | Text
    | SwitchField
    | ColorField;

export type BuilderLeafField = LeafField & {id: string};
export type BuilderSectionField = Omit<SectionField, 'fields'> & {
    id: string;
    fields: FormField[];
};

export type FormField = BuilderLeafField | BuilderSectionField;

export type BuilderFieldType = FormField['type'];

export type FieldUpdate = Partial<LeafField> | Partial<Omit<BuilderSectionField, 'id'>>;

export interface FormFieldsActions {
    addField: (type: BuilderFieldType) => void;
    addFieldToSection: (sectionId: string, type: BuilderFieldType) => void;
    insertFieldBefore: (targetId: string, type: BuilderFieldType) => void;
    insertFieldAfter: (targetId: string, type: BuilderFieldType) => void;
    moveFieldToSection: (fieldId: string, sectionId: string) => void;
    removeField: (fieldId: string) => void;
    duplicateField: (fieldId: string) => void;
    updateField: (fieldId: string, updates: FieldUpdate) => void;
    moveFieldUp: (fieldId: string) => void;
    moveFieldDown: (fieldId: string) => void;
    setAllFields: (fields: FormField[]) => void;
    resetForm: () => void;
    selectField: (fieldId: string | null) => void;
}

export interface FormContextType extends FormFieldsActions {
    formFields: FormField[];
    selectedFieldId: string | null;
}
