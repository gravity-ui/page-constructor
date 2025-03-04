import {Loader} from '@gravity-ui/uikit';
import React, {ElementType, useCallback, useContext, useState} from 'react';

import {usePostMessageAPIListener} from '../../../common/postMessage';
import {IframeContext} from '../../context/iframeContext';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {editorCn} from '../../utils/cn';
import Overlay from '../Overlay/Overlay';

import './MiddleScreen.scss';

const b = editorCn('middle-screen');

interface MiddleScreenProps {
    className?: string;
    CustomTop?: ElementType;
}

const MiddleScreen = ({className, CustomTop}: MiddleScreenProps) => {
    const {zoom, initialized} = useMainEditorStore();
    const {url, setIframeElement} = useContext(IframeContext);
    const [height, setHeight] = useState(0);

    const onResize = useCallback(
        (newHeight: number) => {
            setHeight(newHeight + 500);
        },
        [setHeight],
    );

    usePostMessageAPIListener('ON_RESIZE', ({height: newHeight}) => {
        onResize(newHeight);
    });

    usePostMessageAPIListener('ON_INIT', ({height: newHeight}) => {
        onResize(newHeight);
    });

    return (
        <div className={b(null, className)}>
            {CustomTop ? (
                <div className={b('topbar')}>
                    <CustomTop />
                </div>
            ) : null}
            <div className={b('wrapper')}>
                <div
                    className={b('canvas', {hidden: !initialized})}
                    style={{
                        transform: `scale(${zoom}%)`,
                        height: `${(100 / zoom) * 100}%`,
                        width: `${(100 / zoom) * 100}%`,
                    }}
                >
                    <iframe
                        ref={(instance) => instance && setIframeElement(instance)}
                        className={b('iframe')}
                        src={url}
                        height={`${height}px`}
                        width="100%"
                        frameBorder="0"
                        title="Page Constructor Iframe"
                    />
                    <Overlay className={b('overlay')} />
                    {!initialized && (
                        <div className={b('loading')}>
                            <Loader size={'l'} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MiddleScreen;
