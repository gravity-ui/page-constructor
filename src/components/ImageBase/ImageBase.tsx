import React, {CSSProperties, MouseEventHandler, ReactEventHandler} from 'react';

import {ImageContext} from '../../context/imageContext/imageContext';
import {ImageObjectProps} from '../../models';

export interface ImageBaseProps extends Partial<ImageObjectProps> {
    style?: CSSProperties;
    className?: string;
    onClick?: MouseEventHandler;
    onLoad?: ReactEventHandler<HTMLDivElement>;
    onError?: () => void;
}

export const ImageBase = ({fetchPriority, ...props}: ImageBaseProps) => {
    const {Image} = React.useContext(ImageContext);

    return Image ? (
        <Image fetchPriority={fetchPriority} {...props} />
    ) : (
        // There is an issue with fetchpriority attr in img in React.
        // It is still not supported. However it's nice to have ability to manage
        // this prop is good to have to improve Core Web Vitals.
        // So, here is a workaround to assign the attr.
        // eslint-disable-next-line jsx-a11y/alt-text
        <img {...{fetchpriority: fetchPriority}} {...props} />
    );
};

export default ImageBase;
