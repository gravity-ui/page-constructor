import * as React from 'react';

import {MediaComponentVideoProps, MediaVideoType, PlayButtonProps, QAProps} from '../../../models';
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
    disablePlayerAutoSizing?: boolean;
    onIntrinsicSizeChange?: (size: {width: number; height: number}) => void;
}

interface InnerVideoProps {
    setHasVideoFallback: React.Dispatch<boolean>;
    hasVideoFallback: boolean;
}

export type VideoAllProps = VideoAdditionProps &
    MediaComponentVideoProps &
    InnerVideoProps &
    QAProps;

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
        disablePlayerAutoSizing,
        onIntrinsicSizeChange,
        setHasVideoFallback,
        hasVideoFallback,
        qa,
        ratio,
    } = props;

    const qaAttributes = getQaAttrubutes(qa, 'source');

    const ref = React.useRef<HTMLVideoElement>(null);

    React.useImperativeHandle(video.ref, () => ref.current, []);

    React.useEffect(() => {
        if (ref && ref.current) {
            if (playVideo) {
                ref.current.play().catch(() => setHasVideoFallback(true));
            }
        }
    }, [playVideo, video, setHasVideoFallback]);

    // to receive size even if the video has been loaded before hydration
    // applies only to the 'default' video type ('player' does not render on server)
    React.useEffect(() => {
        const videoElement = ref.current;
        if (video.type === MediaVideoType.Player || !videoElement) {
            return;
        }

        if (videoElement.readyState >= 1) {
            onIntrinsicSizeChange?.({
                width: videoElement.videoWidth,
                height: videoElement.videoHeight,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video.type]);

    const reactPlayerBlock = React.useMemo(() => {
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
            contain,
        } = video;

        return (
            <ReactPlayerBlock
                ref={ref}
                className={b('react-player', videoClassName)}
                src={src}
                previewImgUrl={previewImg}
                loop={loop}
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
                ratio={ratio === 'auto' ? undefined : ratio}
                autoRatio={ratio === 'auto'}
                contain={contain}
                disableAutoSizing={disablePlayerAutoSizing}
                onIntrinsicSizeChange={onIntrinsicSizeChange}
            />
        );
    }, [
        video,
        videoClassName,
        previewImg,
        playVideo,
        commonPlayButton,
        customBarControlsClassName,
        analyticsEvents,
        height,
        ratio,
        disablePlayerAutoSizing,
        onIntrinsicSizeChange,
    ]);

    const defaultVideoBlock = React.useMemo(() => {
        const onLoadedMetadata: React.ReactEventHandler<HTMLVideoElement> | undefined =
            onIntrinsicSizeChange &&
            ((e) => {
                const videoElement = e.currentTarget;

                onIntrinsicSizeChange({
                    width: videoElement.videoWidth,
                    height: videoElement.videoHeight,
                });
            });

        return video.src?.length && !hasVideoFallback ? (
            <div
                className={b('wrap', videoClassName)}
                style={{height}}
                data-qa={qaAttributes.default}
            >
                <DefaultVideo
                    ref={ref}
                    video={video}
                    qa={qaAttributes.source}
                    onLoadedMetadata={onLoadedMetadata}
                />
            </div>
        ) : null;
    }, [
        onIntrinsicSizeChange,
        video,
        hasVideoFallback,
        videoClassName,
        height,
        qaAttributes.default,
        qaAttributes.source,
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
