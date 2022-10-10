import React, {useCallback, useContext, useEffect, useRef} from 'react';

import {HEADER_HEIGHT} from '../constants';
import {LocaleContext} from '../../context/localeContext';
import {PixelEvent} from '../../models';
import {MobileContext} from '../../context/mobileContext';
import {block} from '../../utils';
import {useMetrika} from '../../hooks/useMetrika';

export const YANDEX_FORM_ORIGIN = 'https://forms.yandex.ru';
const CONTAINER_ID = 'pc-yandex-form-container';

const b = block('yandex-form');

export interface YandexFormProps {
    id: number | string;
    containerId?: string;
    theme?: string;
    className?: string;
    headerHeight?: number;
    customFormOrigin?: string;
    params?: {[key: string]: string};

    onSubmit?: () => void;
    onLoad?: () => void;

    metrikaGoals?: string | string[];
    pixelEvents?: string | string[] | PixelEvent | PixelEvent[];
}

const YandexForm = (props: YandexFormProps) => {
    const {
        onLoad,
        id,
        params,
        className,
        theme,
        containerId = CONTAINER_ID,
        headerHeight = HEADER_HEIGHT,
        onSubmit,
        metrikaGoals,
        pixelEvents,
        customFormOrigin,
    } = props;
    const formContainerRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>();
    const yaFormOrigin = customFormOrigin || YANDEX_FORM_ORIGIN;

    const handleMetrika = useMetrika();
    const isMobile = useContext(MobileContext);
    const locale = useContext(LocaleContext);

    const updateFormIframe = useCallback(
        (container: HTMLDivElement) => {
            const queryParams = new URLSearchParams(location.search);
            const url = location.origin + location.pathname;

            queryParams.set('url', url);
            queryParams.set('iframe', '1');

            if (locale?.lang) {
                queryParams.set('lang', locale.lang);
            }

            queryParams.set('theme', theme || 'cloud-www');

            if (isMobile) {
                queryParams.set('media-type', 'mobile');
            }

            if (params) {
                Object.keys(params).forEach((param) => {
                    queryParams.set(param, params[param]);
                });
            }

            const src = `${yaFormOrigin}/surveys/${id}/?${queryParams}`;

            if (iframeRef.current) {
                iframeRef.current.src = src;
            } else {
                iframeRef.current = document.createElement('iframe');
                iframeRef.current.src = src;
                iframeRef.current.id = containerId;
                iframeRef.current.name = `form${id}`;
                iframeRef.current.frameBorder = '0';
                iframeRef.current.scrolling = 'no';
                iframeRef.current.width = '100%';
                container.appendChild(iframeRef.current);
            }
        },
        [locale.lang, theme, isMobile, yaFormOrigin, id, containerId, params],
    );

    const handleSubmit = useCallback(() => {
        if (formContainerRef && formContainerRef.current) {
            const {top} = formContainerRef.current.getBoundingClientRect();
            window.scrollBy(0, top - headerHeight);
        }

        handleMetrika({metrikaGoals, pixelEvents});

        if (onSubmit) {
            onSubmit();
        }
    }, [handleMetrika, metrikaGoals, pixelEvents, onSubmit, headerHeight]);

    const handleMessage = useCallback(
        ({origin, data}: MessageEvent) => {
            if (origin !== yaFormOrigin) {
                return;
            }

            try {
                const parsed = JSON.parse(data);
                const height = parsed['iframe-height'];
                const {message, name} = parsed;
                if (name !== `form${id}`) {
                    return;
                }

                if (iframeRef.current && height && !message) {
                    iframeRef.current.height = `${height}px`;
                    onLoad?.();
                }

                if (message === 'sent') {
                    handleSubmit();
                }
            } catch (error) {
                return;
            }
        },
        [yaFormOrigin, id, onLoad, handleSubmit],
    );

    const addIframe = useCallback(() => {
        const container = formContainerRef.current;

        if (container) {
            updateFormIframe(container);
            window.addEventListener('message', handleMessage);
        }
    }, [updateFormIframe, handleMessage]);

    useEffect(() => {
        addIframe();
        // Crunch for mobile chrome in lite mode
        // https://support.google.com/chrome/answer/2392284?co=GENIE.Platform%3DAndroid&oco=1
        setTimeout(() => onLoad?.(), 1000);

        return () => window.removeEventListener('message', handleMessage);
    }, [id, addIframe, handleMessage, onLoad]);

    return <div ref={formContainerRef} className={b(null, className)} />;
};

export default YandexForm;
