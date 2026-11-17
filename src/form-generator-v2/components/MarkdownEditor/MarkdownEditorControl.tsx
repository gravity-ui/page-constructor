import * as React from 'react';

import {MarkdownEditorView, configure, useMarkdownEditor} from '@gravity-ui/markdown-editor';
import {EditorView} from '@gravity-ui/markdown-editor/cm/view';
import {Lang, Text, Toaster, ToasterComponent, ToasterProvider, useLang} from '@gravity-ui/uikit';

import {formGeneratorCn} from '../../utils/cn';

import type {MarkdownEditorControlProps} from './MarkdownEditor';
import {messages} from './i18n';

const b = formGeneratorCn('markdown-editor');

export const MarkdownEditorControl = ({
    value,
    onChange,
    name,
    title,
    placeholder,
}: MarkdownEditorControlProps) => {
    const {lang} = useLang();
    const editorLang = lang === Lang.Ru ? Lang.Ru : Lang.En;
    const text = messages[editorLang];
    configure({lang: editorLang});

    const [toaster] = React.useState(() => new Toaster());
    const [preserved, setPreserved] = React.useState(false);
    const currentValue = React.useRef(value);
    const synchronizing = React.useRef(false);
    const lastEditorValue = React.useRef<string>();

    const editor = useMarkdownEditor(
        {
            preset: 'full',
            initial: {markup: value, mode: 'wysiwyg'},
            md: {html: false},
            experimental: {
                preserveEmptyRows: true,
                directiveSyntax: 'enabled',
                beforeEditorModeChange: ({reason}) => {
                    if (reason === 'settings') {
                        synchronizing.current = true;
                        queueMicrotask(() => {
                            synchronizing.current = false;
                        });
                    }
                    return true;
                },
            },
            markupConfig: {
                placeholder,
                extensions: [EditorView.contentAttributes.of({'aria-label': title, name})],
            },
            wysiwygConfig: {
                placeholderOptions: {value: placeholder},
                extensionOptions: {
                    baseStyles: {
                        attributes: {'aria-label': title, name},
                    },
                },
            },
        },
        [name, title, placeholder],
    );

    const preserveSource = React.useCallback(
        (source: string) => {
            if (editor.currentMode === 'wysiwyg' && editor.getValue() !== source) {
                editor.setEditorMode('markup', {emit: false});
                editor.replace(source);
                setPreserved(true);
            } else {
                setPreserved(false);
            }
            lastEditorValue.current = editor.getValue();
        },
        [editor],
    );

    React.useEffect(() => {
        synchronizing.current = true;
        preserveSource(currentValue.current);
        synchronizing.current = false;
    }, [editor, preserveSource]);

    React.useEffect(() => {
        const handleChange = () => {
            if (synchronizing.current) return;
            const next = editor.getValue();
            if (next === lastEditorValue.current) return;
            lastEditorValue.current = next;
            currentValue.current = next;
            onChange(next);
        };
        const handleModeChange = () => {
            synchronizing.current = true;
            try {
                editor.replace(currentValue.current);
                preserveSource(currentValue.current);
            } finally {
                synchronizing.current = false;
            }
        };

        editor.on('change', handleChange);
        editor.on('change-editor-mode', handleModeChange);
        return () => {
            editor.off('change', handleChange);
            editor.off('change-editor-mode', handleModeChange);
        };
    }, [editor, onChange, preserveSource]);

    React.useEffect(() => {
        if (value === currentValue.current) return;
        synchronizing.current = true;
        currentValue.current = value;
        editor.replace(value);
        preserveSource(value);
        synchronizing.current = false;
    }, [editor, preserveSource, value]);

    return (
        <ToasterProvider toaster={toaster}>
            <div className={b('control')}>
                {preserved && (
                    <Text variant="caption-2" color="secondary" role="status">
                        {text.preserved}
                    </Text>
                )}
                <MarkdownEditorView
                    className={b('view')}
                    editor={editor}
                    settingsVisible={['mode']}
                    stickyToolbar={false}
                />
            </div>
            <ToasterComponent />
        </ToasterProvider>
    );
};

export default MarkdownEditorControl;
