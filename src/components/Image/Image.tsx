import React, {CSSProperties, MouseEventHandler, useContext, useState, Fragment} from 'react';
import {ProjectSettingsContext} from '../../context/projectSettingsContext';
import {BREAKPOINTS} from '../../constants';
import {ImageDeviceProps, ImageObjectProps} from '../../models';
import {block} from '../../utils';

import './Image.scss';

const b = block('Image');

export interface ImageProps extends Partial<ImageObjectProps>, Partial<ImageDeviceProps> {
    style?: CSSProperties;
    className?: string;
    onClick?: MouseEventHandler;
}

const checkWebP = (src: string) => {
    return src.endsWith('.webp') ? src : src + '.webp';
};

const Image = (props: ImageProps) => {
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

    return (
        <picture className={b()}>
            {mobile && (
                <Fragment>
                    {!disableWebp && (
                        <source
                            srcSet={checkWebP(mobile)}
                            type="image/webp"
                            media={`(max-width: ${BREAKPOINTS.sm}px)`}
                        />
                    )}
                    <source srcSet={mobile} media={`(max-width: ${BREAKPOINTS.sm}px)`} />
                </Fragment>
            )}
            {tablet && (
                <Fragment>
                    {!disableWebp && (
                        <source
                            srcSet={checkWebP(tablet)}
                            type="image/webp"
                            media={`(max-width: ${BREAKPOINTS.md}px)`}
                        />
                    )}
                    <source srcSet={tablet} media={`(max-width: ${BREAKPOINTS.md}px)`} />
                </Fragment>
            )}
            {desktop && !disableWebp && <source srcSet={checkWebP(imageSrc)} type="image/webp" />}
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
