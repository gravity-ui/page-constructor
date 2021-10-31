import _ from 'lodash';
import React, {ReactNode, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useSpring, animated, config, Interpolation} from 'react-spring';

import {block} from '../../utils';
import {MediaProps, PlayButtonProps, MediaVideoType} from '../../models';
import {getVideoTypesWithPriority, unifyImageToObject} from './utils';
import YoutubeBlock from '../VideoBlock/VideoBlock';
import FullScreenImage from '../FullscreenImage/FullscreenImage';
import Image from '../Image/Image';
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import ReactPlayerBlock from '../ReactPlayer/ReactPlayer';
import SliderBlock, {SliderType} from '../../blocks/Slider/Slider';

import './Media.scss';

const b = block('Media');

interface MediaAllProps extends MediaProps {
    className?: string;
    imageClassName?: string;
    videoClassName?: string;
    youtubeClassName?: string;
    isBackground?: boolean;
    playVideo?: boolean;
    playButton?: PlayButtonProps;
    customBarControlsClassName?: string;
}

const Media: React.FC<MediaAllProps> = (props) => {
    const {
        image,
        video,
        youtube,
        color,
        height,
        previewImg,
        parallax = false,
        isBackground,
        playButton: commonPlayButton,
        customBarControlsClassName,
        metrika,
    } = props;
    const {className, imageClassName, videoClassName, youtubeClassName, playVideo = true} = props;

    const [hasVideoFallback, setHasVideoFallback] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [{springScrollY}, springSetScrollY] = useSpring(() => ({
        springScrollY: 0,
        config: config.molasses,
    }));

    const ref = useRef<HTMLVideoElement>(null);
    let imageContent: ReactNode = null;
    let parallaxInterpolate: Interpolation<number, string> | string = '';

    useEffect(() => {
        if (parallax) {
            const handleScroll = () => setScrollY(window.scrollY);
            window.addEventListener('scroll', _.debounce(handleScroll, 5));
            return () => window.removeEventListener('scroll', _.debounce(handleScroll, 5));
        }

        return () => {};
    });

    useEffect(() => {
        if (video && ref && ref.current) {
            const {loop} = video;

            if (loop && typeof loop !== 'boolean') {
                const {start = 0, end} = loop;

                ref.current.addEventListener('timeupdate', () => {
                    const videoRef = ref.current;
                    const endTime = end || (videoRef && videoRef.duration);

                    if (videoRef && videoRef.currentTime === endTime) {
                        videoRef.currentTime = start;
                        videoRef.play().catch(() => setHasVideoFallback(true));
                    }
                });
            }

            if (playVideo) {
                ref.current.play().catch(() => setHasVideoFallback(true));
            }
        }
    }, [playVideo, video]);

    if (parallax) {
        const parallaxLevel = 2;
        springSetScrollY({springScrollY: height && scrollY > height ? height : scrollY});
        parallaxInterpolate = springScrollY.interpolate(
            (value) => `translateY(-${Number(value) / parallaxLevel}px)`,
        );
    }

    if (image) {
        const imageClass = b(
            'image',
            {withVideo: Boolean(video) && !hasVideoFallback},
            imageClassName,
        );

        // ImageProps[]
        if (Array.isArray(image)) {
            imageContent = (
                <SliderBlock slidesToShow={1} type={SliderType.MediaCard}>
                    {image.map((item) => {
                        const itemData = unifyImageToObject(item);

                        return (
                            <FullScreenImage
                                key={itemData.src}
                                src={itemData.src}
                                alt={itemData.alt}
                                imageClassName={imageClass}
                                imageStyle={{height}}
                            />
                        );
                    })}
                </SliderBlock>
            );

            // ImageProp
        } else {
            const imageData = unifyImageToObject(image);

            if (isBackground) {
                imageContent = (
                    <animated.div style={{transform: parallaxInterpolate}}>
                        <BackgroundImage
                            className={imageClass}
                            src={imageData.src}
                            style={{height}}
                            disableCompress={imageData.disableCompress}
                        />
                    </animated.div>
                );

                // Is IMG
            } else {
                imageContent = (
                    <Image
                        className={imageClass}
                        src={imageData.src}
                        alt={imageData.alt}
                        style={{height}}
                        disableCompress={imageData.disableCompress}
                    />
                );
            }
        }
    }

    const defaultVideoBlock = useMemo(() => {
        return (
            video?.src?.length &&
            !hasVideoFallback && (
                <div className={b('video-wrap', videoClassName)} style={{height}}>
                    <video
                        disablePictureInPicture={true}
                        playsInline={true}
                        // @ts-ignore
                        pip="false"
                        className={b('video')}
                        ref={ref}
                        preload="metadata"
                        muted={true}
                    >
                        {getVideoTypesWithPriority(video.src).map(({src, type}, index) => (
                            <source key={index} src={src} type={type} />
                        ))}
                    </video>
                </div>
            )
        );
    }, [video, videoClassName, hasVideoFallback, height]);

    const reactPlayerBlock = useMemo(() => {
        if (!video) {
            return null;
        }

        const {src, loop, controls, muted, autoplay = true, elapsedTime, playButton} = video;

        return (
            <ReactPlayerBlock
                className={b('react-player', videoClassName)}
                src={src}
                previewImgUrl={previewImg}
                loop={Boolean(loop)}
                controls={controls}
                muted={muted}
                autoplay={autoplay && playVideo}
                elapsedTime={elapsedTime}
                playButton={playButton || commonPlayButton}
                customBarControlsClassName={customBarControlsClassName}
                metrika={metrika}
            />
        );
    }, [
        video,
        metrika,
        previewImg,
        playVideo,
        videoClassName,
        commonPlayButton,
        customBarControlsClassName,
    ]);

    const reactYoutubeBlock = useMemo(() => {
        return (
            <YoutubeBlock
                className={b('youtube', youtubeClassName)}
                record={youtube}
                attributes={{color: 'white', rel: '0'}}
                previewImg={previewImg}
            />
        );
    }, [youtubeClassName, youtube, previewImg]);

    const renderVideoBlock = useCallback(() => {
        if (youtube) {
            return reactYoutubeBlock;
        }

        switch (video?.type) {
            case MediaVideoType.Player:
                return reactPlayerBlock;
            case MediaVideoType.Default:
            default:
                return defaultVideoBlock;
        }
    }, [video, youtube, reactYoutubeBlock, reactPlayerBlock, defaultVideoBlock]);

    return (
        <div className={b(null, className)} style={{backgroundColor: color}}>
            {imageContent}
            {renderVideoBlock()}
        </div>
    );
};

export default Media;
