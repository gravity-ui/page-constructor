/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// TODO fix in https://github.com/gravity-ui/page-constructor/issues/965

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {PlayFill} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';
import debounce from 'lodash/debounce';
import {v4 as uuidv4} from 'uuid';

import {useAnalytics} from '../../hooks/useAnalytics';
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
const NO_AUTOPLAY_ATTRIBUTES = {
    autoplay: 0,
};

const b = block('VideoBlock');

function getYoutubeVideoSrc(stream?: string, record?: string) {
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
    videoIframe?: string;
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
        videoIframe,
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

    const src = videoIframe ? videoIframe : getYoutubeVideoSrc(stream, record);
    const ref = useRef<HTMLDivElement>(null);
    const [hidePreview, setHidePreview] = useState(false);
    const [currentHeight, setCurrentHeight] = useState(height || undefined);
    const fullId = useMemo(() => id || uuidv4(), [id]);

    const [isPlaying, setIsPlaying] = useState(!previewImg);

    useEffect(() => {
        setIsPlaying(!previewImg);
    }, [previewImg]);

    const iframeSrc =
        src && isPlaying
            ? `${src}?${getPageSearchParams({
                  ...(attributes || {}),
                  ...(previewImg || autoplay ? AUTOPLAY_ATTRIBUTES : NO_AUTOPLAY_ATTRIBUTES),
              })}`
            : undefined;

    const onPreviewClick = useCallback(() => {
        handleAnalytics(analyticsEvents);

        setIsPlaying(true);

        setTimeout(() => setHidePreview(true), AUTOPLAY_DELAY);
    }, [handleAnalytics, analyticsEvents]);

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

    const iframeContent = useMemo(() => {
        return (
            <iframe
                id={fullId}
                src={iframeSrc}
                width="100%"
                height="100%"
                title={i18n('iframe-title')}
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; fullscreen; encrypted-media; accelerometer; gyroscope; picture-in-picture; clipboard-write; web-share; screen-wake-lock"
                loading="lazy"
            />
        );
    }, [fullId, iframeSrc]);

    useEffect(() => {
        setHidePreview(false);
    }, [src]);

    if (!src) {
        return null;
    }

    return (
        <div className={b(null, className)} style={{height: currentHeight}} ref={ref}>
            {iframeContent}
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
                            <Icon className={b('icon')} data={PlayFill} size={24} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default VideoBlock;
