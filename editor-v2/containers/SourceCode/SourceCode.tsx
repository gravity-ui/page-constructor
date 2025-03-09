import yaml from 'js-yaml';
import React from 'react';

import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {editorCn} from '../../utils/cn';

import './SourceCode.scss';

const b = editorCn('source-code');

interface SourceCodeProps {
    className?: string;
    format: 'yaml' | 'json';
}

const SourceCode = ({className, format}: SourceCodeProps) => {
    const {content} = useMainEditorStore();

    const text = format === 'yaml' ? yaml.dump(content) : JSON.stringify(content, null, 2);

    return (
        <div className={b(null, className)}>
            <div className={b('title')}>{format}</div>
            <div className={b('code')}>{text}</div>
        </div>
    );
};

export default SourceCode;
