import {ArrowRotateRight} from '@gravity-ui/icons';
import {Button, Icon, TextInput} from '@gravity-ui/uikit';
import * as React from 'react';

import {IframeContext} from '../../context/iframeContext';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {editorCn} from '../../utils/cn';

import './Source.scss';

const b = editorCn('source');

const Source = () => {
    const {resetInitialize} = useMainEditorStore();
    const {disableUrlField, url, setUrl} = React.useContext(IframeContext);

    const onUpdateUrl = React.useCallback(
        (value: string) => {
            setUrl(value);
            resetInitialize();
        },
        [resetInitialize, setUrl],
    );

    const reloadIframe = () => {
        setUrl('');
        setTimeout(() => {
            setUrl(url);
        }, 0);
    };

    return (
        <div className={b()}>
            <Button className={b('icon')} view="flat" size="m" onClick={reloadIframe}>
                <Icon data={ArrowRotateRight} size={18} />
            </Button>
            <TextInput
                disabled={disableUrlField}
                className={b('text')}
                size="s"
                value={url}
                onUpdate={onUpdateUrl}
            />
        </div>
    );
};

export default Source;
