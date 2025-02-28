import * as React from 'react';

import {Interpolation, animated, config, useSpring} from '@react-spring/web';
import debounce from 'lodash/debounce';

import {SliderBlock} from '../../../blocks';
import {ImageProps, MediaComponentImageProps, QAProps, SliderType} from '../../../models';
import {block, getQaAttrubutes} from '../../../utils';
import BackgroundImage from '../../BackgroundImage/BackgroundImage';
import FullscreenImage, {FullscreenImageProps} from '../../FullscreenImage/FullscreenImage';
import ImageView from '../../Image/Image';

import {getMediaImage} from './utils';

import './Image.scss';

const b = block('media-component-image');

export interface ImageAdditionProps {
    imageClassName?: string;
    isBackground?: boolean;
    fullscreen?: boolean;
    fullscreenClassName?: string;
    onLoad?: () => void;
}

interface InnerImageProps {
    hasVideoFallback: boolean;
}

type ImageAllProps = ImageAdditionProps & MediaComponentImageProps & InnerImageProps & QAProps;

export const defaultAnimatedDivQa = 'animated-div';

const Image = (props: ImageAllProps) => {
    const {
        parallax,
        height,
        imageClassName,
        fullscreenClassName,
        isBackground,
        hasVideoFallback,
        video,
        fullscreen,
        disableImageSliderForArrayInput,
        qa,
        onLoad,
    } = props;
    const image =
        Array.isArray(props.image) && disableImageSliderForArrayInput
            ? props.image[0]
            : props.image;

    const qaAttributes = getQaAttrubutes(
        qa,
        'fullscreen-image',
        'animate',
        'background-image',
        'image-view',
        'slider-block',
    );
    const [scrollY, setScrollY] = React.useState(0);
    const [{springScrollY}, springSetScrollY] = useSpring(() => ({
        springScrollY: 0,
        config: config.molasses,
    }));

    let parallaxInterpolate: Interpolation<number, string> | string = '';

    React.useEffect(() => {
        if (parallax) {
            const handleScroll = () => setScrollY(window.scrollY);
            const debouncedHandler = debounce(handleScroll, 5);

            window.addEventListener('scroll', debouncedHandler, {passive: true});
            return () => window.removeEventListener('scroll', debouncedHandler);
        }

        return () => {};
    });

    if (parallax) {
        const parallaxLevel = 2;
        springSetScrollY.start({springScrollY: height && scrollY > height ? height : scrollY});
        parallaxInterpolate = springScrollY.to(
            (value) => `translateY(-${Number(value) / parallaxLevel}px)`,
        );
    }

    const imageClass = b('item', {withVideo: Boolean(video) && !hasVideoFallback}, imageClassName);

    const renderFullscreenImage = (
        item: ImageProps,
        sliderData?: FullscreenImageProps['sliderData'],
    ) => {
        const itemData = getMediaImage(item);

        return (
            <FullscreenImage
                key={itemData.alt}
                {...itemData}
                imageClassName={imageClass}
                modalImageClass={fullscreenClassName}
                imageStyle={{height}}
                qa={qaAttributes.fullscreenImage}
                sliderData={sliderData}
            />
        );
    };

    const imageBackground = (oneImage: ImageProps) => {
        const imageData = getMediaImage(oneImage);
        return (
            <animated.div style={{transform: parallaxInterpolate}} data-qa={qaAttributes.animate}>
                <BackgroundImage
                    {...imageData}
                    className={imageClass}
                    style={{height}}
                    qa={qaAttributes.backgroundImage}
                />
            </animated.div>
        );
    };

    const imageOnly = (oneImage: ImageProps) => {
        const imageData = getMediaImage(oneImage);
        return (
            <ImageView
                {...imageData}
                className={imageClass}
                style={{height}}
                qa={qaAttributes.imageView}
                onLoad={onLoad}
            />
        );
    };

    const imageSlider = (imageArray: ImageProps[]) => {
        const fullscreenItem = fullscreen === undefined || fullscreen;

        return (
            <SliderBlock slidesToShow={1} type={SliderType.MediaCard}>
                {imageArray.map((item, index) => (
                    <React.Fragment key={index}>
                        {fullscreenItem
                            ? renderFullscreenImage(item, {items: imageArray, initialIndex: index})
                            : imageOnly(item)}
                    </React.Fragment>
                ))}
            </SliderBlock>
        );
    };

    if (Array.isArray(image)) {
        return imageSlider(image);
    }

    if (fullscreen) {
        return renderFullscreenImage(image);
    }

    return isBackground ? imageBackground(image) : imageOnly(image);
};

export default Image;
