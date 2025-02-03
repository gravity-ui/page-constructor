import {useCallback, useContext, useState} from 'react';
import {ChevronsCollapseUpRight, ChevronsExpandUpRight} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';
import debounce from 'lodash/debounce';
import MonacoEditor from 'react-monaco-editor';

import {PageContent, Theme} from '../../../models';
import {block} from '../../../utils';
import {EditorContext} from '../../context';
import {parseCode} from '../../utils/code';
import {CodeEditorMessageProps} from '../../utils/validation';

import {options} from './constants';

import './CodeEditor.scss';

const b = block('code-editor');

interface CodeEditorProps {
    code: string;
    fullscreenModeOn: boolean;
    validator: (code: string) => CodeEditorMessageProps;
    onFullscreenModeOnUpdate: (fullscreenModeOn: boolean) => void;
    onChange: (content: PageContent) => void;
    message?: CodeEditorMessageProps;
}

export const CodeEditor = ({
    onChange,
    validator,
    fullscreenModeOn,
    onFullscreenModeOnUpdate,
    code,
}: CodeEditorProps) => {
    const [message, setMessage] = useState(() => validator(code));
    const {theme = Theme.Light} = useContext(EditorContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onChangeWithValidation = useCallback(
        debounce((newCode: string) => {
            const validationResult = validator(newCode);

            setMessage(validationResult);
            onChange(parseCode(newCode));
        }, 200),
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
                    value={code}
                    language="yaml"
                    options={options}
                    onChange={onChangeWithValidation}
                    theme={theme === Theme.Dark ? 'vs-dark' : 'vs'}
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
