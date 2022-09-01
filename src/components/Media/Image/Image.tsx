import React, {useEffect, useState} from 'react';
import {animated, config, Interpolation, useSpring} from 'react-spring';
import _ from 'lodash';

import SliderBlock from '../../../blocks/Slider/Slider';
import {ImageProps, MediaComponentImageProps, SliderType} from '../../../models';
import {getMediaImage} from './utils';
import FullScreenImage from '../../FullscreenImage/FullscreenImage';
import BackgroundImage from '../../BackgroundImage/BackgroundImage';
import {block} from '../../../utils';
import ImageView from '../../Image/Image';

import './Image.scss';

const b = block('media-component-image');

export interface ImageAdditionProps {
    imageClassName?: string;
    isBackground?: boolean;
}

interface InnerImageProps {
    hasVideoFallback: boolean;
}

type ImageAllProps = ImageAdditionProps & MediaComponentImageProps & InnerImageProps;

const Image: React.FC<ImageAllProps> = (props) => {
    const {parallax, image, height, imageClassName, isBackground, hasVideoFallback, video} = props;

    const [scrollY, setScrollY] = useState(0);
    const [{springScrollY}, springSetScrollY] = useSpring(() => ({
        springScrollY: 0,
        config: config.molasses,
    }));

    let parallaxInterpolate: Interpolation<number, string> | string = '';

    useEffect(() => {
        if (parallax) {
            const handleScroll = () => setScrollY(window.scrollY);
            window.addEventListener('scroll', _.debounce(handleScroll, 5));
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

    const imageSlider = (imageArray: ImageProps[]) => (
        <SliderBlock slidesToShow={1} type={SliderType.MediaCard}>
            {imageArray.map((item) => {
                const itemData = getMediaImage(item);

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

    const imageBackground = (oneImage: ImageProps) => {
        const imageData = getMediaImage(oneImage);
        return (
            <animated.div style={{transform: parallaxInterpolate}}>
                <BackgroundImage
                    className={imageClass}
                    src={imageData.src}
                    style={{height}}
                    disableCompress={imageData.disableCompress}
                />
            </animated.div>
        );
    };

    const imageOnly = (oneImage: ImageProps) => {
        const imageData = getMediaImage(oneImage);
        return (
            <ImageView
                className={imageClass}
                src={imageData.src}
                alt={imageData.alt}
                style={{height}}
                disableCompress={imageData.disableCompress}
            />
        );
    };

    if (Array.isArray(image)) {
        return imageSlider(image);
    }

    return isBackground ? imageBackground(image) : imageOnly(image);
};

export default Image;
