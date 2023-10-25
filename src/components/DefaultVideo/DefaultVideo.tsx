import React, {Fragment, useCallback, useState} from 'react';

import {CustomControlsType, MediaVideoControlsType, MediaVideoProps} from '../../models';
import {block} from '../../utils';
import {getVideoTypesWithPriority} from '../Media/Video/utils';
import CustomBarControls from '../ReactPlayer/CustomBarControls';

import './DefaultVideo.scss';

const b = block('default-video');

interface DefaultVideoProps {
    video: MediaVideoProps;
    qa?: string;
    customBarControlsClassName?: string;
    className?: string;
}

// eslint-disable-next-line react/display-name
export const DefaultVideo = React.forwardRef<HTMLVideoElement, DefaultVideoProps>((props, ref) => {
    const {video, qa, customBarControlsClassName} = props;
    const {controls, customControlsOptions, muted: initiallyMuted} = video;
    const {muteButtonShown, positioning, type} = customControlsOptions || {};
    const [isPaused, setIsPaused] = useState(false);
    const [isMuted, setIsMuted] = useState(initiallyMuted);

    const onPlayToggle = useCallback(() => {
        setIsPaused((value) => {
            if (typeof ref !== 'function') {
                if (value) {
                    ref?.current?.play();
                } else {
                    ref?.current?.pause();
                }
            }

            return !value;
        });
    }, [ref]);
    const onMuteToggle = useCallback(() => {
        setIsMuted((value) => !value);
    }, []);

    const onClick = useCallback(() => {
        if (type === CustomControlsType.WithPlayPauseButton) {
            onPlayToggle();
        }
    }, [onPlayToggle, type]);

    return (
        <Fragment>
            <video
                disablePictureInPicture
                playsInline
                // @ts-ignore
                // eslint-disable-next-line react/no-unknown-property
                pip="false"
                className={b()}
                ref={ref}
                preload="metadata"
                // @ts-ignore
                muted={isMuted ? '' : undefined}
                aria-label={video.ariaLabel}
                onClick={onClick}
            >
                {getVideoTypesWithPriority(video.src).map(({src, type}, index) => (
                    <source key={index} src={src} type={type} data-qa={qa} />
                ))}
            </video>

            {controls === MediaVideoControlsType.Custom && (
                <CustomBarControls
                    className={customBarControlsClassName}
                    type={type}
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
        </Fragment>
    );
});
