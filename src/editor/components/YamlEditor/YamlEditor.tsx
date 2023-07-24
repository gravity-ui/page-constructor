import React from 'react';

import yaml from 'js-yaml';
import MonacoEditor from 'react-monaco-editor';

import {PageContent} from '../../../models';

interface YamlEditorProps {
    content: PageContent;
}

export const YamlEditor = ({content}: YamlEditorProps) => (
    <MonacoEditor
        value={yaml.dump(content)}
        language="yaml"
        options={{
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
        }}
    />
);
