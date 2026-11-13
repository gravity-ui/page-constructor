import * as React from 'react';

import {CodeFieldSettings} from '../../../../form-builder-v2/components/FieldSettings/fields/CodeFieldSettings';
import {CodeLanguage, Content} from '../../../types';
import CodeInput from '../CodeInput';

export const ValidatedCodeInput = () => {
    const [content, setContent] = React.useState<Content>({config: 'invalid'});

    return (
        <div style={{width: 500}}>
            <CodeInput
                type="codeInput"
                title="Configuration"
                name="config"
                content={content}
                onUpdate={(name, value) => setContent((previous) => ({...previous, [name]: value}))}
                validate={(code) => (code === 'valid' ? undefined : 'Invalid configuration')}
            />
        </div>
    );
};

export const CodeLanguageSettings = () => (
    <CodeFieldSettings
        field={{id: 'code', type: 'codeInput', title: 'Code', name: 'code'}}
        updateField={() => {}}
        commonRows={null}
        whenEditorSection={null}
    />
);

export const JsonDiagnosticInputs = () => {
    const [ready, setReady] = React.useState(false);
    const [content, setContent] = React.useState<Content>({
        first: '{"enabled": }',
        second: '{"count": 1}',
    });

    React.useEffect(() => {
        // Match Storybook's MonacoWebpackPlugin worker support in the Vite test host.
        self.MonacoEnvironment = {
            getWorker: (_id, label) => {
                if (label === 'json') {
                    return new Worker(
                        new URL(
                            '../../../../../node_modules/monaco-editor/esm/vs/language/json/json.worker.js',
                            import.meta.url,
                        ),
                        {type: 'module'},
                    );
                }
                return new Worker(
                    new URL(
                        '../../../../../node_modules/monaco-editor/esm/vs/editor/editor.worker.js',
                        import.meta.url,
                    ),
                    {type: 'module'},
                );
            },
        };
        import('monaco-editor/esm/vs/language/json/monaco.contribution').then(() => setReady(true));
    }, []);

    if (!ready) return null;

    return (
        <div style={{width: 500}}>
            {['first', 'second'].map((name) => (
                <CodeInput
                    key={name}
                    type="codeInput"
                    name={name}
                    title={name}
                    language="json"
                    content={content}
                    onUpdate={(key, value) =>
                        setContent((previous) => ({...previous, [key]: value}))
                    }
                    validate={name === 'first' ? () => 'Custom rule' : undefined}
                />
            ))}
        </div>
    );
};

export const YamlDiagnosticInputs = () => {
    const [content, setContent] = React.useState<Content>({
        first: 'title: Пример\nitems: [one, two',
        second: 'title: Другой',
    });
    const [language, setLanguage] = React.useState<CodeLanguage>();

    return (
        <div style={{width: 500}}>
            <button
                type="button"
                onClick={() => setLanguage((previous) => (previous === 'json' ? 'yaml' : 'json'))}
            >
                Switch language
            </button>
            {['first', 'second'].map((name) => (
                <CodeInput
                    key={name}
                    type="codeInput"
                    name={name}
                    title={name}
                    language={language}
                    content={content}
                    onUpdate={(key, value) =>
                        setContent((previous) => ({...previous, [key]: value}))
                    }
                />
            ))}
        </div>
    );
};
