import * as React from 'react';

import {
    MarkdownEditorView,
    configure as configureMarkdownEditor,
    useMarkdownEditor,
} from '@gravity-ui/markdown-editor';
import {Lang, Toaster, ToasterComponent, ToasterProvider} from '@gravity-ui/uikit';

import {LocaleContext} from '../../gravity-blocks/context/localeContext';
import {block} from '../../utils/cn';

import type {MarkdownEditorInputProps} from './MarkdownEditorInput';
import {safeYfmFile} from './safeYfmFile';

const b = block('markdown-editor-input');

export const MarkdownEditorInputView = ({
    value,
    onUpdate,
    placeholder,
    className,
    qa,
}: MarkdownEditorInputProps) => {
    const toasterRef = React.useRef<Toaster | null>(null);

    if (toasterRef.current === null) {
        toasterRef.current = new Toaster();
    }

    const {lang = Lang.Ru} = React.useContext(LocaleContext);
    const editor = useMarkdownEditor(
        {
            preset: 'yfm',
            md: {html: false},
            initial: {markup: value, mode: 'wysiwyg'},
            markupConfig: {placeholder},
            wysiwygConfig: {
                placeholderOptions: {value: placeholder},
                extensions: safeYfmFile,
            },
        },
        [placeholder],
    );
    const onUpdateRef = React.useRef(onUpdate);
    const valueRef = React.useRef(value);
    const replacingRef = React.useRef(false);
    onUpdateRef.current = onUpdate;

    React.useEffect(() => {
        configureMarkdownEditor({lang});
    }, [lang]);

    React.useEffect(() => {
        const handleChange = () => {
            if (replacingRef.current) return;

            const nextValue = editor.isEmpty() ? '' : editor.getValue();

            if (nextValue === valueRef.current) return;

            valueRef.current = nextValue;
            onUpdateRef.current(nextValue);
        };
        editor.on('change', handleChange);

        return () => editor.off('change', handleChange);
    }, [editor]);

    React.useEffect(() => {
        if (value === valueRef.current) return;

        valueRef.current = value;

        if (value === editor.getValue()) return;

        replacingRef.current = true;

        try {
            editor.replace(value);
        } finally {
            replacingRef.current = false;
        }
    }, [editor, value]);

    return (
        <div className={b(null, className)}>
            <ToasterProvider toaster={toasterRef.current}>
                <MarkdownEditorView
                    editor={editor}
                    stickyToolbar={false}
                    settingsVisible={['mode']}
                    qa={qa}
                />
                <ToasterComponent />
            </ToasterProvider>
        </div>
    );
};
