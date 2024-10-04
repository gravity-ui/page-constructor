import {
    ArrayObjectInput,
    ArrayTextInput,
    BooleanInput,
    NumberInput,
    ObjectInput,
    OneOfInput,
    SelectMultipleInput,
    SelectSingleInput,
    TextAreaInput,
    TextInput,
} from '../../types/dynamic-form';

const textInput: TextInput = {
    type: 'text',
    name: 'text',
    title: 'Text Input',
};

const textAreaInput: TextAreaInput = {
    type: 'textarea',
    name: 'textarea',
    title: 'TextArea Input',
};

const booleanInput: BooleanInput = {
    type: 'boolean',
    name: 'boolean',
    title: 'Boolean Input',
};

const numberInput: NumberInput = {
    type: 'number',
    name: 'number',
    title: 'Number Input',
};

const selectInput: SelectSingleInput = {
    type: 'select',
    name: 'selectSingle',
    title: 'Select Single Input',
    mode: 'single',
    view: 'select',
    enum: [
        {value: 'id_1', content: 'Option 1'},
        {value: 'id_2', content: 'Option 2'},
    ],
};

const radioButtonsViewSingleInput: SelectSingleInput = {
    ...selectInput,
    name: 'radioButtons',
    title: 'Radio Button Input',

    view: 'radiobutton',
};

// @ts-ignore
const selectMultipleModeInput: SelectMultipleInput = {
    ...selectInput,
    name: 'selectMultiple',
    title: 'Select Multiple Input',

    mode: 'multiple',
};

const objectInput: ObjectInput = {
    type: 'object',
    name: 'object',
    title: 'Object Input',
    properties: [textInput, textAreaInput, selectInput],
};

const arrayTextInput: ArrayTextInput = {
    type: 'array',
    name: 'arrayText',
    title: 'Array Text Input',
    buttonText: 'Add Array Item',
    arrayType: 'text',
};

const arrayObjectInput: ArrayObjectInput = {
    type: 'array',
    name: 'arrayObject',
    title: 'Array Object Input',
    buttonText: 'Add Array Item',
    arrayType: 'object',
    properties: [textInput, textAreaInput, selectInput],
};

const oneOfInput: OneOfInput = {
    type: 'oneOf',
    name: 'oneOf',
    key: 'oneOfKey',
    title: 'Array Text Input',
    options: [
        {value: 'text', title: 'Text', properties: [textInput]},
        {value: 'textarea', title: 'TextArea', properties: [textAreaInput]},
    ],
};

export default [
    textInput,
    textAreaInput,
    booleanInput,
    numberInput,
    selectInput,
    radioButtonsViewSingleInput,
    selectMultipleModeInput,
    objectInput,
    arrayTextInput,
    arrayObjectInput,
    oneOfInput,
];
