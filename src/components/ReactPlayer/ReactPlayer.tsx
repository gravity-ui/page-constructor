import _ from 'lodash';
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
import {Icon} from '@yandex-cloud/uikit';

import {block} from '../../utils';
import {
    ClassNameProps,
    PlayButtonProps,
    PlayButtonThemes,
    PlayButtonType,
    MediaVideoProps,
    MediaVideoControlsType,
    ReactPlayerBlockHandler,
} from '../../models';
import CustomBarControls from './CustomBarControls';
import {VideoContext} from '../../context/videoContext';
import {MetrikaContext} from '../../context/metrikaContext';
import {MobileContext} from '../../context/mobileContext';

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

// eslint-disable-next-line react/display-name
export const ReactPlayerBlock = React.forwardRef<ReactPlayerBlockHandler, ReactPlayerBlockProps>(
    (props, originRef) => {
        const isMobile = useContext(MobileContext);
        const {metrika} = useContext(MetrikaContext);
        const {
            src,
            previewImgUrl,
            loop = false,
            controls = MediaVideoControlsType.Default,
            muted: initiallyMuted = false,
            elapsedTime,
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

        const autoPlay = Boolean(!isMobile && !previewImgUrl && props.autoplay);
        const mute = initiallyMuted || autoPlay;

        const {playingVideoRef, setProps} = useContext(VideoContext);

        const ref = useRef<HTMLDivElement>(null);

        const [playerRef, setPlayerRef] = useState<ReactPlayer>();
        const [isPlaying, setIsPlaying] = useState(autoPlay);
        const [playedPercent, setPlayedPercent] = useState<number>(0);
        const [height, setHeight] = useState<number>(0);
        const [width, setWidth] = useState<number>(0);
        const [muted, setMuted] = useState<boolean>(mute);
        const [started, setStarted] = useState(autoPlay);
        const [paused, setPaused] = useState<boolean>(false);
        const [ended, setEnded] = useState<boolean>(false);

        useImperativeHandle(originRef, () => ({
            pause: () => setIsPlaying(false),
        }));

        useEffect(() => {
            if (ref.current && !playingVideoRef?.contains(ref.current)) {
                setMuted(true);
            }
        }, [playingVideoRef]);

        useEffect(() => {
            if (showPreview) {
                playerRef?.showPreview();
            }
        }, [showPreview, playerRef]);

        useEffect(() => {
            if (playerRef) {
                setIsPlaying(autoPlay);
            }
        }, [autoPlay, playerRef]);

        useEffect(() => setMuted(mute), [mute]);

        useEffect(() => {
            if (!started && isPlaying) {
                setStarted(true);
            }
        }, [isPlaying, started]);

        useEffect(() => {
            if (started && !Number.isNaN(Number(elapsedTime))) {
                playerRef?.seekTo(elapsedTime ?? 0, 'seconds');
            }
        }, [elapsedTime, playerRef, started]);

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

        const playIcon = useMemo(() => {
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
                    const goal = isMuted ? play : stop;

                    if (goal) {
                        metrika.reachGoals(goal, counterName);
                    }
                }

                if (isMuted) {
                    setProps({playingVideoRef: ref.current});
                }

                // In order to the progress bar to update (equals 0) before displaying
                setTimeout(() => setMuted(!isMuted), 0);
            },
            [playerRef, setProps, videoMetrika, metrika],
        );

        const handleClick = useCallback(() => changeMute(muted), [changeMute, muted]);

        const handleClickPreview = useCallback(() => {
            setIsPlaying(true);
            onClickPreview?.();

            if (metrika && videoMetrika) {
                const {play, counterName} = videoMetrika;

                if (play) {
                    metrika.reachGoals(play, counterName);
                }
            }
        }, [onClickPreview, setIsPlaying, videoMetrika, metrika]);

        const onPause = useCallback(() => {
            // For support correct state for youtube
            setIsPlaying(false);

            if (controls === MediaVideoControlsType.Custom) {
                setPaused(true);
                setIsPlaying(true);
            }
        }, [controls, setIsPlaying, setPaused]);

        const onStart = useCallback(() => {
            if (!autoPlay && !initiallyMuted) {
                setMuted(false);
            }
        }, [autoPlay, initiallyMuted]);

        const onPlay = useCallback(() => {
            setIsPlaying(true);

            if (controls === MediaVideoControlsType.Custom) {
                if (ended) {
                    changeMute(false);
                } else if (paused) {
                    changeMute(muted);
                }
                setEnded(false);
                setPaused(false);
            }
        }, [changeMute, controls, ended, muted, paused]);

        const onProgress = useCallback((progress) => {
            setPlayedPercent(progress.played);

            if (progress.played === 1) {
                setMuted(true);
            }
        }, []);

        const onEnded = useCallback(() => {
            // Youtube videos not muted after finishing playing and start again.
            // 'onEnded' does not fire when 'loop' is set to true.
            // It is custom loop with muted sound after finishing playing and start again.
            if (loop) {
                setPlayedPercent(0);
                setIsPlaying(true);
                playerRef?.seekTo(0);
            }

            setEnded(true);
        }, [loop, playerRef]);

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
            <div className={b({wrapper: !height}, className)} ref={ref} onClick={handleClick}>
                <ReactPlayer
                    className={b('player')}
                    url={src}
                    muted={muted}
                    controls={controls === MediaVideoControlsType.Default}
                    height={height || '100%'}
                    width={width || '100%'}
                    light={previewImgUrl}
                    playing={isPlaying}
                    playIcon={playIcon}
                    progressInterval={FPS}
                    onClickPreview={handleClickPreview}
                    onStart={onStart}
                    onReady={setPlayerRef}
                    onPlay={onPlay}
                    onPause={onPause}
                    onProgress={onProgress}
                    onEnded={onEnded}
                />
                {renderCustomBarControls(muted, playedPercent)}
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
