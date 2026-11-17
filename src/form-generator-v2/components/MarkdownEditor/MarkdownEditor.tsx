import * as React from 'react';

import {TextArea} from '@gravity-ui/uikit';

import type {CommonProps, MarkdownEditorField} from '../../types';
import {formGeneratorCn} from '../../utils/cn';
import {getValueByPath} from '../../utils/fields';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';

import './MarkdownEditor.scss';

const b = formGeneratorCn('markdown-editor');
const MarkdownEditorControl = React.lazy(() =>
    import('./MarkdownEditorControl').then((module) => ({
        default: module.MarkdownEditorControl,
    })),
);

export type MarkdownEditorControlProps = {
    value: string;
    onChange: (value: string) => void;
    name: string;
    title: string;
    placeholder?: string;
};

class EditorErrorBoundary extends React.Component<
    {children: React.ReactNode; fallback: React.ReactNode},
    {failed: boolean}
> {
    static getDerivedStateFromError() {
        return {failed: true};
    }

    state = {failed: false};

    render() {
        return this.state.failed ? this.props.fallback : this.props.children;
    }
}

const Editor = (props: MarkdownEditorControlProps) => {
    const fallback = (
        <TextArea
            value={props.value}
            onUpdate={props.onChange}
            name={props.name}
            minRows={5}
            placeholder={props.placeholder}
            controlProps={{'aria-label': props.title}}
        />
    );

    return (
        <div className={b()}>
            <EditorErrorBoundary fallback={fallback}>
                <React.Suspense fallback={fallback}>
                    <MarkdownEditorControl {...props} />
                </React.Suspense>
            </EditorErrorBoundary>
        </div>
    );
};

const MarkdownEditor = ({
    when,
    title,
    content,
    name,
    onUpdate,
    defaultValue,
    placeholder,
}: CommonProps & MarkdownEditorField) => {
    const value = getValueByPath(content, name) ?? defaultValue ?? '';

    return (
        <Base
            when={when}
            content={content}
            name={name}
            onUpdate={onUpdate}
            defaultValue={defaultValue}
        >
            <BaseInput title={title}>
                <Editor
                    key={name}
                    value={typeof value === 'string' ? value : ''}
                    onChange={(next) => onUpdate(name, next)}
                    name={name}
                    title={title}
                    placeholder={placeholder}
                />
            </BaseInput>
        </Base>
    );
};

export default MarkdownEditor;
