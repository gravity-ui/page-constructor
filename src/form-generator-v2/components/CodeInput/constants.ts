import {editor} from 'monaco-editor';
import {monaco} from 'react-monaco-editor';

export const options: monaco.editor.IStandaloneEditorConstructionOptions = {
    wordWrap: 'on' as editor.IEditorOptions['wordWrap'],
    renderLineHighlight: 'none' as editor.IEditorOptions['renderLineHighlight'],
    selectOnLineNumbers: true,
    renderWhitespace: 'none',
    automaticLayout: true,
    minimap: {
        enabled: false,
    },
    overviewRulerLanes: 0,
    hideCursorInOverviewRuler: true,
    scrollbar: {
        vertical: 'auto',
    },
    overviewRulerBorder: false,
    readOnly: false,
};
