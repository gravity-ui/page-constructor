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
                ratio={ratio === 'auto' ? undefined : ratio}
                autoRatio={ratio === 'auto'}
                contain={contain}
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

    const defaultVideoBlock = React.useMemo(() => {
        return video.src.length && !hasVideoFallback ? (
            <div
                className={b('wrap', videoClassName)}
                style={{height}}
                data-qa={qaAttributes.default}
            >
                <DefaultVideo ref={ref} video={video} qa={qaAttributes.source} />
            </div>
        ) : null;
    }, [
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
