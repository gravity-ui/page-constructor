import React, {useCallback, useEffect, useRef, useState} from 'react';

import {Icon} from '@gravity-ui/uikit';
import debounce from 'lodash/debounce';
import {v4 as uuidv4} from 'uuid';

import {useAnalytics} from '../../hooks/useAnalytics';
import {PlayVideo} from '../../icons';
import {AnalyticsEventsBase, DefaultEventNames} from '../../models/common';
import {block, getPageSearchParams} from '../../utils';
import Image from '../Image/Image';

import {i18n} from './i18n';

import './VideoBlock.scss';

const RECORD_URL = 'https://www.youtube.com/embed/';
const STREAM_URL = 'https://www.youtube.com/embed/live_stream?channel=';
const RECORD_RE = /[0-9A-Za-z_-]{11}/;
const STREAM_RE = /[0-9A-Za-z_-]{23,25}/;
const AUTOPLAY_DELAY = 300;

export const AUTOPLAY_ATTRIBUTES = {
    autoplay: 1,
    mute: 1,
};

const b = block('VideoBlock');

function getVideoSrc(stream?: string, record?: string) {
    if (!stream && !record) {
        return null;
    }

    const [videoLink, url, re] = stream
        ? [stream, STREAM_URL, STREAM_RE]
        : [record, RECORD_URL, RECORD_RE];
    const match = videoLink?.match(re);
    let src;

    if (match && match.length) {
        src = url + match[0];
    }

    return src;
}

export function getHeight(width: number): number {
    return (width / 16) * 9;
}

export interface VideoBlockProps extends AnalyticsEventsBase {
    id?: string;
    stream?: string;
    record?: string;
    attributes?: Record<string, string>;
    className?: string;
    previewImg?: string;
    playButton?: React.ReactNode;
    height?: number;
    fullscreen?: boolean;
    autoplay?: boolean;
    onImageLoad?: () => void;
}

const VideoBlock = (props: VideoBlockProps) => {
    const {
        stream,
        record,
        attributes,
        className,
        id,
        previewImg,
        playButton,
        height,
        fullscreen,
        analyticsEvents,
        autoplay,
        onImageLoad,
    } = props;
    const handleAnalytics = useAnalytics(DefaultEventNames.VideoPreview);

    const src = getVideoSrc(stream, record);
    const ref = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>();
    const [hidePreview, setHidePreview] = useState(false);
    const norender = (!stream && !record) || !src;
    const [currentHeight, setCurrentHeight] = useState(height || undefined);
    const fullId = id || uuidv4();
    const onPreviewClick = useCallback(() => {
        handleAnalytics(analyticsEvents);

        if (iframeRef.current) {
            iframeRef.current.src = `${src}?${getPageSearchParams({
                ...AUTOPLAY_ATTRIBUTES,
                ...(attributes || {}),
            })}`;
        }

        setTimeout(() => setHidePreview(true), AUTOPLAY_DELAY);
    }, [handleAnalytics, analyticsEvents, src, attributes]);

    useEffect(() => {
        const updateSize = debounce(() => {
            setCurrentHeight(
                ref.current ? Math.round(getHeight(ref.current.offsetWidth)) : undefined,
            );
        }, 100);

        updateSize();
        window.addEventListener('resize', updateSize, {passive: true});
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, [height]);

    useEffect(() => {
        if (norender) {
            return;
        }

        if (ref.current && !iframeRef.current) {
            const iframe = document.createElement('iframe');
            iframe.id = fullId;

            if (!previewImg) {
                iframe.src = `${src}?${getPageSearchParams({
                    ...(attributes || {}),
                    ...(autoplay ? AUTOPLAY_ATTRIBUTES : {}),
                })}`;
            }

            iframe.width = '100%';
            iframe.height = '100%';
            iframe.title = i18n('iframe-title');
            iframe.frameBorder = '0';
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.setAttribute('allow', 'autoplay');
            iframe.setAttribute('loading', 'lazy');
            ref.current.appendChild(iframe);
            iframeRef.current = iframe;
        }
    }, [stream, record, norender, src, fullId, attributes, iframeRef, previewImg, autoplay]);

    useEffect(() => {
        setHidePreview(false);
    }, [src, setHidePreview]);

    if (norender) {
        return null;
    }

    return (
        <div className={b(null, className)} ref={ref} style={{height: currentHeight}}>
            {previewImg && !hidePreview && !fullscreen && (
                <div className={b('preview')} onClick={onPreviewClick}>
                    <Image
                        src={previewImg}
                        className={b('image')}
                        containerClassName={b('image-wrapper')}
                        onLoad={onImageLoad}
                    />
                    {playButton || (
                        <button title="Play" className={b('button')}>
                            <Icon className={b('icon')} data={PlayVideo} size={24} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default VideoBlock;
