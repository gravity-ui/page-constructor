import * as React from 'react';

import {TextArea} from '@gravity-ui/uikit';

import type {ClassNameProps, QAProps} from '../../models/common';

import {MarkdownEditorInputView} from './MarkdownEditorInputView';

import './MarkdownEditorInput.scss';

export interface MarkdownEditorInputProps extends ClassNameProps, QAProps {
    value: string;
    onUpdate: (value: string) => void;
    placeholder?: string;
}

export const MarkdownEditorInput = (props: MarkdownEditorInputProps) => {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    // Match the server markup during hydration; the editor needs the browser DOM.
    return isMounted ? <MarkdownEditorInputView {...props} /> : <TextArea {...props} minRows={3} />;
};
