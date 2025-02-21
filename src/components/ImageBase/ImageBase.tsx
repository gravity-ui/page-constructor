import * as React from 'react';

import {ImageContext} from '../../context/imageContext/imageContext';
import {ImageObjectProps} from '../../models';

export interface ImageBaseProps extends Partial<ImageObjectProps> {
    style?: React.CSSProperties;
    className?: string;
    onClick?: React.MouseEventHandler;
    onLoad?: React.ReactEventHandler<HTMLDivElement>;
    onError?: () => void;
}

export const ImageBase = ({fetchPriority, alt, ...props}: ImageBaseProps) => {
    const {Image} = React.useContext(ImageContext);

    return Image ? (
        <Image fetchPriority={fetchPriority} alt={alt} {...props} />
    ) : (
        // There is an issue with fetchpriority attr in img in React.
        // It is still not supported. However it's nice to have ability to manage
        // this prop is good to have to improve Core Web Vitals.
        // So, here is a workaround to assign the attr.
        <img {...{fetchPriority: fetchPriority}} alt={alt} {...props} />
    );
};

export default ImageBase;
