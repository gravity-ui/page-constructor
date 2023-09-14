import React, {
    Fragment,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';

import {Icon} from '@gravity-ui/uikit';
import debounce from 'lodash/debounce';
import ReactPlayer from 'react-player';

import {MetrikaContext} from '../../context/metrikaContext';
import {MobileContext} from '../../context/mobileContext';
import {VideoContext} from '../../context/videoContext';
import {useAnalytics, useMount} from '../../hooks';
import {PlayVideo} from '../../icons';
import {
    AnalyticsEvent,
    ClassNameProps,
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
import i18n from './i18n';
import {checkYoutubeVideos} from './utils';

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
            analyticsEvents,
            height,
            ariaLabel,
        } = props;

        const {
            type = PlayButtonType.Default,
            theme = PlayButtonThemes.Blue,
            text,
            className: buttonClassName,
        } = playButton || ({} as PlayButtonProps);
        const {
            type: customControlsType = CustomControlsType.WithMuteButton,
            muteButtonHidden,
            backgroundShadowHidden,
        } = customControlsOptions;

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
        const [ended, setEnded] = useState<boolean>(false);
        const [isMounted, setIsMounted] = useState(false);
        const [hovered, setHovered] = useState(false);

        useMount(() => setIsMounted(true));

        const videoSrc = useMemo(() => checkYoutubeVideos(src), [src]);

        const eventsArray = useMemo(() => {
            if (analyticsEvents) {
                return Array.isArray(analyticsEvents) ? analyticsEvents : [analyticsEvents];
            }

            return [];
        }, [analyticsEvents]);
        const handleAnalytics = useAnalytics(DefaultEventNames.ReactPlayerControls);

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
            if (playerRef && !started) {
                setIsPlaying(autoPlay);
            }
        }, [autoPlay, playerRef, started]);

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
                    setCurrentHeight(Math.floor(getHeight(newWidth)));
                }
            }, 200);

            updateSize();
            window.addEventListener('resize', updateSize, {passive: true});
            return () => {
                window.removeEventListener('resize', updateSize);
            };
        }, []);

        const playEvents = useMemo(
            () => eventsArray?.filter((e: AnalyticsEvent) => e.type === PredefinedEventTypes.Play),
            [eventsArray],
        );
        const stopEvents = useMemo(
            () => eventsArray?.filter((e: AnalyticsEvent) => e.type === PredefinedEventTypes.Stop),
            [eventsArray],
        );

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
                <button
                    className={b('button', {theme, text: Boolean(text)}, buttonClassName)}
                    aria-label={i18n('play')}
                >
                    {playButtonContent}
                </button>
            );
        }, [type, theme, text, buttonClassName]);

        const changeMute = useCallback(
            (isMuted: boolean) => {
                if (
                    isMuted &&
                    playerRef &&
                    customControlsType === CustomControlsType.WithMuteButton
                ) {
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
                metrika,
                videoMetrika,
                playEvents,
                stopEvents,
                handleAnalytics,
                setProps,
            ],
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

            handleAnalytics(playEvents);
        }, [onClickPreview, metrika, videoMetrika, handleAnalytics, playEvents]);

        const onPause = useCallback(() => {
            // For support correct state for youtube
            if (
                controls !== MediaVideoControlsType.Custom ||
                customControlsType !== CustomControlsType.WithMuteButton
            ) {
                setIsPlaying(false);
            }
        }, [controls, customControlsType]);

        const onStart = useCallback(() => {
            if (!autoPlay && !initiallyMuted) {
                setMuted(false);
            }
        }, [autoPlay, initiallyMuted]);

        const onPlay = useCallback(() => {
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

        const onProgress = useCallback((progress: PlayerPropgress) => {
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

        const onPlayClick = useCallback(() => {
            if (isPlaying) {
                onPause();
            } else {
                onPlay();
            }
        }, [isPlaying, onPlay, onPause]);

        const handleClick = useCallback(() => {
            if (customControlsType === CustomControlsType.WithMuteButton) {
                changeMute(muted);
            } else {
                onPlayClick();
            }
        }, [changeMute, customControlsType, muted, onPlayClick]);

        const onFocusIn = useCallback(() => setHovered(true), []);
        const onFocusOut = useCallback(() => setHovered(false), []);

        return (
            <div
                className={b(
                    {
                        wrapper: !currentHeight,
                        controls,
                        'background-shadow-rendered':
                            !backgroundShadowHidden &&
                            started &&
                            controls === MediaVideoControlsType.Custom,
                        'background-shadow-shown': hovered,
                    },
                    className,
                )}
                ref={ref}
                onClick={handleClick}
                onMouseEnter={onFocusIn}
                onMouseLeave={onFocusOut}
                onFocus={onFocusIn}
                onBlur={onFocusOut}
            >
                {isMounted ? (
                    <Fragment>
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
                            onReady={setPlayerRef}
                            onPlay={onPlay}
                            onPause={onPause}
                            onProgress={onProgress}
                            onEnded={onEnded}
                            aria-label={ariaLabel}
                        />
                        {controls === MediaVideoControlsType.Custom && (
                            <CustomBarControls
                                className={b(
                                    'custom-bar-controls',
                                    {
                                        shown: hovered && ((!started && !previewImgUrl) || started),
                                    },
                                    customBarControlsClassName,
                                )}
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
                                isMuteButtonHidden={muteButtonHidden}
                            />
                        )}
                    </Fragment>
                ) : null}
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
