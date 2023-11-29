import React, {useCallback, useMemo, useState} from 'react';

import {ChevronsCollapseUpRight, ChevronsExpandUpRight} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';
import yaml from 'js-yaml';
import MonacoEditor from 'react-monaco-editor';

import {PageContent} from '../../../models';
import {block} from '../../../utils';
import {CodeEditorMessageProps} from '../../utils/validation';

import {options} from './constants';

import './CodeEditor.scss';

const b = block('code-editor');

interface CodeEditorProps {
    content: PageContent;
    validator: (code: string) => CodeEditorMessageProps;
    onChange: (content: PageContent) => void;
    message?: CodeEditorMessageProps;
}

export const CodeEditor = ({content, onChange, validator}: CodeEditorProps) => {
    const [fullscreen, setFullscreen] = useState(false);
    const value = useMemo(() => yaml.dump(content), [content]);
    const [message, setMessage] = useState(() => validator(value));

    const onChangeWithValidation = useCallback(
        (code: string) => {
            const validationResult = validator(code);

            setMessage(validationResult);
            onChange(yaml.load(code) as PageContent);
        },
        [onChange, validator],
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
                    key={String(fullscreen)}
                    value={value}
                    language="yaml"
                    options={options}
                    onChange={onChangeWithValidation}
                    theme="vs"
                />
            </div>
            <div className={b('bottom')}>
                {message && (
                    <div className={b('bottom-info')}>
                        <div className={b('message', {status: message.status})}>{message.text}</div>
                    </div>
                )}
            </div>
        </div>
    );
};
