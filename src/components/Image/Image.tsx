import React, {CSSProperties, MouseEventHandler, useContext, useState} from 'react';
import {ProjectSettingsContext} from '../../context/projectSettingsContext';
import {BREAKPOINTS} from '../../constants';
import {ImageDeviceProps, ImageObjectProps} from '../../models';

export interface ImageOwnProps extends Partial<ImageObjectProps>, Partial<ImageDeviceProps> {
    style?: CSSProperties;
    className?: string;
    onClick?: MouseEventHandler;
}

const Image = (props: ImageOwnProps) => {
    const projectSettings = useContext(ProjectSettingsContext);
    const {src, alt, disableCompress, tablet, desktop, mobile, style, className, onClick} = props;
    const [imgLoadingError, setImgLoadingError] = useState(false);

    const imageSrc = src || desktop;

    if (!imageSrc) {
        return null;
    }

    // TODO: Temporary solution for .svg images
    const disableWebp =
        projectSettings.disableCompress ||
        disableCompress ||
        imageSrc.endsWith('.svg') ||
        imgLoadingError;
    const webp = imageSrc.endsWith('.webp') ? src : src + '.webp';

    return (
        <picture>
            {disableWebp ? null : <source srcSet={webp} type="image/webp" />}
            {mobile && <source srcSet={mobile} media={`(max-width: ${BREAKPOINTS.sm}px)`} />}
            {tablet && <source srcSet={tablet} media={`(max-width: ${BREAKPOINTS.md}px)`} />}
            <img
                className={className}
                src={imageSrc}
                alt={alt}
                style={style}
                onClick={onClick}
                onError={() => setImgLoadingError(true)}
            />
        </picture>
    );
};

export default Image;
