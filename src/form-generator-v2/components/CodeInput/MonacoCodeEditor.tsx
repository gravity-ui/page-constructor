import * as React from 'react';

import debounce from 'lodash/debounce';
import MonacoEditor, {monaco} from 'react-monaco-editor';

import {CodeLanguage} from '../../types';

import {options as monacoOptions} from './constants';
import {validateYaml} from './yamlValidation';

const YAML_MARKER_OWNER = 'page-constructor-yaml';

export interface CodeDiagnostic {
    message: string;
    severity: 'error' | 'warning';
    line: number;
    column: number;
}

interface EditorInstance {
    editor: monaco.editor.IStandaloneCodeEditor;
    monaco: typeof monaco;
}

interface MonacoCodeEditorProps {
    value: string;
    language?: CodeLanguage;
    height: number;
    onChange: (value: string) => void;
    onValidate: (diagnostics: CodeDiagnostic[]) => void;
}

const MonacoCodeEditor = ({
    value,
    language = 'yaml',
    height,
    onChange,
    onValidate,
}: MonacoCodeEditorProps) => {
    const [instance, setInstance] = React.useState<EditorInstance>();
    const onChangeDebounced = React.useMemo(() => debounce(onChange, 200), [onChange]);

    React.useEffect(() => () => onChangeDebounced.cancel(), [onChangeDebounced]);

    const handleEditorDidMount = React.useCallback(
        (editor: monaco.editor.IStandaloneCodeEditor, monacoInstance: typeof monaco) => {
            setInstance({editor, monaco: monacoInstance});
        },
        [],
    );

    React.useEffect(() => {
        if (!instance) return undefined;

        const {editor, monaco: monacoInstance} = instance;
        const updateDiagnostics = () => {
            const model = editor.getModel();
            if (!model) {
                onValidate([]);
                return;
            }

            const diagnostics = monacoInstance.editor
                .getModelMarkers({resource: model.uri})
                .filter(({severity}) => severity >= monacoInstance.MarkerSeverity.Warning)
                .sort(
                    (a, b) =>
                        a.startLineNumber - b.startLineNumber || a.startColumn - b.startColumn,
                )
                .map(
                    ({message, severity, startLineNumber, startColumn}): CodeDiagnostic => ({
                        message,
                        severity:
                            severity === monacoInstance.MarkerSeverity.Error ? 'error' : 'warning',
                        line: startLineNumber,
                        column: startColumn,
                    }),
                );
            onValidate(diagnostics);
        };

        const markerSubscription = monacoInstance.editor.onDidChangeMarkers((resources) => {
            const model = editor.getModel();
            if (
                model &&
                resources.some((resource) => resource.toString() === model.uri.toString())
            ) {
                updateDiagnostics();
            }
        });
        const modelSubscription = editor.onDidChangeModel(updateDiagnostics);
        updateDiagnostics();

        return () => {
            markerSubscription.dispose();
            modelSubscription.dispose();
        };
    }, [instance, onValidate]);

    React.useEffect(() => {
        if (!instance || language !== 'yaml') return undefined;

        const {editor, monaco: monacoInstance} = instance;
        const model = editor.getModel();
        if (!model) return undefined;

        monacoInstance.editor.setModelMarkers(
            model,
            YAML_MARKER_OWNER,
            validateYaml(value).map(({message, line, column}) => ({
                message,
                severity: monacoInstance.MarkerSeverity.Error,
                startLineNumber: line,
                startColumn: column,
                endLineNumber: line,
                endColumn: column,
            })),
        );

        return () => {
            if (!model.isDisposed()) {
                monacoInstance.editor.setModelMarkers(model, YAML_MARKER_OWNER, []);
            }
        };
    }, [instance, language, value]);

    return (
        <MonacoEditor
            value={value}
            language={language}
            options={monacoOptions}
            onChange={onChangeDebounced}
            editorDidMount={handleEditorDidMount}
            theme="vs"
            width="100%"
            height={height}
        />
    );
};

export default MonacoCodeEditor;
