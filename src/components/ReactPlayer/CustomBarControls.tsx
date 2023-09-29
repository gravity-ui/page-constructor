import React, {useMemo} from 'react';

import {Pause, Play, VolumeLow, VolumeXmark} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';

import {Mute} from '../../icons/Mute';
import {Unmute} from '../../icons/Unmute';
import {ClassNameProps, CustomControlsOptions, CustomControlsType} from '../../models';
import {block} from '../../utils';

import CircleProgress from './CircleProgress';
import i18n from './i18n';

import './CustomBarControls.scss';

const b = block('CustomBarControls');

const playIconsMap = {
    [CustomControlsType.WithMuteButton]: null,
    [CustomControlsType.WithUiKitPlayPauseButton]: Play,
};
const pauseIconsMap = {
    [CustomControlsType.WithMuteButton]: null,
    [CustomControlsType.WithUiKitPlayPauseButton]: Pause,
};
const muteIconsMap = {
    [CustomControlsType.WithMuteButton]: Mute,
    [CustomControlsType.WithUiKitPlayPauseButton]: VolumeLow,
};
const unmuteIconsMap = {
    [CustomControlsType.WithMuteButton]: Unmute,
    [CustomControlsType.WithUiKitPlayPauseButton]: VolumeXmark,
};

interface MuteConfigProps {
    isMuted: boolean;
    changeMute: (event: React.MouseEvent) => void;
}

export interface CustomBarControlsProps extends ClassNameProps, CustomControlsOptions {
    mute?: MuteConfigProps;
    elapsedTimePercent?: number;
    type?: CustomControlsType;
    isPaused?: boolean;
    onPlayClick?: () => void;
    shown: boolean;
}

const CustomBarControls = (props: CustomBarControlsProps) => {
    const {
        mute,
        elapsedTimePercent = 0,
        className,
        type = CustomControlsType.WithMuteButton,
        isPaused,
        onPlayClick,
        muteButtonHidden: isMuteButtonHidden,
        shown,
        positioning,
    } = props;

    const muteIcon = muteIconsMap[type];
    const unmuteIcon = unmuteIconsMap[type];
    const playIcon = playIconsMap[type];
    const pauseIcon = pauseIconsMap[type];

    const muteButton = useMemo(() => {
        if (!mute || isMuteButtonHidden) {
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
    }, [elapsedTimePercent, isMuteButtonHidden, mute, muteIcon, type, unmuteIcon]);

    const playPauseButton = useMemo(() => {
        const icon = isPaused ? playIcon : pauseIcon;

        if (type === CustomControlsType.WithMuteButton || !icon) {
            return null;
        }

        return (
            <button
                onClick={onPlayClick}
                className={b('button', {type})}
                aria-label={i18n(isPaused ? 'play' : 'pause')}
            >
                <Icon data={icon} className={b('play-icon', {type})} />
            </button>
        );
    }, [isPaused, onPlayClick, type, playIcon, pauseIcon]);

    return (
        <div className={b('wrapper', {type, shown, positioning}, className)}>
            {playPauseButton}
            {muteButton}
        </div>
    );
};

export default CustomBarControls;
