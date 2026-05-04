import {BuilderFieldType, FormField} from '../types';

export const createDefaultField = (type: BuilderFieldType, name: string, id: string): FormField => {
    switch (type) {
        case 'textInput':
            return {type, name, title: 'Text input', id};
        case 'textArea':
            return {type, name, title: 'Text area', id};
        case 'switch':
            return {type, name, title: 'Switch', id};
        case 'colorInput':
            return {type, name, title: 'Color', defaultValue: '#000000', id};
        case 'select':
            return {
                type,
                name,
                title: 'Select',
                options: [
                    {value: 'option1', content: 'Option 1'},
                    {value: 'option2', content: 'Option 2'},
                ],
                id,
            };
        case 'segmentedRadioGroup':
            return {
                type,
                name,
                title: 'Segmented radio',
                options: [
                    {value: 'option1', content: 'Option 1'},
                    {value: 'option2', content: 'Option 2'},
                ],
                id,
            };
        case 'text':
            return {type, text: 'Static text', id};
        case 'section':
            return {
                type,
                title: 'Section',
                opened: true,
                fields: [],
                id,
            };
        default:
            return undefined as never;
    }
};
