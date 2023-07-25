import React, {useMemo} from 'react';

import yaml from 'js-yaml';
import MonacoEditor from 'react-monaco-editor';

import {PageContent} from '../../../models';

interface YamlEditorProps {
    content: PageContent;
}

export const YamlEditor = ({content}: YamlEditorProps) => {
    const value = useMemo(() => {
        return yaml.dump(content);
    }, [content]);

    const options = useMemo(() => {
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

    return <MonacoEditor value={value} language="yaml" options={options} />;
};
