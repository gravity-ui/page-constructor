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

export interface DeviceSpecificFragmentProps extends QAProps {
    disableWebp: boolean;
    src: string;
    breakpoint: number;
}

const checkWebP = (src: string) => {
    return src.endsWith('.webp') ? src : src + '.webp';
};

const DeviceSpecificFragment = ({
    disableWebp,
    src,
    breakpoint,
    qa,
}: DeviceSpecificFragmentProps) => (
    <Fragment>
        {!disableWebp && (
            <source
                srcSet={checkWebP(src)}
                type="image/webp"
                media={`(max-width: ${breakpoint}px)`}
                data-qa={`${qa}-compressed`}
            />
        )}
        <source srcSet={src} media={`(max-width: ${breakpoint}px)`} data-qa={qa} />
    </Fragment>
);

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
        'desktop-source-compressed',
    );

    const disableWebp =
        projectSettings.disableCompress ||
        disableCompress ||
        !isCompressible(src) ||
        imgLoadingError;

    return (
        <picture className={containerClassName} data-qa={qa}>
            {mobile && (
                <DeviceSpecificFragment
                    src={mobile}
                    disableWebp={disableWebp}
                    breakpoint={BREAKPOINTS.sm}
                    qa={qaAttributes.mobileSource}
                />
            )}
            {tablet && (
                <DeviceSpecificFragment
                    src={tablet}
                    disableWebp={disableWebp}
                    breakpoint={BREAKPOINTS.md}
                    qa={qaAttributes.tabletSource}
                />
            )}
            {src && !disableWebp && (
                <source
                    srcSet={checkWebP(src)}
                    type="image/webp"
                    data-qa={qaAttributes.desktopSourceCompressed}
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
