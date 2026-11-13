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
