import * as React from 'react';

import {fireEvent, render, screen} from '@testing-library/react';

import {FieldSettings} from '../../form-builder-v2/components/FieldSettings/FieldSettings';
import {FormProvider} from '../../form-builder-v2/hooks/FormContext';
import type {FormField} from '../../form-builder-v2/types';
import FormGenerator from '../FormGenerator';
import type {Content, Fields} from '../types';

jest.mock('../../components/MarkdownEditorInput/MarkdownEditorInput', () => ({
    MarkdownEditorInput: ({
        value,
        onUpdate,
    }: {
        value: string;
        onUpdate: (value: string) => void;
    }) => (
        <textarea
            aria-label="Markdown"
            value={value}
            onChange={(event) => onUpdate(event.target.value)}
        />
    ),
}));

const field = {
    type: 'markdownEditor' as const,
    name: 'page.notes',
    title: 'Notes',
    defaultValue: '**Default**',
};

const Form = ({fields = [field], initial = {}}: {fields?: Fields; initial?: Content}) => {
    const [content, setContent] = React.useState(initial);
    return (
        <React.Fragment>
            <FormGenerator blockConfig={fields} contentConfig={content} onUpdate={setContent} />
            <output data-qa="content">{JSON.stringify(content)}</output>
        </React.Fragment>
    );
};

describe('Markdown form field', () => {
    test('initializes the default at a nested path and stores user edits', () => {
        render(<Form />);
        expect(screen.getByRole('textbox', {name: 'Markdown'})).toHaveValue('**Default**');
        expect(screen.getByTestId('content')).toHaveTextContent('{"page":{"notes":"**Default**"}}');

        fireEvent.change(screen.getByRole('textbox'), {target: {value: '# Edited'}});
        expect(screen.getByTestId('content')).toHaveTextContent('{"page":{"notes":"# Edited"}}');
        fireEvent.change(screen.getByRole('textbox'), {target: {value: ''}});
        expect(screen.getByRole('textbox')).toHaveValue('');
        expect(screen.getByTestId('content')).toHaveTextContent('{"page":{"notes":""}}');
    });

    test('preserves existing content and explicit empty values over the default', () => {
        const {rerender} = render(
            <FormGenerator blockConfig={[field]} contentConfig={{page: {notes: '**Saved**'}}} />,
        );
        expect(screen.getByRole('textbox')).toHaveValue('**Saved**');
        rerender(<FormGenerator blockConfig={[field]} contentConfig={{page: {notes: ''}}} />);
        expect(screen.getByRole('textbox')).toHaveValue('');
    });

    test('removes hidden content and initializes the default when shown again', () => {
        const onUpdateByKey = jest.fn();
        const fields: Fields = [
            {...field, when: [{field: 'enabled', operator: '===', value: true}]},
        ];
        const {rerender} = render(
            <FormGenerator
                blockConfig={fields}
                contentConfig={{enabled: true, page: {notes: 'Saved'}}}
                onUpdateByKey={onUpdateByKey}
            />,
        );
        rerender(
            <FormGenerator
                blockConfig={fields}
                contentConfig={{enabled: false, page: {notes: 'Saved'}}}
                onUpdateByKey={onUpdateByKey}
            />,
        );
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
        expect(onUpdateByKey).toHaveBeenLastCalledWith('page.notes', undefined);
        rerender(
            <FormGenerator
                blockConfig={fields}
                contentConfig={{enabled: true}}
                onUpdateByKey={onUpdateByKey}
            />,
        );
        expect(screen.getByRole('textbox')).toHaveValue('**Default**');
        expect(onUpdateByKey).toHaveBeenLastCalledWith('page.notes', '**Default**');
    });

    test('keeps values independent inside a repeating section', () => {
        render(
            <Form
                fields={[
                    {
                        type: 'section',
                        title: 'Chapters',
                        index: 'index',
                        fields: [{...field, name: 'chapters[{{index}}].text'}],
                    },
                ]}
                initial={{chapters: [{text: 'First'}, {text: 'Second'}]}}
            />,
        );
        const inputs = screen.getAllByRole('textbox');
        expect(inputs).toHaveLength(2);
        fireEvent.change(inputs[1], {target: {value: '**Updated second**'}});
        expect(inputs[0]).toHaveValue('First');
        expect(screen.getByTestId('content')).toHaveTextContent(
            '{"chapters":[{"text":"First"},{"text":"**Updated second**"}]}',
        );
    });

    test('connects Markdown settings to schema updates', () => {
        const selected: FormField = {...field, id: 'markdown'};
        const onChange = jest.fn();
        render(
            <FormProvider formFields={[selected]} onChange={onChange}>
                <FieldSettings field={selected} />
            </FormProvider>,
        );
        expect(screen.getByRole('textbox', {name: 'Markdown'})).toHaveValue('**Default**');
        fireEvent.change(screen.getByRole('textbox', {name: 'Markdown'}), {
            target: {value: '# Default'},
        });
        expect(onChange).toHaveBeenLastCalledWith([
            expect.objectContaining({id: 'markdown', defaultValue: '# Default'}),
        ]);
        fireEvent.change(screen.getByPlaceholderText('Editor placeholder'), {
            target: {value: 'Write notes'},
        });
        expect(onChange).toHaveBeenLastCalledWith([
            expect.objectContaining({placeholder: 'Write notes'}),
        ]);
    });
});
