import * as React from 'react';

import {PlayFill} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';
import debounce from 'lodash/debounce';
import _ReactPlayer from 'react-player';

import {MobileContext} from '../../context/mobileContext';
import {VideoContext} from '../../context/videoContext';
import {useAnalytics, useMount} from '../../hooks';
import {
    AnalyticsEvent,
    ClassNameProps,
    CustomControlsButtonPositioning,
    CustomControlsType,
    DefaultEventNames,
    MediaVideoControlsType,
    MediaVideoProps,
    PlayButtonProps,
    PlayButtonThemes,
    PlayButtonType,
    PredefinedEventTypes,
    ReactPlayerBlockHandler,
} from '../../models';
import {block} from '../../utils';

import CustomBarControls from './CustomBarControls';
import {i18n} from './i18n';
import {checkYoutubeVideos} from './utils';
import {isYoutubePlayerInstance} from './utils/youtube';

import './ReactPlayer.scss';

const b = block('ReactPlayer');

const FPS = 60;

const ReactPlayer =
    'default' in _ReactPlayer && _ReactPlayer.default
        ? (_ReactPlayer.default as typeof _ReactPlayer)
        : _ReactPlayer;

export interface ReactPlayerBlockProps
    extends Omit<MediaVideoProps, 'loop' | 'src' | 'ref'>,
        ClassNameProps {
    src: string | string[];
    previewImgUrl?: string;
    loop?: boolean;
    customBarControlsClassName?: string;
    showPreview?: boolean;
    onClickPreview?: () => void;
    height?: number;
    ratio?: number;
    autoRatio?: boolean;
    children?: React.ReactNode;
}

interface PlayerPropgress {
    played: number;
}

// eslint-disable-next-line react/display-name
export const ReactPlayerBlock = React.forwardRef<ReactPlayerBlockHandler, ReactPlayerBlockProps>(
    (props, originRef) => {
        const isMobile = React.useContext(MobileContext);
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
            analyticsEvents,
            height,
            ariaLabel,
            ratio,
            autoRatio,
            contain = true,
        } = props;

        const {
            type = PlayButtonType.Default,
            theme = PlayButtonThemes.Blue,
            text,
            className: buttonClassName,
        } = playButton || ({} as PlayButtonProps);
        const {
            type: customControlsType = CustomControlsType.WithMuteButton,
            muteButtonShown,
            positioning = CustomControlsButtonPositioning.Center,
        } = customControlsOptions;

        const autoPlay = Boolean(!isMobile && !previewImgUrl && props.autoplay);
        const mute = initiallyMuted || autoPlay;

        const {playingVideoRef, setProps} = React.useContext(VideoContext);

        const ref = React.useRef<HTMLDivElement>(null);
        const buttonRef = React.useRef<HTMLButtonElement>(null);

        const [playerRef, setPlayerRef] = React.useState<_ReactPlayer>();
        const [isPlaying, setIsPlaying] = React.useState(autoPlay);
        const [playedPercent, setPlayedPercent] = React.useState<number>(0);
        const [currentHeight, setCurrentHeight] = React.useState(height);
        const [width, setWidth] = React.useState<number>(0);
        const [actualRatio, setActualRatio] = React.useState<number>();
        const [muted, setMuted] = React.useState<boolean>(mute);
        const [started, setStarted] = React.useState(autoPlay);
        const [ended, setEnded] = React.useState<boolean>(false);
        const [isMounted, setIsMounted] = React.useState(false);
        const [hovered, setHovered] = React.useState(isMobile);

        useMount(() => setIsMounted(true));

        const videoSrc = React.useMemo(() => checkYoutubeVideos(src), [src]);

        const eventsArray = React.useMemo(() => {
            if (analyticsEvents) {
                return Array.isArray(analyticsEvents) ? analyticsEvents : [analyticsEvents];
            }

            return [];
        }, [analyticsEvents]);
        const handleAnalytics = useAnalytics(DefaultEventNames.ReactPlayerControls);

        React.useImperativeHandle(originRef, () => {
            if (!playerRef) {
                return;
            }

            let play, pause, addEventListener;
            const videoInstance = playerRef.getInternalPlayer();
            if (isYoutubePlayerInstance(videoInstance)) {
                ({pauseVideo: pause, playVideo: play, addEventListener} = videoInstance);
            } else {
                // it is assumed that `videoInstance` is HTMLVideoElement by default
                ({play, pause, addEventListener} = videoInstance);
            }

            // eslint-disable-next-line consistent-return
            return {
                play: play.bind(videoInstance),
                pause: pause.bind(videoInstance),
                addEventListener: addEventListener.bind(videoInstance),
            };
        }, [playerRef]);

        React.useEffect(() => {
            if (ref.current && !playingVideoRef?.contains(ref.current)) {
                setMuted(true);
            }
        }, [playingVideoRef]);

        React.useEffect(() => {
            if (showPreview) {
                playerRef?.showPreview();
            }
        }, [showPreview, playerRef]);

        React.useEffect(() => {
            if (playerRef && !started) {
                setIsPlaying(autoPlay);
            }
        }, [autoPlay, playerRef, started]);

        React.useEffect(() => setMuted(mute), [mute]);

        React.useEffect(() => {
            if (!started && isPlaying) {
                setStarted(true);
            }
        }, [isPlaying, started]);

        React.useEffect(() => {
            if (started && !Number.isNaN(Number(elapsedTime))) {
                playerRef?.seekTo(elapsedTime ?? 0, 'seconds');
            }
        }, [elapsedTime, playerRef, started]);

        React.useEffect(() => {
            const updateSize = debounce(() => {
                if (ref.current) {
                    // We need to get parent's width does not equal 0
                    const parentElement = getParentElement(ref.current);
                    const {paddingLeft, paddingRight} = getComputedStyle(parentElement);
                    const newWidth =
                        parentElement.offsetWidth -
                        parseFloat(paddingLeft) -
                        parseFloat(paddingRight);

                    setWidth(newWidth);
                    setCurrentHeight(
                        Math.floor(
                            getHeight(newWidth, ratio ?? (autoRatio ? actualRatio : undefined)),
                        ),
                    );
                }
            }, 200);

            updateSize();
            window.addEventListener('resize', updateSize, {passive: true});
            return () => {
                window.removeEventListener('resize', updateSize);
            };
        }, [actualRatio, autoRatio, ratio]);

        const playEvents = React.useMemo(
            () => eventsArray?.filter((e: AnalyticsEvent) => e.type === PredefinedEventTypes.Play),
            [eventsArray],
        );
        const stopEvents = React.useMemo(
            () => eventsArray?.filter((e: AnalyticsEvent) => e.type === PredefinedEventTypes.Stop),
            [eventsArray],
        );

        const playIcon = React.useMemo(() => {
            let playButtonContent;

            switch (type) {
                case PlayButtonType.Text:
                    playButtonContent = text;
                    break;
                case PlayButtonType.Default:
                default:
                    playButtonContent = <Icon className={b('icon')} data={PlayFill} size={24} />;
                    break;
            }

            return (
                <button
                    className={b('button', {theme, text: Boolean(text)}, buttonClassName)}
                    aria-label={i18n('play')}
                    ref={buttonRef}
                >
                    {playButtonContent}
                </button>
            );
        }, [type, theme, text, buttonClassName]);

        const changeMute = React.useCallback(
            (isMuted: boolean) => {
                if (
                    isMuted &&
                    playerRef &&
                    controls === MediaVideoControlsType.Custom &&
                    customControlsType === CustomControlsType.WithMuteButton
                ) {
                    playerRef.seekTo(0);
                    setPlayedPercent(0);
                }

                const events = isMuted ? playEvents : stopEvents;
                handleAnalytics(events);

                if (isMuted) {
                    setProps({playingVideoRef: ref.current});
                }

                // In order to the progress bar to update (equals 0) before displaying
                setTimeout(() => setMuted(!isMuted), 0);
            },
            [
                playerRef,
                customControlsType,
                playEvents,
                stopEvents,
                handleAnalytics,
                setProps,
                controls,
            ],
        );

        const handleClickPreview = React.useCallback(() => {
            setIsPlaying(true);
            onClickPreview?.();

            handleAnalytics(playEvents);
        }, [onClickPreview, handleAnalytics, playEvents]);

        const onPause = React.useCallback(() => {
            // For support correct state for youtube
            if (
                controls !== MediaVideoControlsType.Custom ||
                customControlsType !== CustomControlsType.WithMuteButton
            ) {
                setIsPlaying(false);
            }
        }, [controls, customControlsType]);

        const onStart = React.useCallback(() => {
            if (!autoPlay && !initiallyMuted) {
                setMuted(false);
            }
        }, [autoPlay, initiallyMuted]);

        const onPlay = React.useCallback(() => {
            setIsPlaying(true);

            if (
                controls === MediaVideoControlsType.Custom &&
                customControlsType === CustomControlsType.WithMuteButton
            ) {
                if (ended) {
                    changeMute(false);
                } else if (!isPlaying) {
                    changeMute(muted);
                }
                setEnded(false);
            }
        }, [changeMute, controls, customControlsType, ended, isPlaying, muted]);

        const onReady = React.useCallback((player: _ReactPlayer) => {
            setPlayerRef(player);
            const videoElement = player.getInternalPlayer();
            const videoWidth = videoElement.videoWidth as number | undefined;
            const videoHeight = videoElement.videoHeight as number | undefined;
            if (videoWidth && videoHeight) {
                setActualRatio(videoHeight / videoWidth);
            }
        }, []);

        const onProgress = React.useCallback((progress: PlayerPropgress) => {
            setPlayedPercent(progress.played);

            if (progress.played === 1) {
                setMuted(true);
            }
        }, []);

        const onEnded = React.useCallback(() => {
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

        const onPlayClick = React.useCallback(() => {
            if (isPlaying) {
                onPause();
            } else {
                onPlay();
            }
        }, [isPlaying, onPlay, onPause]);

        const handleClick = React.useCallback(() => {
            buttonRef.current?.click();

            if (controls === MediaVideoControlsType.Custom) {
                if (customControlsType === CustomControlsType.WithMuteButton) {
                    changeMute(muted);
                } else {
                    onPlayClick();
                }
            }
        }, [controls, customControlsType, changeMute, muted, onPlayClick]);

        const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
            const key = e.key.toLowerCase();

            if (key === 'enter') {
                buttonRef.current?.click();
            }
        }, []);

        const onFocusIn = React.useCallback(() => setHovered(true), []);
        const onFocusOut = React.useCallback(() => setHovered(false), []);

        return (
            <div
                className={b(
                    {
                        wrapper: !currentHeight,
                        controls,
                        contain,
                        'auto-ratio': autoRatio,
                    },
                    className,
                )}
                ref={ref}
                onClick={handleClick}
                onMouseEnter={onFocusIn}
                onMouseLeave={onFocusOut}
                onFocus={onFocusIn}
                onBlur={onFocusOut}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
            >
                {isMounted ? (
                    <React.Fragment>
                        <ReactPlayer
                            className={b('player')}
                            url={videoSrc}
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
                            onReady={onReady}
                            onPlay={onPlay}
                            onPause={
                                autoPlay && customControlsType !== CustomControlsType.WithMuteButton
                                    ? undefined
                                    : onPause
                            } // to prevent pause icon flickering when autoplayed video ends
                            onProgress={onProgress}
                            onEnded={onEnded}
                            aria-label={ariaLabel}
                            previewTabIndex={-1}
                            config={{
                                file: {
                                    attributes: {
                                        pip: isMobile ? 'false' : undefined,
                                        playsinline: isMobile ? '' : undefined,
                                        disablepictureinpicture: isMobile ? '' : undefined,
                                    },
                                },
                            }}
                        />
                        {controls === MediaVideoControlsType.Custom && (
                            <CustomBarControls
                                className={customBarControlsClassName}
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
                                muteButtonShown={muteButtonShown}
                                shown={hovered && ((!started && !previewImgUrl) || started)}
                                positioning={positioning}
                            />
                        )}
                    </React.Fragment>
                ) : null}
            </div>
        );
    },
);

function getHeight(width: number, ratio: number = 9 / 16): number {
    return width * ratio;
}

function getParentElement(element: HTMLElement): HTMLElement {
    const parentElement = element.parentElement;

    if (!parentElement) {
        return element;
    }

    return parentElement.offsetWidth ? parentElement : getParentElement(parentElement);
}

export default ReactPlayerBlock;
