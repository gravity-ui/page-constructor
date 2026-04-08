import * as React from 'react';

import {ImageContext} from '../../context/imageContext/imageContext';
import {ImageObjectProps} from '../../models';

export interface ImageBaseProps extends Partial<ImageObjectProps> {
    style?: React.CSSProperties;
    className?: string;
    onClick?: React.MouseEventHandler;
    onLoad?: React.ReactEventHandler<HTMLImageElement>;
    onError?: () => void;
}

export const ImageBase = React.forwardRef<HTMLImageElement, ImageBaseProps>(
    ({fetchPriority, alt, ...props}, ref) => {
        const {Image} = React.useContext(ImageContext);

        return Image ? (
            <Image fetchPriority={fetchPriority} alt={alt} {...props} ref={ref} />
        ) : (
            // There is an issue with fetchpriority attr in img in React.
            // It is still not supported. However it's nice to have ability to manage
            // this prop is good to have to improve Core Web Vitals.
            // So, here is a workaround to assign the attr.
            <img {...{fetchPriority: fetchPriority}} alt={alt} {...props} ref={ref} />
        );
    },
);

ImageBase.displayName = 'ImageBase';

export default ImageBase;
