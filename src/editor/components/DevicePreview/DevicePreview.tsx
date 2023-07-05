import React, {Fragment, PropsWithChildren, useLayoutEffect, useState} from 'react';

import {createPortal} from 'react-dom';

import {block} from '../../../utils';
import {useDocumentCSS} from '../../hooks/useDocumentCSS';
import {ViewModeItem} from '../../types';

import './DevicePreview.scss';

const b = block('device-preview');

export interface DevicePreviewProps {
    mode: Exclude<ViewModeItem, ViewModeItem.Edititng>;
}

interface DevicePreviewMobileProps extends PropsWithChildren {
    mode: Extract<ViewModeItem, ViewModeItem.Mobile | ViewModeItem.Tablet>;
}

const DevicePreviewMobile = ({children, mode}: DevicePreviewMobileProps) => {
    const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
    const mountNode = contentRef?.contentWindow?.document?.body;
    const documentCSS = useDocumentCSS();

    useLayoutEffect(() => {
        if (documentCSS && contentRef?.contentWindow?.document) {
            const frame = contentRef.contentWindow.document;
            const head = frame.getElementsByTagName('head')[0];
            const style = frame.createElement('style');
            const parentBodyClass = document.body.classList;

            frame.body.classList.add(...parentBodyClass, b('frame'));

            style.setAttribute('type', 'text/css');
            style.appendChild(document.createTextNode(documentCSS));
            head.appendChild(style);
        }
    }, [documentCSS, contentRef]);

    return (
        <div className={b()}>
            <iframe ref={setContentRef} className={b('frame', {mode})}>
                {mountNode &&
                    createPortal(<div className={b('container')}>{children}</div>, mountNode)}
            </iframe>
        </div>
    );
};

const DevicePreview = ({children, mode}: PropsWithChildren<DevicePreviewProps>) => {
    if (mode === ViewModeItem.Desktop) {
        return <Fragment>{children}</Fragment>;
    }

    return <DevicePreviewMobile mode={mode}>{children}</DevicePreviewMobile>;
};

export default DevicePreview;
