import * as React from 'react';

import {CustomControlsType, MediaVideoControlsType, MediaVideoProps} from '../../models';
import {block} from '../../utils';
import {getVideoTypesWithPriority} from '../Media/Video/utils';
import CustomBarControls from '../ReactPlayer/CustomBarControls';

import './DefaultVideo.scss';

const b = block('default-video');

type DefaultVideoRefType = HTMLVideoElement | undefined;

interface DefaultVideoProps {
    video: MediaVideoProps;
    qa?: string;
    customBarControlsClassName?: string;
    className?: string;
}

export const DefaultVideo = React.forwardRef<DefaultVideoRefType, DefaultVideoProps>(
    (props, ref) => {
        const {video, qa, customBarControlsClassName} = props;
        const {
            controls,
            customControlsOptions,
            muted: initiallyMuted = true,
            onVideoEnd,
            loop,
        } = video;
        const {
            muteButtonShown,
            positioning,
            type: customControlsType,
        } = customControlsOptions || {};
        const [isPaused, setIsPaused] = React.useState(false);
        const [isMuted, setIsMuted] = React.useState(initiallyMuted);
        const videoRef = React.useRef<HTMLVideoElement>(null);

        // one may not use this hook and work with `ref` variable only, but
        // in this case one should support both function type and object type,
        // according to ForwardedRef type.
        // Currently used way with extra ref and useImperativeHandle is more
        // convenient and allows us to work with object typed ref only,
        // avoiding typeof ref === 'function' statements
        React.useImperativeHandle(ref, () => {
            if (!videoRef?.current) {
                return undefined;
            }

            return videoRef.current;
        }, [videoRef]);

        // to guarantee setting a muted attribute in HTML. https://github.com/facebook/react/issues/10389
        React.useEffect(() => {
            const videoElement = videoRef.current;

            if (videoElement && initiallyMuted) {
                videoElement.defaultMuted = true;
            }
        }, [videoRef, initiallyMuted]);

        const onPlayToggle = React.useCallback(() => {
            setIsPaused((value) => {
                if (value) {
                    videoRef?.current?.play();
                } else {
                    videoRef?.current?.pause();
                }

                return !value;
            });
        }, [videoRef]);

        const onMuteToggle = React.useCallback(() => {
            setIsMuted((value) => !value);
        }, []);

        const onClick = React.useCallback(() => {
            if (customControlsType === CustomControlsType.WithPlayPauseButton) {
                onPlayToggle();
            }
        }, [onPlayToggle, customControlsType]);

        const onEnded = React.useCallback(() => {
            const videoElement = videoRef.current;
            if (!videoElement) {
                return;
            }

            if (loop) {
                videoElement.currentTime = 0;
                videoElement.play();
            }

            onVideoEnd?.();
        }, [loop, onVideoEnd]);

        return (
            <React.Fragment>
                <video
                    disablePictureInPicture
                    playsInline
                    // @ts-ignore
                    // eslint-disable-next-line react/no-unknown-property
                    pip="false"
                    className={b()}
                    ref={videoRef}
                    preload="metadata"
                    muted={isMuted}
                    aria-label={video.ariaLabel}
                    onClick={onClick}
                    onEnded={onEnded}
                >
                    {getVideoTypesWithPriority(video.src).map(({src, type}, index) => (
                        <source key={index} src={src} type={type} data-qa={qa} />
                    ))}
                    <track default kind="captions" />
                </video>

                {controls === MediaVideoControlsType.Custom && (
                    <CustomBarControls
                        className={customBarControlsClassName}
                        type={customControlsType}
                        isPaused={isPaused}
                        onPlayClick={onPlayToggle}
                        muteButtonShown={muteButtonShown}
                        shown
                        positioning={positioning}
                        mute={{
                            isMuted: Boolean(isMuted),
                            changeMute: onMuteToggle,
                        }}
                    />
                )}
            </React.Fragment>
        );
    },
);

DefaultVideo.displayName = 'DefaultVideo';
