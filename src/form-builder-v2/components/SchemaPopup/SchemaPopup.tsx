import * as React from 'react';

import {Button, Card, Popup, Text} from '@gravity-ui/uikit';

import type {Fields} from '../../../form-generator-v2/types';
import type {FormField} from '../../types';
import {formBuilderV2Cn} from '../../utils/cn';
import {parseSchema} from '../../utils/parseSchema';

import './SchemaPopup.scss';

const b = formBuilderV2Cn('schema-popup');

const stringify = (schema: Fields): string => JSON.stringify(schema, null, 2);

interface SchemaPopupProps {
    schema: Fields;
    onApply: (fields: FormField[]) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    anchorElement: HTMLElement | null;
}

export const SchemaPopup = ({
    schema,
    onApply,
    open,
    onOpenChange,
    anchorElement,
}: SchemaPopupProps) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const copyTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const [draft, setDraft] = React.useState<string>(() => stringify(schema));
    const [error, setError] = React.useState<string | null>(null);
    const [copied, setCopied] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
        if (!isFocused) {
            setDraft(stringify(schema));
            setError(null);
        }
    }, [schema, isFocused]);

    React.useEffect(
        () => () => {
            if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
        },
        [],
    );

    const applyDraft = (value: string) => {
        setDraft(value);
        const result = parseSchema(value);
        if (result.ok) {
            setError(null);
            onApply(result.fields);
        } else {
            setError(result.error);
        }
    };

    const replaceSelection = (insert: string, caretOffset: number) => {
        const t = textareaRef.current;
        if (!t) return;
        const {selectionStart, selectionEnd} = t;
        const next = draft.slice(0, selectionStart) + insert + draft.slice(selectionEnd);
        const nextCaret = selectionStart + caretOffset;
        applyDraft(next);
        requestAnimationFrame(() => {
            t.selectionStart = nextCaret;
            t.selectionEnd = nextCaret;
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            replaceSelection('  ', 2);
            return;
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            const t = event.currentTarget;
            const before = draft.slice(0, t.selectionStart);
            const lineStart = before.lastIndexOf('\n') + 1;
            const indent = before.slice(lineStart).match(/^[ \t]*/)?.[0] ?? '';
            const insert = `\n${indent}`;
            replaceSelection(insert, insert.length);
        }
    };

    const handleCopy = React.useCallback(async () => {
        try {
            await navigator.clipboard.writeText(draft);
            setCopied(true);
            if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
            copyTimeoutRef.current = setTimeout(() => setCopied(false), 1500);
        } catch {}
    }, [draft]);

    return (
        <Popup
            anchorElement={anchorElement}
            open={open}
            onOpenChange={onOpenChange}
            placement="bottom-end"
        >
            <Card className={b()} view="outlined">
                <div className={b('header')}>
                    <Text variant="subheader-2">Form schema</Text>
                    <Text variant="caption-1" color="hint">
                        Edit JSON directly — the canvas updates live. Paste your own schema to load
                        it. Selection on canvas resets after each edit.
                    </Text>
                </div>
                <textarea
                    ref={textareaRef}
                    className={b('textarea', {error: Boolean(error)})}
                    value={draft}
                    onChange={(event) => applyDraft(event.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    spellCheck={false}
                    wrap="off"
                />
                {error && (
                    <div className={b('error-message')}>
                        <Text variant="caption-1" color="danger">
                            {error}
                        </Text>
                    </div>
                )}
                <div className={b('actions')}>
                    <Button view="action" size="m" onClick={handleCopy}>
                        {copied ? '✓ Copied' : 'Copy'}
                    </Button>
                    <Button view="flat" size="m" onClick={() => onOpenChange(false)}>
                        Close
                    </Button>
                </div>
            </Card>
        </Popup>
    );
};
