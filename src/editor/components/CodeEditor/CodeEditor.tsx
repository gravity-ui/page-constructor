import React, {useCallback, useMemo, useState} from 'react';

import {ChevronsCollapseUpRight, ChevronsExpandUpRight} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';
import yaml from 'js-yaml';
import MonacoEditor from 'react-monaco-editor';

import {PageContent} from '../../../models';
import {block} from '../../../utils';
import {parseCode} from '../../utils/code';
import {CodeEditorMessageProps} from '../../utils/validation';

import {options} from './constants';

import './CodeEditor.scss';

const b = block('code-editor');

interface CodeEditorProps {
    content: PageContent;
    fullscreenModeOn: boolean;
    validator: (code: string) => CodeEditorMessageProps;
    onFullscreenModeOnUpdate: (fullscreenModeOn: boolean) => void;
    onChange: (content: PageContent) => void;
    message?: CodeEditorMessageProps;
}

export const CodeEditor = ({
    content,
    onChange,
    validator,
    fullscreenModeOn,
    onFullscreenModeOnUpdate,
}: CodeEditorProps) => {
    const value = useMemo(() => yaml.dump(content), [content]);
    const [message, setMessage] = useState(() => validator(value));

    const onChangeWithValidation = useCallback(
        (code: string) => {
            const validationResult = validator(code);

            setMessage(validationResult);
            onChange(parseCode(code));
        },
        [onChange, validator],
    );

    return (
        <div className={b({fullscreen: fullscreenModeOn})}>
            <div className={b('header')}>
                <Button
                    view="flat-secondary"
                    onClick={() => onFullscreenModeOnUpdate(!fullscreenModeOn)}
                >
                    <Icon
                        data={fullscreenModeOn ? ChevronsCollapseUpRight : ChevronsExpandUpRight}
                        size={16}
                    />
                </Button>
            </div>
            <div className={b('code')}>
                <MonacoEditor
                    key={String(fullscreenModeOn)}
                    value={value}
                    language="yaml"
                    options={options}
                    onChange={onChangeWithValidation}
                    theme="vs"
                />
            </div>
            <div className={b('footer')}>
                {message && (
                    <div className={b('message-container')}>
                        <div className={b('message', {status: message.status})}>{message.text}</div>
                    </div>
                )}
            </div>
        </div>
    );
};
