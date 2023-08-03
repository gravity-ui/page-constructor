import React, {useEffect, useMemo, useRef} from 'react';

import {MediaComponentVideoProps, MediaVideoType, PlayButtonProps} from '../../../models';
import {block} from '../../../utils';
import ReactPlayerBlock from '../../ReactPlayer/ReactPlayer';

import {getVideoTypesWithPriority} from './utils';

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

export type VideoAllProps = VideoAdditionProps & MediaComponentVideoProps & InnerVideoProps;

const Video = (props: VideoAllProps) => {
    const {
        video,
        height,
        metrika,
        analyticsEvents,
        previewImg,
        playButton: commonPlayButton,
        customBarControlsClassName,
        videoClassName,
        playVideo,
        setHasVideoFallback,
        hasVideoFallback,
    } = props;

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
        const {src, loop, controls, muted, autoplay = true, elapsedTime, playButton} = video;

        return (
            <ReactPlayerBlock
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
                metrika={metrika}
                analyticsEvents={analyticsEvents}
                height={height}
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
        metrika,
        analyticsEvents,
    ]);

    const defaultVideoBlock = useMemo(() => {
        return video.src.length && !hasVideoFallback ? (
            <div className={b('wrap', videoClassName)} style={{height}}>
                <video
                    disablePictureInPicture={true}
                    playsInline={true}
                    // @ts-ignore
                    // eslint-disable-next-line react/no-unknown-property
                    pip="false"
                    className={b('item')}
                    ref={ref}
                    preload="metadata"
                    muted={true}
                >
                    {getVideoTypesWithPriority(video.src).map(({src, type}, index) => (
                        <source key={index} src={src} type={type} />
                    ))}
                </video>
            </div>
        ) : null;
    }, [video, videoClassName, hasVideoFallback, height]);

    switch (video.type) {
        case MediaVideoType.Player:
            return reactPlayerBlock;
        case MediaVideoType.Default:
        default:
            return defaultVideoBlock;
    }
};

export default Video;
