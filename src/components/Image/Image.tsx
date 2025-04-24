import * as React from 'react';

import {BREAKPOINTS} from '../../constants';
import {ProjectSettingsContext} from '../../context/projectSettingsContext';
import {Device, ImageDeviceProps, ImageObjectProps, QAProps} from '../../models';
import {getQaAttrubutes} from '../../utils';
import {isCompressible} from '../../utils/imageCompress';
import ImageBase from '../ImageBase/ImageBase';

export interface ImageProps extends Partial<ImageObjectProps>, Partial<ImageDeviceProps>, QAProps {
    style?: React.CSSProperties;
    className?: string;
    onClick?: React.MouseEventHandler;
    onLoad?: React.ReactEventHandler<HTMLDivElement>;
    containerClassName?: string;
}

export interface DeviceSpecificFragmentProps extends QAProps {
    disableWebp: boolean;
    src: string;
    maxBreakpoint?: number;
    minBreakpoint?: number;
}

const checkWebP = (src: string) => {
    return src.endsWith('.webp') ? src : src + '.webp';
};

export const EMPTY_IMG =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjwvc3ZnPg==';

const DeviceSpecificFragment = ({
    disableWebp,
    src,
    maxBreakpoint,
    minBreakpoint,
    qa,
}: DeviceSpecificFragmentProps) => {
    const media: string[] = [];

    if (maxBreakpoint) {
        media.push(`(max-width: ${maxBreakpoint}px)`);
    }

    if (minBreakpoint) {
        media.push(`(min-width: ${minBreakpoint}px)`);
    }

    const mediaString = media.join(' and ');

    return (
        <React.Fragment>
            {!disableWebp && (
                <source
                    srcSet={checkWebP(src)}
                    type="image/webp"
                    media={mediaString}
                    data-qa={`${qa}-compressed`}
                />
            )}
            <source srcSet={src} media={mediaString} data-qa={qa} />
        </React.Fragment>
    );
};

const Image = (props: ImageProps) => {
    const projectSettings = React.useContext(ProjectSettingsContext);
    const {
        src: imageSrc,
        alt,
        disableCompress,
        tablet,
        desktop,
        mobile,
        style,
        className,
        onClick,
        onLoad,
        containerClassName,
        qa,
        fetchPriority,
        loading,
        hide,
    } = props;
    const [imgLoadingError, setImgLoadingError] = React.useState(false);

    const src = imageSrc || desktop;

    const hideDevices =
        typeof hide === 'boolean' || !hide
            ? Object.values(Device).reduce(
                  (acc, device) => ({...acc, [device]: Boolean(hide)}),
                  {} as Record<Device, boolean>,
              )
            : hide;

    const qaAttributes = getQaAttrubutes(
        qa,
        'mobile-webp-source',
        'mobile-source',
        'tablet-webp-source',
        'tablet-source',
        'desktop-source',
        'desktop-source-compressed',
    );

    const disableWebp =
        !src ||
        projectSettings.disableCompress ||
        disableCompress ||
        !isCompressible(src) ||
        imgLoadingError;

    return (
        <picture className={containerClassName} data-qa={qa}>
            {(mobile || hideDevices.mobile) && (
                <DeviceSpecificFragment
                    src={mobile || EMPTY_IMG}
                    disableWebp={disableWebp || Boolean(hideDevices.mobile)}
                    maxBreakpoint={BREAKPOINTS.sm}
                    qa={qaAttributes.mobileSource}
                />
            )}
            {(tablet || hideDevices.tablet) && (
                <DeviceSpecificFragment
                    src={tablet || EMPTY_IMG}
                    disableWebp={disableWebp || Boolean(hideDevices.tablet)}
                    maxBreakpoint={BREAKPOINTS.md}
                    minBreakpoint={BREAKPOINTS.sm}
                    qa={qaAttributes.tabletSource}
                />
            )}
            {hideDevices.desktop && (
                <DeviceSpecificFragment
                    src={EMPTY_IMG}
                    disableWebp
                    minBreakpoint={BREAKPOINTS.md}
                    qa={qaAttributes.desktopSource}
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
                fetchPriority={fetchPriority}
                loading={loading}
                onClick={onClick}
                onError={() => setImgLoadingError(true)}
                onLoad={onLoad}
            />
        </picture>
    );
};

export default Image;
