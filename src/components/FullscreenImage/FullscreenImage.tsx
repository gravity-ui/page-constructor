import React, {CSSProperties} from 'react';

import {block} from '../../utils';
import FullscreenWrapper from '../FullscreenWrapper/FullscreenWrapper';
import Image, {ImageProps} from '../Image/Image';

import i18n from './i18n';

import './FullScreenImage.scss';

export interface FullScreenImageProps extends ImageProps {
    imageClassName?: string;
    modalImageClass?: string;
    imageStyle?: CSSProperties;
}

const b = block('FullScreenImage');

const FullScreenImage = (props: FullScreenImageProps) => {
    const {imageClassName, modalImageClass, imageStyle, alt = i18n('img-alt')} = props;

    const image = (
        <Image {...props} alt={alt} className={b('image', imageClassName)} style={imageStyle} />
    );

    const fullscreenImage = <Image {...props} className={b('modal-image', modalImageClass)} />;

    return <FullscreenWrapper className={b()} media={image} fullscreenMedia={fullscreenImage} />;
};

export default FullScreenImage;
