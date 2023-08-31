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
import {Icon} from '@gravity-ui/uikit';

import {block} from '../../utils';
import {
    ClassNameProps,
    CustomControlsType,
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
import {PlayVideo} from '../../icons';

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
    height?: number;
    children?: React.ReactNode;
}

interface PlayerPropgress {
    played: number;
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
            customControlsOptions = {},
            muted: initiallyMuted = false,
            elapsedTime,
            playButton,
            className,
            customBarControlsClassName,
            showPreview,
            onClickPreview,
            metrika: videoMetrika,
            height,
        } = props;

        const {
            type = PlayButtonType.Default,
            theme = PlayButtonThemes.Blue,
            text,
            className: buttonClassName,
        } = playButton || ({} as PlayButtonProps);
        const {type: customControlsType = CustomControlsType.WithMuteButton} =
            customControlsOptions;

        const autoPlay = Boolean(!isMobile && !previewImgUrl && props.autoplay);
        const mute = initiallyMuted || autoPlay;

        const {playingVideoRef, setProps} = useContext(VideoContext);

        const ref = useRef<HTMLDivElement>(null);

        const [playerRef, setPlayerRef] = useState<ReactPlayer>();
        const [isPlaying, setIsPlaying] = useState(autoPlay);
        const [playedPercent, setPlayedPercent] = useState<number>(0);
        const [currentHeight, setCurrentHeight] = useState(height);
        const [width, setWidth] = useState<number>(0);
        const [muted, setMuted] = useState<boolean>(mute);
        const [started, setStarted] = useState(autoPlay);
        const [ended, setEnded] = useState(false);
        const [hovered, setHovered] = useState(false);

        useImperativeHandle(originRef, () => ({
            pause: () => setIsPlaying(false),
        }));

        useEffect(() => {
            if (ref.current && !playingVideoRef?.contains(ref.current)) {
                setMuted(true);
            }
        }, [playingVideoRef, ref]);

        useEffect(() => {
            if (showPreview) {
                playerRef?.showPreview();
            }
        }, [showPreview, playerRef]);

        useEffect(() => {
            if (playerRef && autoPlay) {
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
                    setCurrentHeight(Math.floor(getHeight(newWidth)));
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
                    playButtonContent = <Icon className={b('icon')} data={PlayVideo} size={24} />;
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
            [metrika, videoMetrika, setProps],
        );

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
            setIsPlaying(false);
        }, []);

        const onStart = useCallback(() => {
            if (!autoPlay && !initiallyMuted) {
                setMuted(false);
            }
        }, [autoPlay, initiallyMuted]);

        const onPlay = useCallback(() => {
            setIsPlaying(true);

            if (controls === MediaVideoControlsType.Custom) {
                changeMute(true);
            }
        }, [changeMute, controls]);

        const onProgress = useCallback((progress: PlayerPropgress) => {
            setPlayedPercent(progress.played);

            if (progress.played === 1) {
                setMuted(true);
            } else {
                setEnded(false);
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

        const onPlayClick = useCallback(() => {
            if (isPlaying) {
                onPause();
            } else {
                onPlay();
            }
        }, [isPlaying, onPause, onPlay]);

        const handleClick = useCallback(() => {
            if (customControlsType === CustomControlsType.WithMuteButton) {
                changeMute(muted);
            } else {
                onPlayClick();
            }
            if (ended) {
                playerRef?.seekTo(0);
                onPlay();
            }
        }, [changeMute, customControlsType, ended, muted, onPlay, onPlayClick, playerRef]);

        const onFocusIn = useCallback(() => setHovered(true), []);
        const onFocusOut = useCallback(() => setHovered(false), []);

        return (
            <div
                className={b({wrapper: !currentHeight, controls, started, hovered}, className)}
                ref={ref}
                onClick={handleClick}
                onMouseEnter={onFocusIn}
                onMouseLeave={onFocusOut}
                onFocus={onFocusIn}
                onBlur={onFocusOut}
            >
                <ReactPlayer
                    className={b('player')}
                    url={src}
                    muted={muted}
                    controls={controls === MediaVideoControlsType.Default}
                    height={currentHeight || '100%'}
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
                {controls === MediaVideoControlsType.Custom && (
                    <CustomBarControls
                        className={b('custom-bar-controls', {muted}, customBarControlsClassName)}
                        mute={{
                            isMuted: muted,
                            changeMute: (event: React.MouseEvent) => {
                                event.stopPropagation();
                                changeMute(muted);
                            },
                        }}
                        elapsedTimePercent={playedPercent}
                        type={customControlsType}
                        isPaused={!isPlaying}
                        onPlayClick={onPlayClick}
                        isStarted={started}
                    />
                )}
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
