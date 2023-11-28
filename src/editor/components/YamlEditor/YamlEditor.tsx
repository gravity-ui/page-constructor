import React, {useCallback, useMemo, useState} from 'react';

import {ChevronsCollapseUpRight, ChevronsExpandUpRight} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';
import yaml from 'js-yaml';
import {editor} from 'monaco-editor';
import MonacoEditor, {monaco} from 'react-monaco-editor';

import {PageContent} from '../../../models';
import {block} from '../../../utils';

import './YamlEditor.scss';

const b = block('yaml-editor');

interface YamlEditorProps {
    content: PageContent;
    onChange: (content: PageContent) => void;
}

const options: monaco.editor.IStandaloneEditorConstructionOptions = {
    wordWrap: 'on' as editor.IEditorOptions['wordWrap'],
    renderLineHighlight: 'none' as editor.IEditorOptions['renderLineHighlight'],
    selectOnLineNumbers: true,
    renderWhitespace: 'all',
    automaticLayout: true,
    minimap: {
        enabled: false,
    },
    overviewRulerLanes: 0,
    hideCursorInOverviewRuler: true,
    scrollbar: {
        vertical: 'hidden',
    },
    overviewRulerBorder: false,
    readOnly: false,
};

export const YamlEditor = ({content, onChange}: YamlEditorProps) => {
    const [fullscreen, setFullscreen] = useState(false);

    const value = useMemo(() => {
        return yaml.dump(content);
    }, [content]);

    const onChangeParsed = useCallback(
        (code: string) => {
            onChange(yaml.load(code) as PageContent);
        },
        [onChange],
    );

    return (
        <div className={b({fullscreen})}>
            <div className={b('head')}>
                <Button
                    view="flat-secondary"
                    className={b('button')}
                    onClick={() => setFullscreen(!fullscreen)}
                >
                    <Icon
                        data={fullscreen ? ChevronsCollapseUpRight : ChevronsExpandUpRight}
                        size={16}
                    />
                </Button>
            </div>
            <div className={b('editor')}>
                <MonacoEditor
                    value={value}
                    language="yaml"
                    options={options}
                    onChange={onChangeParsed}
                    theme="vs"
                />
            </div>
            {/* <ClipboardButton className={b('copy-button')} text={value} /> */}
        </div>
    );
};
