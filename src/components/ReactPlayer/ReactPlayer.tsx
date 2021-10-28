import _ from 'lodash';
import block from 'bem-cn-lite';
import ReactPlayer from 'react-player';
import React, {
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import {Icon, MobileContext} from '@yandex-data-ui/common';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';

import {
    PlayButtonProps,
    PlayButtonThemes,
    PlayButtonType,
    MediaVideoProps,
    MediaVideoControlsType,
} from '../../models';
import CustomBarControls from './CustomBarControls';
import {VideoContext} from '../../context/videoContext';
import {MetrikaContext} from '../../context/metrikaContext';

import playVideoIcon from '../../../assets/icons/play-video.svg';

import './ReactPlayer.scss';

const b = block('ReactPlayer');

const FPS = 60;

export interface ReactPlayerBlockProps
    extends Omit<MediaVideoProps, 'loop' | 'src'>,
        ClassNameProps {
    src: string | string[];
    previewImgUrl?: string;
    loop?: boolean;
    customBarControlsClassName?: string;
    showPreview?: boolean;
    onClickPreview?: () => void;
}

export interface ReactPlayerBlockHandler {
    pause: () => void;
}

// eslint-disable-next-line react/display-name
const ReactPlayerBlock = React.forwardRef<ReactPlayerBlockHandler, ReactPlayerBlockProps>(
    (props, originRef) => {
        const {mobile} = useContext(MobileContext);
        const {metrika} = useContext(MetrikaContext);
        const {
            src,
            previewImgUrl,
            loop = false,
            controls = MediaVideoControlsType.Default,
            muted = true,
            autoplay = true,
            elapsedTime = 0,
            playButton,
            className,
            customBarControlsClassName,
            showPreview,
            onClickPreview,
            metrika: videoMetrika,
        } = props;

        const {
            type = PlayButtonType.Default,
            theme = PlayButtonThemes.Blue,
            text,
            className: buttonClassName,
        } = playButton || ({} as PlayButtonProps);

        const {playingVideoRef, setProps} = useContext(VideoContext);

        const ref = useRef<HTMLDivElement>(null);

        const [playerRef, setPlayerRef] = useState<ReactPlayer>();
        const [isPlaying, setIsPlaying] = useState(autoplay && !previewImgUrl);
        const [totalTime, setTotalTime] = useState<number>(0);
        const [height, setHeight] = useState<number>(0);
        const [width, setWidth] = useState<number>(0);
        const [mute, setMute] = useState<boolean>(muted);
        const [pause, setPause] = useState<boolean>(false);
        const [end, setEnd] = useState<boolean>(false);
        const [playedPercent, setPlayedPercent] = useState<number>(0);

        useImperativeHandle(originRef, () => ({
            pause: () => {
                setIsPlaying(false);
            },
        }));

        useEffect(() => {
            if (ref.current && !playingVideoRef?.contains(ref.current)) {
                setMute(true);
            }
        }, [playingVideoRef]);

        useEffect(() => {
            if (showPreview) {
                playerRef?.showPreview();
            }
        }, [showPreview, playerRef]);

        const handleClickPreview = useCallback(() => {
            setIsPlaying(true);
            onClickPreview?.();

            if (metrika && videoMetrika) {
                const {play, counterName} = videoMetrika;
                metrika.reachGoals(play, counterName);
            }
        }, [onClickPreview, setIsPlaying, videoMetrika, metrika]);

        useEffect(() => {
            if (playerRef) {
                setIsPlaying(autoplay);
            }
        }, [autoplay, playerRef]);

        useEffect(() => {
            const updateSize = _.debounce(() => {
                if (ref.current) {
                    // We need to get parent's width does not equal 0
                    const parentElement = getParentElement(ref.current);
                    const {paddingLeft, paddingRight} = getComputedStyle(parentElement);
                    const newWidth =
                        parentElement.offsetWidth -
                        parseFloat(paddingLeft) -
                        parseFloat(paddingRight);

                    setWidth(newWidth);
                    setHeight(Math.floor(getHeight(newWidth)));
                }
            }, 200);

            updateSize();
            window.addEventListener('resize', updateSize);
            return () => {
                window.removeEventListener('resize', updateSize);
            };
        }, []);

        useEffect(() => {
            if (elapsedTime !== undefined && playerRef && totalTime) {
                playerRef.seekTo(elapsedTime / totalTime);
            }
        }, [playerRef, totalTime, elapsedTime]);

        const getPlayButton = useMemo(() => {
            let playButtonContent;

            switch (type) {
                case PlayButtonType.Text:
                    playButtonContent = text;
                    break;
                case PlayButtonType.Default:
                default:
                    playButtonContent = (
                        <Icon className={b('icon')} data={playVideoIcon} size={24} />
                    );
                    break;
            }

            return (
                <button className={b('button', {theme, text: Boolean(text)}, buttonClassName)}>
                    {playButtonContent}
                </button>
            );
        }, [type, theme, text, buttonClassName]);

        const changeMute = useCallback(
            (isMuted: boolean) => {
                if (isMuted && playerRef) {
                    playerRef.seekTo(0);
                    setPlayedPercent(0);
                }

                if (metrika && videoMetrika) {
                    const {play, stop, counterName} = videoMetrika;
                    metrika.reachGoals(isMuted ? play : stop, counterName);
                }

                if (isMuted) {
                    setProps({playingVideoRef: ref.current});
                }

                // In order to the progress bar to update (equals 0) before displaying
                setTimeout(() => setMute(!isMuted), 0);
            },
            [playerRef, setProps, videoMetrika, metrika],
        );

        const handlePlay = useCallback(
            (isMuted: boolean, isPaused: boolean, isEnded: boolean) => {
                setIsPlaying(true);

                if (controls === MediaVideoControlsType.Custom) {
                    if (isEnded) {
                        changeMute(false);
                    } else if (isPaused) {
                        changeMute(isMuted);
                    }
                    setEnd(false);
                    setPause(false);
                }
            },
            [controls, setIsPlaying, changeMute, setPause, setEnd],
        );

        const handlePause = useCallback(() => {
            // For support correct state for youtube
            setIsPlaying(false);

            if (controls === MediaVideoControlsType.Custom) {
                setPause(true);
                setIsPlaying(true);
            }
        }, [controls, setIsPlaying, setPause]);

        const onStart = useCallback(() => {
            if (mobile && !muted) {
                setMute(false);
            }
        }, [mobile, muted]);

        useEffect(() => {
            setMute(muted);
        }, [muted]);

        const renderCustomBarControls = useCallback(
            (isMuted: boolean, elapsedTimePercent: number) => {
                if (controls !== MediaVideoControlsType.Custom || !isPlaying) {
                    return null;
                }

                return (
                    <CustomBarControls
                        className={b(
                            'custom-bar-controls',
                            {muted: isMuted},
                            customBarControlsClassName,
                        )}
                        mute={{
                            isMuted,
                            changeMute: (event: React.MouseEvent) => {
                                event.stopPropagation();
                                changeMute(isMuted);
                            },
                        }}
                        elapsedTimePercent={elapsedTimePercent}
                    />
                );
            },
            [controls, isPlaying, customBarControlsClassName, changeMute],
        );

        return (
            <div
                className={b({wrapper: !height}, className)}
                ref={ref}
                onClick={() => changeMute(mute)}
            >
                <ReactPlayer
                    ref={(player: ReactPlayer) => setPlayerRef(player)}
                    className={b('player')}
                    url={src}
                    muted={mute}
                    controls={controls === MediaVideoControlsType.Default}
                    height={height || '100%'}
                    width={width || '100%'}
                    light={previewImgUrl}
                    playing={isPlaying}
                    playIcon={getPlayButton}
                    progressInterval={FPS}
                    onClickPreview={handleClickPreview}
                    onStart={onStart}
                    onReady={(player: ReactPlayer) => setTotalTime(player.getDuration())}
                    onPlay={() => handlePlay(mute, pause, end)}
                    onPause={handlePause}
                    onProgress={(progress) => {
                        setPlayedPercent(progress.played);

                        if (progress.played === 1) {
                            setMute(true);
                        }
                    }}
                    onEnded={() => {
                        // Youtube videos not muted after finishing playing and start again.
                        // 'onEnded' does not fire when 'loop' is set to true.
                        // It is custom loop with muted sound after finishing playing and start again.
                        if (loop) {
                            setPlayedPercent(0);
                            setIsPlaying(true);
                            playerRef?.seekTo(0);
                        }

                        setEnd(true);
                    }}
                />
                {renderCustomBarControls(mute, playedPercent)}
            </div>
        );
    },
);

function getHeight(width: number): number {
    return (width / 16) * 9;
}

function getParentElement(element: HTMLElement): HTMLElement {
    const parentElement = element.parentElement;

    if (!parentElement) {
        return element;
    }

    return parentElement.offsetWidth ? parentElement : getParentElement(parentElement);
}

export default ReactPlayerBlock;
