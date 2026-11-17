import * as React from 'react';

import {Button, ThemeProvider} from '@gravity-ui/uikit';

import {FormBuilderV2} from '../../../form-builder-v2/FormBuilderV2';
import type {FormField} from '../../../form-builder-v2/types';
import {MarkdownEditorInput} from '../MarkdownEditorInput';

export const MarkdownInputHarness = ({theme = 'light'}: {theme?: 'light' | 'dark'}) => {
    const [value, setValue] = React.useState('**Initial notes**');
    const [updates, setUpdates] = React.useState(0);

    return (
        <ThemeProvider theme={theme}>
            <div style={{width: 270}}>
                <MarkdownEditorInput
                    qa="markdown-editor"
                    value={value}
                    placeholder="Write notes"
                    onUpdate={(next) => {
                        setValue(next);
                        setUpdates((count) => count + 1);
                    }}
                />
                <Button onClick={() => setValue('## External notes')}>Replace value</Button>
                <Button onClick={() => setValue('')}>Clear value</Button>
                <output data-qa="value">{value}</output>
                <output data-qa="updates">{updates}</output>
            </div>
        </ThemeProvider>
    );
};

export const MarkdownBuilderHarness = () => {
    const [fields, setFields] = React.useState<FormField[]>([
        {
            id: 'markdown',
            type: 'markdownEditor',
            name: 'notes',
            title: 'Notes',
            defaultValue: '**Default notes**',
        },
    ]);
    return (
        <div style={{width: 1100}}>
            <FormBuilderV2 formFields={fields} onChange={setFields} density="compact" />
            <output data-qa="schema">{JSON.stringify(fields)}</output>
        </div>
    );
};
