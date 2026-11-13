import * as React from 'react';

import {CodeField, CommonProps} from '../../types';
import {formGeneratorCn} from '../../utils/cn';
import {getValueByPath} from '../../utils/fields';
import Base from '../Base/Base';
import BaseInput from '../BaseInput/BaseInput';

import type {CodeDiagnostic} from './MonacoCodeEditor';

import './CodeInput.scss';

const b = formGeneratorCn('code-input');

const DEFAULT_HEIGHT = 220;

// Loaded lazily so that `react-monaco-editor` (and Monaco itself) is not pulled into
// the eager module graph of `form-generator-v2` / `form-builder-v2` consumers that
// never use a code field, and so it doesn't break test environments that don't
// transform Monaco's ESM sources.
const MonacoCodeEditor = React.lazy(() => import('./MonacoCodeEditor'));

type CodeInputProps = CommonProps & CodeField;

const CodeInput = ({
    when,
    title,
    content,
    name,
    onUpdate,
    defaultValue,
    language = 'yaml',
    height = DEFAULT_HEIGHT,
    validate,
}: CodeInputProps) => {
    const value = (getValueByPath(content, name) ?? defaultValue ?? '') as string;
    const validationMessage = React.useMemo(() => validate?.(value), [validate, value]);
    const [diagnostics, setDiagnostics] = React.useState<CodeDiagnostic[]>([]);

    const handleChange = React.useCallback(
        (newValue: string) => onUpdate(name, newValue),
        [onUpdate, name],
    );

    return (
        <Base
            when={when}
            content={content}
            name={name}
            onUpdate={onUpdate}
            defaultValue={defaultValue}
        >
            <BaseInput title={title}>
                <div className={b()}>
                    <React.Suspense
                        fallback={
                            <div className={b('loading')} style={{height}}>
                                Loading editor…
                            </div>
                        }
                    >
                        <MonacoCodeEditor
                            value={value}
                            language={language}
                            height={height}
                            onChange={handleChange}
                            onValidate={setDiagnostics}
                        />
                    </React.Suspense>
                    <div className={b('footer')}>
                        {(diagnostics.length > 0 || validationMessage) && (
                            <div className={b('validation-message')} role="alert">
                                {diagnostics.map(({message, severity, line, column}, index) => (
                                    <div key={index} className={b('message', {status: severity})}>
                                        {`${line}:${column}: ${message}`}
                                    </div>
                                ))}
                                {validationMessage && (
                                    <div className={b('message', {status: 'error'})}>
                                        {validationMessage}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </BaseInput>
        </Base>
    );
};

export default CodeInput;
