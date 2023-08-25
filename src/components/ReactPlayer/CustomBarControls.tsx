import React, {useMemo} from 'react';

import {Icon} from '@gravity-ui/uikit';

import {VideoControlPause} from '../../icons/VideoControlPause';
import {VideoControlPlay} from '../../icons/VideoControlPlay';
import {ClassNameProps, CustomControlsType} from '../../models';
import {block} from '../../utils';

import CircleProgress from './CircleProgress';
import i18n from './i18n';

import './CustomBarControls.scss';

const b = block('CustomBarControls');
const PLAY_PAUSE_ICON_SIZE = 24;

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
    isStarted?: boolean;
}

const CustomBarControls = (props: CustomBarControlsProps) => {
    const {
        mute,
        elapsedTimePercent = 0,
        className,
        type = CustomControlsType.WithMuteButton,
        isPaused,
        onPlayClick,
        isStarted = false,
    } = props;

    const muteButton = useMemo(() => {
        if (!mute || type === CustomControlsType.WithPlayPauseButton) {
            // mute button is not provided for variant-2
            return null;
        }

        const {isMuted, changeMute} = mute;

        return (
            <div className={b('button')} onClick={changeMute}>
                <div className={b('mute-button', {muted: isMuted})} />
                {!isMuted && <CircleProgress elapsedTime={elapsedTimePercent} strokeWidth={5} />}
            </div>
        );
    }, [elapsedTimePercent, mute, type]);

    const playPauseButton = useMemo(() => {
        if (type !== CustomControlsType.WithPlayPauseButton || !isStarted) {
            return null;
        }

        return (
            <button
                onClick={onPlayClick}
                className={b('play-button')}
                aria-label={i18n(isPaused ? 'play' : 'pause')}
            >
                {isPaused ? (
                    <Icon data={VideoControlPlay} size={PLAY_PAUSE_ICON_SIZE} />
                ) : (
                    <Icon data={VideoControlPause} size={PLAY_PAUSE_ICON_SIZE} />
                )}
            </button>
        );
    }, [isPaused, isStarted, onPlayClick, type]);

    return (
        <div className={b('wrapper', {type}, className)}>
            {muteButton}
            {playPauseButton}
        </div>
    );
};

export default CustomBarControls;
