import React, {Fragment, PropsWithChildren, useLayoutEffect, useRef} from 'react';

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

const DevicePreviewMobile = ({mode}: DevicePreviewMobileProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const documentCSS = useDocumentCSS();

    useLayoutEffect(() => {
        if(iframeRef?.current) {
            ref?.current?.removeChild(iframeRef.current);
            iframeRef.current = null;
        }
    
        if (documentCSS && ref?.current) {
            const iframe = document.createElement('iframe');
            iframe.className = b('frame', {mode});
            ref.current?.appendChild(iframe);
            iframeRef.current = iframe;
        
            if(iframe.contentWindow?.document) {
                const frameDoc = iframe.contentWindow?.document;
                const head = frameDoc?.getElementsByTagName('head')[0];
                const style = frameDoc?.createElement('style');
                const parentBodyClass = document.body.classList;

                iframe.contentWindow.__name = 'test';
                iframe.contentWindow.__DATA__ = JSON.stringify({test: 'test'})

                const root = frameDoc.createElement('div');
                root.setAttribute('id', 'page_root');
                frameDoc.body.appendChild(root);
        
                frameDoc.body.classList.add(...parentBodyClass, b('frame'));
        
                [...document.scripts].forEach(({src}) => {
                    if (src) {
                        const script = frameDoc.createElement('script');
                        script.src = src;
                        head.appendChild(script);
                    }
                });
    
                style.setAttribute('type', 'text/css');
                style.appendChild(document.createTextNode(documentCSS));
                head.appendChild(style);
            }    
        }
    }, [documentCSS, ref?.current, mode]);

    return <div className={b()} ref={ref}/>;
};

const DevicePreview = ({children, mode}: PropsWithChildren<DevicePreviewProps>) => {
    if (mode === ViewModeItem.Desktop) {
        return <Fragment>{children}</Fragment>;
    }

    return <DevicePreviewMobile mode={mode}>{children}</DevicePreviewMobile>;
};

export default DevicePreview;
