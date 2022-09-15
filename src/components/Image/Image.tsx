import React, {CSSProperties, MouseEventHandler, useContext, useState} from 'react';
import {ProjectSettingsContext} from '../../context/projectSettingsContext';
import {ReactFCC} from '../../models';

export interface ImageProps {
    src: string;
    alt?: string;
    disableCompress?: boolean;
    style?: CSSProperties;
    className?: string;
    onClick?: MouseEventHandler;
}

const Image: ReactFCC<ImageProps> = (props) => {
    const projectSettings = useContext(ProjectSettingsContext);
    const {src, alt, disableCompress, style, className, onClick} = props;
    const [imgLoadingError, setImgLoadingError] = useState(false);

    if (!src) {
        return null;
    }

    // TODO: Temporary solution for .svg images
    const disableWebp =
        projectSettings.disableCompress ||
        disableCompress ||
        src.endsWith('.svg') ||
        imgLoadingError;
    const webp = src.endsWith('.webp') ? src : src + '.webp';

    return (
        <picture>
            {disableWebp ? null : <source srcSet={webp} type="image/webp" />}
            <img
                className={className}
                src={src}
                alt={alt}
                style={style}
                onClick={onClick}
                onError={() => setImgLoadingError(true)}
            />
        </picture>
    );
};

export default Image;
