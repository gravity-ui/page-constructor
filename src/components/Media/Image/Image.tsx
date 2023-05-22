import React, {useEffect, useState} from 'react';

import _ from 'lodash';
import {Interpolation, animated, config, useSpring} from 'react-spring';

import SliderBlock from '../../../blocks/Slider/Slider';
import {ImageProps, MediaComponentImageProps, SliderType} from '../../../models';
import {block} from '../../../utils';
import BackgroundImage from '../../BackgroundImage/BackgroundImage';
import FullScreenImage from '../../FullscreenImage/FullscreenImage';
import ImageView from '../../Image/Image';

import {getMediaImage} from './utils';

import './Image.scss';

const b = block('media-component-image');

export interface ImageAdditionProps {
    imageClassName?: string;
    isBackground?: boolean;
    fullScreen?: boolean;
}

interface InnerImageProps {
    hasVideoFallback: boolean;
}

type ImageAllProps = ImageAdditionProps & MediaComponentImageProps & InnerImageProps;

const Image = (props: ImageAllProps) => {
    const {
        parallax,
        image,
        height,
        imageClassName,
        isBackground,
        hasVideoFallback,
        video,
        fullScreen,
    } = props;

    const [scrollY, setScrollY] = useState(0);
    const [{springScrollY}, springSetScrollY] = useSpring(() => ({
        springScrollY: 0,
        config: config.molasses,
    }));

    let parallaxInterpolate: Interpolation<number, string> | string = '';

    useEffect(() => {
        if (parallax) {
            const handleScroll = () => setScrollY(window.scrollY);
            window.addEventListener('scroll', _.debounce(handleScroll, 5), {passive: true});
            return () => window.removeEventListener('scroll', _.debounce(handleScroll, 5));
        }

        return () => {};
    });

    if (parallax) {
        const parallaxLevel = 2;
        springSetScrollY({springScrollY: height && scrollY > height ? height : scrollY});
        parallaxInterpolate = springScrollY.interpolate(
            (value) => `translateY(-${Number(value) / parallaxLevel}px)`,
        );
    }

    const imageClass = b('item', {withVideo: Boolean(video) && !hasVideoFallback}, imageClassName);

    const fullscreenImage = (item: ImageProps) => {
        const itemData = getMediaImage(item);

        return (
            <FullScreenImage
                key={itemData.alt}
                {...itemData}
                imageClassName={imageClass}
                imageStyle={{height}}
            />
        );
    };

    const imageBackground = (oneImage: ImageProps) => {
        const imageData = getMediaImage(oneImage);
        return (
            <animated.div style={{transform: parallaxInterpolate}}>
                <BackgroundImage {...imageData} className={imageClass} style={{height}} />
            </animated.div>
        );
    };

    const imageOnly = (oneImage: ImageProps) => {
        const imageData = getMediaImage(oneImage);
        return <ImageView {...imageData} className={imageClass} style={{height}} />;
    };

    const imageSlider = (imageArray: ImageProps[]) => {
        const fullscreenItem = fullScreen === undefined || fullScreen;

        return (
            <SliderBlock slidesToShow={1} type={SliderType.MediaCard}>
                {imageArray.map((item) =>
                    fullscreenItem ? fullscreenImage(item) : imageOnly(item),
                )}
            </SliderBlock>
        );
    };

    if (Array.isArray(image)) {
        return imageSlider(image);
    }

    if (fullScreen) {
        return fullscreenImage(image);
    }

    return isBackground ? imageBackground(image) : imageOnly(image);
};

export default Image;
