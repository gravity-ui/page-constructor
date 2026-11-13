import {act, render} from '@testing-library/react';
import MonacoEditor, {monaco} from 'react-monaco-editor';

import MonacoCodeEditor from '../MonacoCodeEditor';

jest.mock('react-monaco-editor', () => ({
    __esModule: true,
    default: jest.fn(() => null),
}));

const firstUri = {toString: () => 'inmemory://first'} as monaco.Uri;
const secondUri = {toString: () => 'inmemory://second'} as monaco.Uri;
const marker = (message: string, severity = 8, startLineNumber = 1): monaco.editor.IMarker => ({
    message,
    severity,
    startLineNumber,
    startColumn: 2,
    endLineNumber: startLineNumber,
    endColumn: 3,
    owner: 'json',
    resource: firstUri,
});

const setup = (initialMarkers: monaco.editor.IMarker[] = []) => {
    const markers = new Map([[firstUri, initialMarkers]]);
    let currentModel: {uri: monaco.Uri} | null = {uri: firstUri};
    let emitMarkers: (resources: readonly monaco.Uri[]) => void = () => {};
    let emitModel: () => void = () => {};
    const disposeMarkers = jest.fn();
    const disposeModel = jest.fn();
    const editor = {
        getModel: () => currentModel,
        onDidChangeModel: (listener: () => void) => {
            emitModel = listener;
            return {dispose: disposeModel};
        },
    } as unknown as monaco.editor.IStandaloneCodeEditor;
    const api = {
        MarkerSeverity: {Error: 8, Warning: 4, Info: 2, Hint: 1},
        editor: {
            getModelMarkers: ({resource}: {resource: monaco.Uri}) => markers.get(resource) ?? [],
            onDidChangeMarkers: (listener: typeof emitMarkers) => {
                emitMarkers = listener;
                return {dispose: disposeMarkers};
            },
        },
    } as unknown as typeof monaco;
    const onValidate = jest.fn();
    const view = render(
        <MonacoCodeEditor
            value="{}"
            language="json"
            height={220}
            onChange={jest.fn()}
            onValidate={onValidate}
        />,
    );
    const props = jest.mocked(MonacoEditor).mock.calls[0][0];
    act(() => props.editorDidMount?.(editor, api));

    return {
        ...view,
        onValidate,
        disposeMarkers,
        disposeModel,
        updateMarkers: (uri: monaco.Uri, next: monaco.editor.IMarker[]) => {
            markers.set(uri, next);
            act(() => emitMarkers([uri]));
        },
        changeModel: (uri: monaco.Uri | null) => {
            currentModel = uri ? {uri} : null;
            act(() => emitModel());
        },
    };
};

describe('MonacoCodeEditor diagnostics', () => {
    beforeEach(() => jest.clearAllMocks());

    test('reports existing errors and warnings with their positions', () => {
        const {onValidate} = setup([
            marker('Second error', 8, 3),
            marker('Warning', 4),
            marker('Information', 2),
            marker('Hint', 1),
        ]);

        expect(onValidate).toHaveBeenLastCalledWith([
            {message: 'Warning', severity: 'warning', line: 1, column: 2},
            {message: 'Second error', severity: 'error', line: 3, column: 2},
        ]);
    });

    test('isolates documents and clears errors once markers are removed', () => {
        const {onValidate, updateMarkers} = setup([marker('Value expected')]);
        onValidate.mockClear();

        updateMarkers(secondUri, [marker('Another field error')]);
        expect(onValidate).not.toHaveBeenCalled();

        updateMarkers(firstUri, [marker('Property expected')]);
        expect(onValidate).toHaveBeenLastCalledWith([
            {message: 'Property expected', severity: 'error', line: 1, column: 2},
        ]);

        updateMarkers(firstUri, []);
        expect(onValidate).toHaveBeenLastCalledWith([]);
    });

    test('refreshes on model replacement and unsubscribes on unmount', () => {
        const {onValidate, updateMarkers, changeModel, unmount, disposeMarkers, disposeModel} =
            setup([marker('First field error')]);

        updateMarkers(secondUri, [marker('Second field error')]);
        changeModel(secondUri);
        expect(onValidate).toHaveBeenLastCalledWith([
            {message: 'Second field error', severity: 'error', line: 1, column: 2},
        ]);

        changeModel(null);
        expect(onValidate).toHaveBeenLastCalledWith([]);
        unmount();
        expect(disposeMarkers).toHaveBeenCalledTimes(1);
        expect(disposeModel).toHaveBeenCalledTimes(1);
    });
});

describe('MonacoCodeEditor changes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => jest.useRealTimers());

    test('uses the current callback through the handler captured on mount', () => {
        const firstOnChange = jest.fn();
        const secondOnChange = jest.fn();
        const props = {
            value: '{}',
            language: 'json' as const,
            height: 220,
            onValidate: jest.fn(),
        };
        const view = render(<MonacoCodeEditor {...props} onChange={firstOnChange} />);
        const initialHandler = jest.mocked(MonacoEditor).mock.calls[0][0].onChange;

        view.rerender(<MonacoCodeEditor {...props} onChange={secondOnChange} />);
        const calls = jest.mocked(MonacoEditor).mock.calls;
        expect(calls[calls.length - 1][0].onChange).toBe(initialHandler);

        act(() => initialHandler?.('current field', {} as monaco.editor.IModelContentChangedEvent));
        expect(secondOnChange).not.toHaveBeenCalled();
        act(() => jest.advanceTimersByTime(200));
        expect(secondOnChange).toHaveBeenCalledWith('current field');
        expect(firstOnChange).not.toHaveBeenCalled();
    });

    test('keeps pending edits bound to their original callback across switching and unmounting', () => {
        const firstOnChange = jest.fn();
        const secondOnChange = jest.fn();
        const props = {
            value: '{}',
            language: 'json' as const,
            height: 220,
            onValidate: jest.fn(),
        };
        const view = render(<MonacoCodeEditor {...props} onChange={firstOnChange} />);
        const initialHandler = jest.mocked(MonacoEditor).mock.calls[0][0].onChange;

        act(() => initialHandler?.('first edit', {} as monaco.editor.IModelContentChangedEvent));
        expect(firstOnChange).not.toHaveBeenCalled();

        view.rerender(<MonacoCodeEditor {...props} onChange={secondOnChange} />);
        expect(secondOnChange).not.toHaveBeenCalled();
        act(() => initialHandler?.('last edit', {} as monaco.editor.IModelContentChangedEvent));
        view.unmount();
        act(() => jest.advanceTimersByTime(200));
        expect(firstOnChange).toHaveBeenCalledWith('first edit');
        expect(secondOnChange).toHaveBeenCalledWith('last edit');
        expect(firstOnChange).toHaveBeenCalledTimes(1);
        expect(secondOnChange).toHaveBeenCalledTimes(1);
    });

    test('delivers only the latest edit after 200ms without changes', () => {
        const onChange = jest.fn();
        render(
            <MonacoCodeEditor
                value="{}"
                language="json"
                height={220}
                onChange={onChange}
                onValidate={jest.fn()}
            />,
        );
        const handler = jest.mocked(MonacoEditor).mock.calls[0][0].onChange;
        const event = {} as monaco.editor.IModelContentChangedEvent;

        act(() => handler?.('first edit', event));
        act(() => jest.advanceTimersByTime(199));
        expect(onChange).not.toHaveBeenCalled();

        act(() => handler?.('latest edit', event));
        act(() => jest.advanceTimersByTime(199));
        expect(onChange).not.toHaveBeenCalled();
        act(() => jest.advanceTimersByTime(1));
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith('latest edit');
    });
});
