import {Device, ImageDeviceProps, StripBlockProps, StripImageProps} from '../../models';

import {StripImageMaskStyle} from './types';

export const getImageItems = (images: StripBlockProps['images']): StripImageProps[] => {
    if (!images) {
        return [];
    }

    return Array.isArray(images) ? images : [{image: images}];
};

const getMaskImage = (src: string, hidden: boolean) =>
    hidden ? 'none' : `url(${JSON.stringify(src)})`;

const isImageHidden = (hide: ImageDeviceProps['hide'], device: Device) =>
    typeof hide === 'boolean' ? hide : Boolean(hide?.[device]);

export const getImageMaskStyle = ({desktop, tablet, mobile, hide}: ImageDeviceProps) =>
    ({
        '--pc-strip-image-mask-desktop': getMaskImage(desktop, isImageHidden(hide, Device.Desktop)),
        '--pc-strip-image-mask-tablet': getMaskImage(
            tablet || desktop,
            isImageHidden(hide, Device.Tablet),
        ),
        '--pc-strip-image-mask-mobile': getMaskImage(
            mobile || desktop,
            isImageHidden(hide, Device.Mobile),
        ),
    }) as StripImageMaskStyle;
