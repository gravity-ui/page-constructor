import * as React from 'react';

import {Meta} from '@storybook/react';

import FormGenerator from '../FormGenerator';
import {Content, Fields} from '../types';

export default {title: 'FormGenerator/TextListInput', component: FormGenerator} as Meta<
    typeof FormGenerator
>;

const fields: Fields = [
    {
        type: 'textListInput',
        name: 'items',
        title: 'Items',
        placeholder: 'Enter a string',
        addButtonText: 'Add item',
    },
];

export const Default = () => {
    const [content, setContent] = React.useState<Content>({
        items: ['Item 1', 'Item 2'],
    });
    return (
        <div style={{padding: 24, maxWidth: 600}}>
            <FormGenerator blockConfig={fields} contentConfig={content} onUpdate={setContent} />
            <pre>{JSON.stringify(content, null, 2)}</pre>
        </div>
    );
};
