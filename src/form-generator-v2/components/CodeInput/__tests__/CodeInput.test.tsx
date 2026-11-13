import {fireEvent, render, screen} from '@testing-library/react';

import FormGenerator from '../../../FormGenerator';
import {CodeField, Fields} from '../../../types';
import CodeInput from '../CodeInput';
import type {CodeDiagnostic} from '../MonacoCodeEditor';

// Keep Monaco's native dynamic import outside Jest's CommonJS validation tests.
jest.mock('react', () => {
    const React = jest.requireActual<typeof import('react')>('react');
    return {
        ...React,
        lazy: () =>
            function Editor({
                value,
                onChange,
                onValidate,
            }: {
                value: string;
                onChange: (code: string) => void;
                onValidate: (diagnostics: CodeDiagnostic[]) => void;
            }) {
                React.useEffect(() => {
                    onValidate(
                        value === 'broken JSON'
                            ? [{message: 'Value expected', severity: 'error', line: 2, column: 3}]
                            : [],
                    );
                }, [onValidate, value]);

                return (
                    <textarea
                        aria-label="Code editor"
                        value={value}
                        onChange={(event) => onChange(event.target.value)}
                    />
                );
            },
    };
});

const field: CodeField = {type: 'codeInput', name: 'config', title: 'Config'};
const validate = (code: string) => (code === 'valid' ? undefined : 'Invalid configuration');

describe('CodeInput validation', () => {
    test('shows Monaco diagnostics alongside custom validation and removes fixed diagnostics', () => {
        const props = {...field, onUpdate: jest.fn(), validate: () => 'Custom validation message'};
        const {rerender} = render(<CodeInput {...props} content={{config: 'broken JSON'}} />);

        expect(screen.getByRole('alert')).toHaveTextContent('2:3: Value expected');
        expect(screen.getByRole('alert')).toHaveTextContent('Custom validation message');

        rerender(<CodeInput {...props} content={{config: 'fixed'}} />);
        expect(screen.queryByText('2:3: Value expected')).not.toBeInTheDocument();
        expect(screen.getByRole('alert')).toHaveTextContent('Custom validation message');

        rerender(<CodeInput {...field} onUpdate={props.onUpdate} content={{config: 'fixed'}} />);
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    test('shows validation errors without blocking edits and clears them for valid content', async () => {
        const onUpdate = jest.fn();
        const {rerender} = render(
            <CodeInput
                {...field}
                content={{config: 'invalid'}}
                onUpdate={onUpdate}
                validate={validate}
            />,
        );

        expect(screen.getByRole('alert')).toHaveTextContent('Invalid configuration');
        const editor = await screen.findByRole('textbox', {name: 'Code editor'});
        fireEvent.change(editor, {target: {value: 'still invalid'}});
        expect(onUpdate).toHaveBeenCalledWith('config', 'still invalid');

        rerender(
            <CodeInput
                {...field}
                content={{config: 'valid'}}
                onUpdate={onUpdate}
                validate={validate}
            />,
        );
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    test('validates default values and reacts to a replacement validator', async () => {
        const props = {...field, content: {}, defaultValue: 'valid', onUpdate: jest.fn()};
        const {rerender} = render(<CodeInput {...props} validate={validate} />);

        expect(await screen.findByRole('textbox', {name: 'Code editor'})).toHaveValue('valid');
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();

        rerender(<CodeInput {...props} validate={() => 'New validation rule'} />);
        expect(screen.getByRole('alert')).toHaveTextContent('New validation rule');
    });

    test('preserves custom validation inside repeating sections', async () => {
        const blockConfig: Fields = [
            {
                type: 'section',
                title: 'Configurations',
                index: 'index',
                fields: [{...field, name: 'items[{{index}}].config', validate}],
            },
        ];
        const onUpdate = jest.fn();
        render(
            <FormGenerator
                blockConfig={blockConfig}
                contentConfig={{items: [{config: 'invalid'}, {config: 'valid'}]}}
                onUpdate={onUpdate}
            />,
        );

        const editors = await screen.findAllByRole('textbox', {name: 'Code editor'});
        expect(editors).toHaveLength(2);
        expect(screen.getAllByRole('alert')).toHaveLength(1);

        fireEvent.change(editors[1], {target: {value: 'changed'}});
        expect(onUpdate).toHaveBeenCalledWith({
            items: [{config: 'invalid'}, {config: 'changed'}],
        });
    });
});
