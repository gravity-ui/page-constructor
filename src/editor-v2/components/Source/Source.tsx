import React, {useCallback, useContext} from 'react';

import {ArrowRotateRight} from '@gravity-ui/icons';
import {Button, Icon, TextInput} from '@gravity-ui/uikit';

import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import {useEditorStore} from '../../context/editorContext';
import {IframeContext, useIframeStore} from '../../context/iframeContext';

import './Source.scss';

const b = block('source');

interface SourceProps extends ClassNameProps {}

const Source: React.FC<SourceProps> = ({className}) => {
    const {url, setUrl} = useIframeStore();
    const {resetInitialize} = useEditorStore();
    const {disableUrlField} = useContext(IframeContext);

    const onUpdateUrl = useCallback(
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
        <div className={b(null, className)}>
            <Button view="flat" size="m" onClick={reloadIframe}>
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
