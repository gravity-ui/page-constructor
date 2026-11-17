import {MarkdownEditorInput} from '../../../components/MarkdownEditorInput/MarkdownEditorInput';
import type {ClassNameProps} from '../../../models/common';
import type {CommonProps, MarkdownEditorField} from '../../types';
import {formGeneratorCn} from '../../utils/cn';
import {getValueByPath} from '../../utils/fields';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';

import './MarkdownEditor.scss';

const b = formGeneratorCn('markdown-editor');

type MarkdownEditorProps = CommonProps & MarkdownEditorField & ClassNameProps;

const MarkdownEditor = ({
    when,
    title,
    content,
    name,
    onUpdate,
    defaultValue,
    placeholder,
    className,
}: MarkdownEditorProps) => {
    const value = getValueByPath(content, name) ?? defaultValue ?? '';

    return (
        <Base
            when={when}
            content={content}
            name={name}
            onUpdate={onUpdate}
            defaultValue={defaultValue}
        >
            <BaseInput title={title} className={b(null, className)}>
                <MarkdownEditorInput
                    key={name}
                    value={value}
                    onUpdate={(next) => onUpdate(name, next)}
                    placeholder={placeholder}
                />
            </BaseInput>
        </Base>
    );
};

export default MarkdownEditor;
