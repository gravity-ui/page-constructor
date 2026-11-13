import * as React from 'react';

import {ThemeProvider} from '@gravity-ui/uikit';
import {act, render, renderHook, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {FormProvider, useFormContext} from '../../../../hooks/FormContext';
import {FormField} from '../../../../types';
import {CodeFieldSettings} from '../CodeFieldSettings';

describe('Code field languages', () => {
    beforeAll(() => {
        jest.spyOn(window, 'matchMedia').mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        }));
    });

    afterAll(() => jest.restoreAllMocks());

    test('offers only YAML and JSON', async () => {
        const updateField = jest.fn();
        render(
            <ThemeProvider theme="light">
                <CodeFieldSettings
                    field={{id: 'code', type: 'codeInput', name: 'code', title: 'Code'}}
                    updateField={updateField}
                    commonRows={null}
                    whenEditorSection={null}
                />
            </ThemeProvider>,
        );

        const user = userEvent.setup();
        await user.click(screen.getByRole('combobox'));
        expect(screen.getAllByRole('option')).toHaveLength(2);
        expect(screen.getByRole('option', {name: 'YAML'})).toBeInTheDocument();
        await user.click(screen.getByRole('option', {name: 'JSON'}));
        expect(updateField).toHaveBeenCalledWith('code', {
            language: 'json',
        });
    });

    test('uses YAML for fields added to the root and sections', () => {
        const formFields: FormField[] = [
            {id: 'section', type: 'section', title: 'Section', fields: []},
        ];
        const wrapper = ({children}: {children: React.ReactNode}) => (
            <FormProvider formFields={formFields}>{children}</FormProvider>
        );
        const {result} = renderHook(useFormContext, {wrapper});

        act(() => result.current.addField('codeInput'));
        expect(result.current.formFields[1]).toMatchObject({type: 'codeInput', language: 'yaml'});

        act(() => result.current.addFieldToSection('section', 'codeInput'));
        expect(result.current.formFields[0]).toMatchObject({
            fields: [{type: 'codeInput', language: 'yaml'}],
        });

        act(() => result.current.insertFieldBefore('section', 'codeInput'));
        expect(result.current.formFields[0]).toMatchObject({type: 'codeInput', language: 'yaml'});
    });
});
