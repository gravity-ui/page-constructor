import * as React from 'react';

import {PlayFill} from '@gravity-ui/icons';
import {Icon, useActionHandlers, useUniqId} from '@gravity-ui/uikit';
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
    playButtonId?: string;
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
        playButtonId,
        height,
        fullscreen,
        analyticsEvents,
        autoplay,
        onImageLoad,
    } = props;
    const handleAnalytics = useAnalytics(DefaultEventNames.VideoPreview);

    const src = videoIframe ? videoIframe : getYoutubeVideoSrc(stream, record);
    const ref = React.useRef<HTMLDivElement>(null);
    const [hidePreview, setHidePreview] = React.useState(false);
    const [currentHeight, setCurrentHeight] = React.useState(height || undefined);
    const fullId = React.useMemo(() => id || uuidv4(), [id]);
    const buttonId = useUniqId();

    const [isPlaying, setIsPlaying] = React.useState(!previewImg);

    const iframeSrc = React.useMemo(() => {
        if (src && isPlaying) {
            try {
                const url = new URL(src);
                const searchParams = getPageSearchParams({
                    ...(attributes || {}),
                    ...(previewImg || autoplay ? AUTOPLAY_ATTRIBUTES : NO_AUTOPLAY_ATTRIBUTES),
                });

                searchParams.forEach((value, key) => {
                    url.searchParams.set(key, value);
                });

                return url.href;
            } catch {
                return src;
            }
        }

        return undefined;
    }, [attributes, autoplay, isPlaying, previewImg, src]);

    const onPreviewClick = React.useCallback(() => {
        handleAnalytics(analyticsEvents);

        setIsPlaying(true);

        setTimeout(() => setHidePreview(true), AUTOPLAY_DELAY);
    }, [handleAnalytics, analyticsEvents]);

    const {onKeyDown: onPreviewKeyDown} = useActionHandlers(onPreviewClick);

    React.useEffect(() => {
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

    const iframeContent = React.useMemo(() => {
        return (
            <iframe
                id={fullId}
                src={iframeSrc}
                width="100%"
                height="100%"
                title={i18n('iframe-title')}
                frameBorder="0"
                allowFullScreen={true}
                scrolling="no"
                allow="autoplay; fullscreen; encrypted-media; accelerometer; gyroscope; picture-in-picture; clipboard-write; web-share; screen-wake-lock"
                loading="lazy"
            />
        );
    }, [fullId, iframeSrc]);

    React.useEffect(() => {
        setHidePreview(false);
    }, [src]);

    if (!src) {
        return null;
    }

    return (
        <div className={b(null, className)} style={{height: currentHeight}} ref={ref}>
            {iframeContent}
            {previewImg && !hidePreview && !fullscreen && (
                <div
                    className={b('preview')}
                    onClick={onPreviewClick}
                    onKeyDown={onPreviewKeyDown}
                    role="button"
                    tabIndex={0}
                    aria-labelledby={playButton ? playButtonId : buttonId}
                >
                    <Image
                        src={previewImg}
                        className={b('image')}
                        containerClassName={b('image-wrapper')}
                        onLoad={onImageLoad}
                    />
                    {playButton || (
                        <button title="Play" id={buttonId} className={b('button')}>
                            <Icon className={b('icon')} data={PlayFill} size={24} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default VideoBlock;
