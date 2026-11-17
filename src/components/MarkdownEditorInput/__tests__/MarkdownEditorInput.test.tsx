import {configure, useMarkdownEditor} from '@gravity-ui/markdown-editor';
import {Lang, ThemeProvider} from '@gravity-ui/uikit';
import {act, render} from '@testing-library/react';

import {LocaleContext} from '../../../gravity-blocks/context/localeContext';
import {MarkdownEditorInput} from '../MarkdownEditorInput';

jest.mock('@gravity-ui/markdown-editor', () => ({
    configure: jest.fn(),
    useMarkdownEditor: jest.fn(),
    MarkdownEditorView: () => null,
}));

describe('MarkdownEditorInput', () => {
    let currentValue: string;
    let change: (() => void) | undefined;
    const editor = {
        on: jest.fn((_event: string, handler: () => void) => {
            change = handler;
        }),
        off: jest.fn(() => {
            change = undefined;
        }),
        getValue: jest.fn(() => currentValue),
        isEmpty: jest.fn(() => currentValue === ''),
        replace: jest.fn((value: string) => {
            currentValue = value;
            change?.();
        }),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        currentValue = '**Initial**';
        change = undefined;
        jest.mocked(useMarkdownEditor).mockReturnValue(
            editor as unknown as ReturnType<typeof useMarkdownEditor>,
        );
    });

    test('emits Markdown edits and explicit empty values', () => {
        const onUpdate = jest.fn();
        render(<MarkdownEditorInput value={currentValue} onUpdate={onUpdate} />, {
            wrapper: ThemeProvider,
        });

        act(() => {
            currentValue = '**Edited**';
            change?.();
        });
        expect(onUpdate).toHaveBeenLastCalledWith('**Edited**');
        act(() => {
            currentValue = '';
            change?.();
        });
        expect(onUpdate).toHaveBeenLastCalledWith('');
    });

    test('applies external changes without echoing them to the parent', () => {
        const onUpdate = jest.fn();
        const {rerender} = render(
            <MarkdownEditorInput value={currentValue} onUpdate={onUpdate} />,
            {wrapper: ThemeProvider},
        );

        rerender(<MarkdownEditorInput value="External" onUpdate={onUpdate} />);
        expect(editor.replace).toHaveBeenCalledWith('External');
        expect(onUpdate).not.toHaveBeenCalled();
    });

    test('keeps the current document when the parent acknowledges an edit', () => {
        const onUpdate = jest.fn();
        const {rerender} = render(
            <MarkdownEditorInput value={currentValue} onUpdate={onUpdate} />,
            {wrapper: ThemeProvider},
        );

        act(() => {
            currentValue = 'Edited';
            change?.();
        });
        rerender(<MarkdownEditorInput value="Edited" onUpdate={onUpdate} />);
        expect(editor.replace).not.toHaveBeenCalled();
        expect(onUpdate).toHaveBeenCalledTimes(1);
    });

    test('uses the latest callback and removes its listener on unmount', () => {
        const first = jest.fn();
        const latest = jest.fn();
        const {rerender, unmount} = render(
            <MarkdownEditorInput value={currentValue} onUpdate={first} />,
            {wrapper: ThemeProvider},
        );
        rerender(<MarkdownEditorInput value={currentValue} onUpdate={latest} />);

        act(() => {
            currentValue = 'Edited';
            change?.();
        });
        expect(first).not.toHaveBeenCalled();
        expect(latest).toHaveBeenCalledWith('Edited');
        const handler = change;
        unmount();
        expect(editor.off).toHaveBeenCalledWith('change', handler);
        expect(configure).toHaveBeenCalledWith({lang: Lang.Ru});
    });

    test('follows locale changes and falls back to Russian without replacing the document', () => {
        const onUpdate = jest.fn();
        const input = (lang?: `${Lang}`) => (
            <LocaleContext.Provider value={{lang}}>
                <MarkdownEditorInput value={currentValue} onUpdate={onUpdate} />
            </LocaleContext.Provider>
        );
        const {rerender} = render(input(Lang.En), {wrapper: ThemeProvider});
        expect(configure).toHaveBeenLastCalledWith({lang: Lang.En});

        rerender(input());
        expect(configure).toHaveBeenLastCalledWith({lang: Lang.Ru});

        rerender(input(Lang.En));
        expect(configure).toHaveBeenLastCalledWith({lang: Lang.En});
        expect(editor.replace).not.toHaveBeenCalled();
        expect(onUpdate).not.toHaveBeenCalled();
    });
});
