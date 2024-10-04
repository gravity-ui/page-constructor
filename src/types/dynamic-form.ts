export interface BlockFormSchema {
    name: string;
    inputs: Array<ConfigInput>;
}

export interface TextInput {
    type: 'text';
    name: string;
    title: string;
}

export interface BooleanInput {
    type: 'boolean';
    name: string;
    title: string;
}

export interface NumberInput {
    type: 'number';
    name: string;
    title: string;
}

export interface TextAreaInput {
    type: 'textarea';
    name: string;
    title: string;
}

export interface SelectBaseInput {
    type: 'select';
    name: string;
    title: string;
    view: 'select' | 'radiobutton';
    mode: 'single' | 'multiple';
    enum: Array<{content: string; value: string}>;
}

export interface SelectSingleInput extends SelectBaseInput {
    type: 'select';
    name: string;
    title: string;
    view: 'select' | 'radiobutton';
    mode: 'single';
    enum: Array<{content: string; value: string}>;
}

export interface SelectMultipleInput extends SelectBaseInput {
    type: 'select';
    name: string;
    title: string;
    view: 'select';
    mode: 'multiple';
    enum: Array<{content: string; value: string}>;
}

export interface ObjectInput {
    type: 'object';
    name: string;
    title: string;
    properties: Array<ConfigInput>;
}

export interface ArrayBaseInput {
    type: 'array';
    arrayType: 'object' | 'text';
    name: string;
    title: string;
    buttonText: string;
}

export interface ArrayTextInput extends ArrayBaseInput {
    arrayType: 'text';
}

export interface ArrayObjectInput extends ArrayBaseInput {
    arrayType: 'object';
    properties: Array<ConfigInput>;
}

export interface OneOfInput {
    type: 'oneOf';
    name: string;
    key?: string;
    title: string;
    options: {
        value: string;
        title: string;
        properties: Array<ConfigInput>;
    }[];
}

export interface GeneralProps {
    showIf?: string;
}

export type ConfigInput = (
    | TextInput
    | BooleanInput
    | NumberInput
    | TextAreaInput
    | SelectSingleInput
    | SelectMultipleInput
    | ObjectInput
    | ArrayTextInput
    | ArrayObjectInput
    | OneOfInput
) &
    GeneralProps;
