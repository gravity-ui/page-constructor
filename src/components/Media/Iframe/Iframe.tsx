import React, {useCallback, useEffect, useRef} from 'react';

import {v4 as uuidv4} from 'uuid';

import {MediaComponentIframeProps} from '../../../models';
import {block} from '../../../utils';

import i18n from './i18n';

import './Iframe.scss';

const b = block('media-component-iframe');

const Iframe = (props: MediaComponentIframeProps) => {
    const {iframe, margins = true} = props;
    const {height = 400, src, width = '100%', name, title, justifyContent = 'center'} = iframe;

    const formContainerRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>();
    const {current: iframeId} = useRef(uuidv4());

    const updateIframe = useCallback(
        (container: HTMLDivElement) => {
            if (iframeRef.current) {
                iframeRef.current.src = src;
            } else {
                const iframeWidth = typeof width === 'number' ? `${width}px` : width;
                let iframeHeight: string | number | undefined =
                    typeof height === 'number' ? `${height}px` : height;

                if (height === 'auto') {
                    iframeHeight = undefined;
                }

                iframeRef.current = document.createElement('iframe');
                iframeRef.current.src = src;
                iframeRef.current.id = iframeId;
                iframeRef.current.name = name || iframeId;
                iframeRef.current.setAttribute('loading', 'lazy');
                iframeRef.current.setAttribute('title', title || i18n('iframe-title'));
                iframeRef.current.frameBorder = '0';
                iframeRef.current.scrolling = 'no';
                iframeRef.current.width = iframeWidth;
                iframeRef.current.style.width = iframeWidth;
                if (iframeHeight) {
                    iframeRef.current.style.height = iframeHeight;
                }

                container.appendChild(iframeRef.current);
            }
        },
        [src, width, iframeId, name, title, height],
    );

    const handleMessage = useCallback(
        ({data}: MessageEvent) => {
            if (height !== 'auto' && typeof height === 'number' && iframeRef.current) {
                iframeRef.current.height = `${height}px`;
                return;
            }

            try {
                const parsed = JSON.parse(data);
                const iframeHeight = parsed['iframe-height'];
                const {message, name: iframeName} = parsed;
                if (iframeName !== name && iframeName !== iframeId) {
                    return;
                }

                if (iframeRef.current && iframeHeight && !message) {
                    iframeRef.current.height = `${iframeHeight}px`;
                }
            } catch (error) {
                return;
            }
        },
        [height, iframeId, name],
    );

    const addIframe = useCallback(() => {
        const container = formContainerRef.current;

        if (container) {
            updateIframe(container);
            window.addEventListener('message', handleMessage, {passive: true});
        }
    }, [updateIframe, handleMessage]);

    useEffect(() => {
        addIframe();

        return () => window.removeEventListener('message', handleMessage);
    }, [addIframe, handleMessage]);

    return iframe ? (
        <div
            className={b({margins})}
            ref={formContainerRef}
            style={{height, textAlign: justifyContent}}
        />
    ) : null;
};

export default Iframe;
