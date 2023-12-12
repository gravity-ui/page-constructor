import React, {useCallback, useEffect, useRef, useState} from 'react';

import {v4 as uuidv4} from 'uuid';

import {MediaComponentIframeProps} from '../../../models';
import {block} from '../../../utils';

import i18n from './i18n';

import './Iframe.scss';

const b = block('media-component-iframe');

const Iframe = (props: MediaComponentIframeProps) => {
    const {iframe, margins = true} = props;
    const {height = 400, src, width, name, title} = iframe;

    const formContainerRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>();
    const [iframeId] = useState(uuidv4());
    const [fixedHeight] = useState(typeof height === 'number');

    const updateFormIframe = useCallback(
        (container: HTMLDivElement) => {
            if (iframeRef.current) {
                iframeRef.current.src = src;
            } else {
                const iframeWidth = typeof width === 'number' ? `${width}px` : '100%';
                iframeRef.current = document.createElement('iframe');
                iframeRef.current.src = src;
                iframeRef.current.id = iframeId;
                iframeRef.current.name = name || iframeId;
                iframeRef.current.setAttribute('loading', 'lazy');
                iframeRef.current.setAttribute('title', title || i18n('iframe-title'));
                iframeRef.current.frameBorder = '0';
                iframeRef.current.scrolling = 'no';
                iframeRef.current.width = iframeWidth;
                iframeRef.current.className = b('item', {'fixed-height': fixedHeight});
                container.appendChild(iframeRef.current);
            }
        },
        [src, width, iframeId, name, title, fixedHeight],
    );

    const handleMessage = useCallback(
        ({data}: MessageEvent) => {
            if (height !== 'auto' && typeof height === 'number' && iframeRef.current) {
                iframeRef.current.height = `${height}px`;
                return;
            }

            try {
                const parsed = JSON.parse(data);
                const frameHeight = parsed['iframe-height'];
                const {message} = parsed;

                if (iframeRef.current && frameHeight && !message) {
                    iframeRef.current.height = `${frameHeight}px`;
                }
            } catch (error) {
                return;
            }
        },
        [height],
    );

    const addIframe = useCallback(() => {
        const container = formContainerRef.current;

        if (container) {
            updateFormIframe(container);
            window.addEventListener('message', handleMessage, {passive: true});
        }
    }, [updateFormIframe, handleMessage]);

    useEffect(() => {
        addIframe();

        return () => window.removeEventListener('message', handleMessage);
    }, [addIframe, handleMessage]);

    return iframe ? <div className={b({margins})} ref={formContainerRef} style={{height}} /> : null;
};

export default Iframe;
