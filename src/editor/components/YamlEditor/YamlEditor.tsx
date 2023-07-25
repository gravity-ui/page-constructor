import React, {useMemo} from 'react';

import {Copy} from '@gravity-ui/icons';
import {Button, Icon, Tooltip} from '@gravity-ui/uikit';
import yaml from 'js-yaml';
import MonacoEditor, {monaco} from 'react-monaco-editor';

import {PageContent} from '../../../models';
import {block} from '../../../utils';

import './YamlEditor.scss';

const b = block('yaml-editor');

interface YamlEditorProps {
    content: PageContent;
}

export const YamlEditor = ({content}: YamlEditorProps) => {
    const value = useMemo(() => {
        return yaml.dump(content);
    }, [content]);

    const options: monaco.editor.IStandaloneEditorConstructionOptions = useMemo(() => {
        return {
            minimap: {
                enabled: false,
            },
            renderWhitespace: 'all',
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            scrollbar: {
                vertical: 'hidden',
            },
            overviewRulerBorder: false,
            readOnly: true,
        };
    }, []);

    const onCopyClick = () => {
        navigator.clipboard.writeText(value);
    };

    return (
        <div className={b()}>
            <MonacoEditor value={value} language="yaml" options={options} />
            <Tooltip content={'Copy'}>
                <Button className={b('copy-button')} size="m" view="raised" onClick={onCopyClick}>
                    <Icon data={Copy} />
                </Button>
            </Tooltip>
        </div>
    );
};
