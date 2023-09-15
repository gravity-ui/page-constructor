import React, {CSSProperties, Fragment, MouseEventHandler, useContext, useState} from 'react';

import {BREAKPOINTS} from '../../constants';
import {ProjectSettingsContext} from '../../context/projectSettingsContext';
import {ImageDeviceProps, ImageObjectProps, QAProps} from '../../models';
import {getQaAttrubutes} from '../../utils';
import {isCompressible} from '../../utils/imageCompress';
import ImageBase from '../ImageBase/ImageBase';

import i18n from './i18n';

export interface ImageProps extends Partial<ImageObjectProps>, Partial<ImageDeviceProps>, QAProps {
    style?: CSSProperties;
    className?: string;
    onClick?: MouseEventHandler;
    containerClassName?: string;
}

const checkWebP = (src: string) => {
    return src.endsWith('.webp') ? src : src + '.webp';
};

const Image = (props: ImageProps) => {
    const projectSettings = useContext(ProjectSettingsContext);
    const {
        src: imageSrc,
        alt = i18n('img-alt'),
        disableCompress,
        tablet,
        desktop,
        mobile,
        style,
        className,
        onClick,
        containerClassName,
        qa,
    } = props;
    const [imgLoadingError, setImgLoadingError] = useState(false);

    const src = imageSrc || desktop;

    if (!src) {
        return null;
    }

    const qaAttributes = getQaAttrubutes(
        qa,
        'mobile-webp-source',
        'mobile-source',
        'tablet-webp-source',
        'tablet-source',
        'display-source',
    );

    const disableWebp =
        projectSettings.disableCompress ||
        disableCompress ||
        !isCompressible(src) ||
        imgLoadingError;

    return (
        <picture className={containerClassName} data-qa={qa}>
            {mobile && (
                <Fragment>
                    {!disableWebp && (
                        <source
                            srcSet={checkWebP(mobile)}
                            type="image/webp"
                            media={`(max-width: ${BREAKPOINTS.sm}px)`}
                            data-qa={qaAttributes.mobileWebpSource}
                        />
                    )}
                    <source
                        srcSet={mobile}
                        media={`(max-width: ${BREAKPOINTS.sm}px)`}
                        data-qa={qaAttributes.mobileSource}
                    />
                </Fragment>
            )}
            {tablet && (
                <Fragment>
                    {!disableWebp && (
                        <source
                            srcSet={checkWebP(tablet)}
                            type="image/webp"
                            media={`(max-width: ${BREAKPOINTS.md}px)`}
                            data-qa={qaAttributes.tabletWebpSource}
                        />
                    )}
                    <source
                        srcSet={tablet}
                        media={`(max-width: ${BREAKPOINTS.md}px)`}
                        data-qa={qaAttributes.tabletSource}
                    />
                </Fragment>
            )}
            {src && !disableWebp && (
                <source
                    srcSet={checkWebP(src)}
                    type="image/webp"
                    data-qa={qaAttributes.displaySource}
                />
            )}
            <ImageBase
                className={className}
                alt={alt}
                src={src}
                style={style}
                onClick={onClick}
                onError={() => setImgLoadingError(true)}
            />
        </picture>
    );
};

export default Image;
