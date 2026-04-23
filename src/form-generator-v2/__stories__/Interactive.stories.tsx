import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';
import yaml from 'js-yaml';

import {useResultPanel} from '../../../.storybook/addons/result-addon/useResultPanel';
import FormGenerator from '../FormGenerator';
import {Content, Fields} from '../types';

export default {
    title: 'Interactive',
    parameters: {
        layout: 'fullscreen',
        resultPanel: true,
    },
} as Meta;

const defaultBlockConfig: Fields = [
    {
        type: 'textInput',
        name: 'title',
        title: 'Title',
    },
    {
        type: 'textArea',
        name: 'description',
        title: 'Description',
    },
    {
        type: 'select',
        name: 'layout',
        title: 'Layout',
        hasClear: true,
        options: [
            {value: 'default', content: 'Default'},
            {value: 'centered', content: 'Centered'},
            {value: 'wide', content: 'Wide'},
        ],
    },
    {
        type: 'switch',
        name: 'showExtra',
        title: 'Show extra section',
    },
    {
        type: 'section',
        title: 'Extra',
        when: [{field: 'showExtra', operator: '===', value: true}],
        fields: [
            {
                type: 'colorInput',
                name: 'extraColor',
                title: 'Color',
            },
        ],
    },
];

const toText = (config: Fields, format: 'json' | 'yaml'): string => {
    if (format === 'yaml') {
        return yaml.dump(config, {lineWidth: -1, noRefs: true});
    }
    return JSON.stringify(config, null, 2);
};

const fromText = (text: string, format: 'json' | 'yaml'): Fields => {
    if (format === 'yaml') {
        return yaml.load(text) as Fields;
    }
    return JSON.parse(text) as Fields;
};

export const InteractiveEditor: StoryFn = () => {
    const [format, setFormat] = React.useState<'json' | 'yaml'>('json');
    const [editorText, setEditorText] = React.useState(() => toText(defaultBlockConfig, 'json'));
    const [blockConfig, setBlockConfig] = React.useState<Fields>(defaultBlockConfig);
    const [parseError, setParseError] = React.useState<string | null>(null);
    const [content, setContent] = useResultPanel<Content>({});

    const handleFormatChange = (newFormat: 'json' | 'yaml') => {
        setFormat(newFormat);
        // Re-serialize current config in new format
        setEditorText(toText(blockConfig, newFormat));
        setParseError(null);
    };

    const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setEditorText(text);

        try {
            const parsed = fromText(text, format);
            if (Array.isArray(parsed)) {
                setBlockConfig(parsed);
                setParseError(null);
            } else {
                setParseError('Root value must be an array of fields.');
            }
        } catch (err) {
            setParseError(err instanceof Error ? err.message : String(err));
        }
    };

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                height: '100vh',
                fontFamily: 'var(--g-text-body-font-family, sans-serif)',
            }}
        >
            {/* Left: editor */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRight: '1px solid var(--g-color-line-generic, #e0e0e0)',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 12px',
                        borderBottom: '1px solid var(--g-color-line-generic, #e0e0e0)',
                        flexShrink: 0,
                    }}
                >
                    <strong style={{fontSize: 13}}>blockConfig</strong>
                    <div style={{marginLeft: 'auto', display: 'flex', gap: 4}}>
                        {(['json', 'yaml'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => handleFormatChange(f)}
                                style={{
                                    padding: '2px 10px',
                                    borderRadius: 4,
                                    border: '1px solid var(--g-color-line-generic, #ccc)',
                                    background:
                                        format === f
                                            ? 'var(--g-color-base-brand, #027bf3)'
                                            : 'transparent',
                                    color: format === f ? '#fff' : 'inherit',
                                    cursor: 'pointer',
                                    fontSize: 12,
                                    fontWeight: format === f ? 600 : 400,
                                }}
                            >
                                {f.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {parseError && (
                    <div
                        style={{
                            padding: '6px 12px',
                            background: 'var(--g-color-base-danger-light, #ffeaea)',
                            color: 'var(--g-color-text-danger, #cc0000)',
                            fontSize: 12,
                            borderBottom: '1px solid var(--g-color-line-danger, #ffaaaa)',
                            flexShrink: 0,
                        }}
                    >
                        {parseError}
                    </div>
                )}

                <textarea
                    value={editorText}
                    onChange={handleEditorChange}
                    spellCheck={false}
                    style={{
                        flex: 1,
                        resize: 'none',
                        border: 'none',
                        outline: 'none',
                        padding: 12,
                        fontFamily: 'monospace',
                        fontSize: 12,
                        lineHeight: 1.5,
                        background: 'var(--g-color-base-background, #fff)',
                        color: 'var(--g-color-text-primary, #000)',
                    }}
                />
            </div>

            {/* Right: live form */}
            <div style={{overflow: 'auto', padding: 16}}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: 12,
                        gap: 8,
                    }}
                >
                    <strong style={{fontSize: 13}}>Preview</strong>
                    {parseError && (
                        <span style={{fontSize: 12, color: 'var(--g-color-text-secondary, #888)'}}>
                            (showing last valid config)
                        </span>
                    )}
                </div>
                <FormGenerator
                    blockConfig={blockConfig}
                    contentConfig={content}
                    onUpdate={setContent}
                />
            </div>
        </div>
    );
};
InteractiveEditor.storyName = 'Interactive Editor';
