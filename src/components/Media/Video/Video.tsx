import React, {useEffect, useMemo, useRef} from 'react';

import {
    LoopProps,
    MediaComponentVideoProps,
    MediaVideoType,
    PlayButtonProps,
    QAProps,
} from '../../../models';
import {block, getQaAttrubutes} from '../../../utils';
import {DefaultVideo} from '../../DefaultVideo/DefaultVideo';
import ReactPlayerBlock from '../../ReactPlayer/ReactPlayer';

import './Video.scss';

const b = block('media-component-video');

export interface VideoAdditionProps {
    playButton?: PlayButtonProps;
    customBarControlsClassName?: string;
    videoClassName?: string;
    playVideo?: boolean;
}

interface InnerVideoProps {
    setHasVideoFallback: React.Dispatch<boolean>;
    hasVideoFallback: boolean;
    // ISSUE-853 https://github.com/gravity-ui/page-constructor/issues/853
    // temporal solution for Safari 17
    shouldPreload?: boolean;
}

export type VideoAllProps = VideoAdditionProps &
    MediaComponentVideoProps &
    InnerVideoProps &
    QAProps;

export const getShouldPreloadMetadata = (loop: boolean | LoopProps | undefined) => {
    if (loop === undefined) {
        return true;
    }

    if (typeof loop === 'boolean') {
        return !loop;
    }

    return false;
};

const Video = (props: VideoAllProps) => {
    const {
        video,
        height,
        analyticsEvents,
        previewImg,
        playButton: commonPlayButton,
        customBarControlsClassName,
        videoClassName,
        playVideo,
        setHasVideoFallback,
        hasVideoFallback,
        qa,
        ratio,
        shouldPreload,
    } = props;

    const qaAttributes = getQaAttrubutes(qa, 'source');

    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (ref && ref.current) {
            const {loop} = video;

            if (loop && typeof loop !== 'boolean') {
                const {start = 0, end} = loop;

                ref.current.addEventListener(
                    'timeupdate',
                    () => {
                        const videoRef = ref.current;
                        const endTime = end || (videoRef && videoRef.duration);

                        if (videoRef && videoRef.currentTime === endTime) {
                            videoRef.currentTime = start;
                            videoRef.play().catch(() => setHasVideoFallback(true));
                        }
                    },
                    {passive: true},
                );
            }

            if (playVideo) {
                ref.current.play().catch(() => setHasVideoFallback(true));
            }
        }
    }, [playVideo, video, setHasVideoFallback]);

    const reactPlayerBlock = useMemo(() => {
        const {
            src,
            loop,
            controls,
            muted,
            autoplay = true,
            elapsedTime,
            playButton,
            ariaLabel,
            customControlsOptions,
        } = video;

        return (
            <ReactPlayerBlock
                ref={ref}
                className={b('react-player', videoClassName)}
                src={src}
                previewImgUrl={previewImg}
                loop={Boolean(loop)}
                controls={controls}
                muted={muted}
                autoplay={autoplay && playVideo}
                elapsedTime={elapsedTime}
                playButton={playButton || commonPlayButton}
                customBarControlsClassName={customBarControlsClassName}
                analyticsEvents={analyticsEvents}
                height={height}
                ariaLabel={ariaLabel}
                customControlsOptions={customControlsOptions}
                ratio={ratio}
            />
        );
    }, [
        video,
        height,
        videoClassName,
        previewImg,
        playVideo,
        commonPlayButton,
        customBarControlsClassName,
        analyticsEvents,
        ratio,
    ]);

    const defaultVideoBlock = useMemo(() => {
        // ISSUE-853 https://github.com/gravity-ui/page-constructor/issues/853
        // temporal solution for Safari 17
        const shouldPreloadLocal = getShouldPreloadMetadata(video.loop);

        return video.src.length && !hasVideoFallback ? (
            <div
                className={b('wrap', videoClassName)}
                style={{height}}
                data-qa={qaAttributes.default}
            >
                <DefaultVideo
                    ref={ref}
                    video={video}
                    qa={qaAttributes.source}
                    // ISSUE-853 https://github.com/gravity-ui/page-constructor/issues/853
                    // temporal solution for Safari 17
                    shouldPreload={shouldPreload ? shouldPreloadLocal : shouldPreload}
                />
            </div>
        ) : null;
    }, [
        video,
        hasVideoFallback,
        videoClassName,
        height,
        qaAttributes.default,
        qaAttributes.source,
        // ISSUE-853 https://github.com/gravity-ui/page-constructor/issues/853
        // temporal solution for Safari 17
        shouldPreload,
    ]);

    switch (video.type) {
        case MediaVideoType.Player:
            return reactPlayerBlock;
        case MediaVideoType.Default:
        default:
            return defaultVideoBlock;
    }
};

export default Video;
