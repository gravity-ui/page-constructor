import React, {useMemo} from 'react';

import {Icon} from '@gravity-ui/uikit';

import {Mute} from '../../icons/Mute';
import {MuteSmall} from '../../icons/MuteSmall';
import {Unmute} from '../../icons/Unmute';
import {UnmuteSmall} from '../../icons/UnmuteSmall';
import {VideoControlPause} from '../../icons/VideoControlPause';
import {VideoControlPlay} from '../../icons/VideoControlPlay';
import {ClassNameProps, CustomControlsType} from '../../models';
import {block} from '../../utils';

import CircleProgress from './CircleProgress';
import i18n from './i18n';

import './CustomBarControls.scss';

const b = block('CustomBarControls');

interface MuteConfigProps {
    isMuted: boolean;
    changeMute: (event: React.MouseEvent) => void;
}

export interface CustomBarControlsProps extends ClassNameProps {
    mute?: MuteConfigProps;
    elapsedTimePercent?: number;
    type?: CustomControlsType;
    isPaused?: boolean;
    onPlayClick?: () => void;
}

const CustomBarControls = (props: CustomBarControlsProps) => {
    const {
        mute,
        elapsedTimePercent = 0,
        className,
        type = CustomControlsType.WithMuteButton,
        isPaused,
        onPlayClick,
    } = props;

    const muteIcon = useMemo(() => {
        return type === CustomControlsType.WithMuteButton ? Mute : MuteSmall;
    }, [type]);
    const unmuteIcon = useMemo(() => {
        return type === CustomControlsType.WithMuteButton ? Unmute : UnmuteSmall;
    }, [type]);

    const muteButton = useMemo(() => {
        if (!mute) {
            return null;
        }

        const {isMuted, changeMute} = mute;

        return (
            <button
                className={b('button', {type})}
                onClick={changeMute}
                aria-label={i18n(isMuted ? 'unmute' : 'mute')}
            >
                <Icon data={isMuted ? unmuteIcon : muteIcon} className={b('mute-icon', {type})} />
                {type === CustomControlsType.WithMuteButton && !isMuted && (
                    <CircleProgress elapsedTime={elapsedTimePercent} strokeWidth={5} />
                )}
            </button>
        );
    }, [elapsedTimePercent, mute, muteIcon, type, unmuteIcon]);

    const playPauseButton = useMemo(() => {
        if (type !== CustomControlsType.WithPlayPauseButton) {
            return null;
        }

        return (
            <button
                onClick={onPlayClick}
                className={b('button', {type})}
                aria-label={i18n(isPaused ? 'play' : 'pause')}
            >
                <Icon
                    data={isPaused ? VideoControlPlay : VideoControlPause}
                    className={b('play-icon')}
                />
            </button>
        );
    }, [isPaused, onPlayClick, type]);

    return (
        <div className={b('wrapper', {type}, className)}>
            {playPauseButton}
            {muteButton}
        </div>
    );
};

export default CustomBarControls;
