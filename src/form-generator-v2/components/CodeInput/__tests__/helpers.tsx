import * as React from 'react';

import {ThemeProvider} from '@gravity-ui/uikit';

import {CodeFieldSettings} from '../../../../form-builder-v2/components/FieldSettings/fields/CodeFieldSettings';
import FormGenerator from '../../../FormGenerator';
import {CodeLanguage, Content} from '../../../types';
import CodeInput from '../CodeInput';

export const SwitchingCodeInput = ({switchBlock = false}: {switchBlock?: boolean}) => {
    const [selected, setSelected] = React.useState<'first' | 'second'>('first');
    const [content, setContent] = React.useState({first: 'first value', second: 'second value'});

    return (
        <div style={{width: 500}}>
            <button
                type="button"
                onClick={() =>
                    setSelected((previous) => (previous === 'first' ? 'second' : 'first'))
                }
            >
                Switch target
            </button>
            <FormGenerator
                blockConfig={[
                    {type: 'codeInput', name: switchBlock ? 'config' : selected, title: 'Code'},
                ]}
                contentConfig={switchBlock ? {config: content[selected]} : content}
                onUpdateByKey={(name, value) =>
                    setContent((previous) => ({
                        ...previous,
                        [switchBlock ? selected : name]: value as string,
                    }))
                }
            />
            <pre data-qa="saved-content">{JSON.stringify(content)}</pre>
        </div>
    );
};

export const ThemedCodeInputs = () => {
    const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');
    const [showSecond, setShowSecond] = React.useState(false);

    return (
        <ThemeProvider theme={theme}>
            <div style={{width: 500}}>
                <button
                    type="button"
                    onClick={() => setTheme((previous) => (previous === 'dark' ? 'light' : 'dark'))}
                >
                    Switch theme
                </button>
                <button type="button" onClick={() => setShowSecond(true)}>
                    Add editor
                </button>
                {(showSecond ? ['first', 'second'] : ['first']).map((name) => (
                    <CodeInput
                        key={name}
                        type="codeInput"
                        name={name}
                        title={name}
                        content={{first: 'title: first', second: 'title: second'}}
                        onUpdate={() => {}}
                    />
                ))}
            </div>
        </ThemeProvider>
    );
};

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
