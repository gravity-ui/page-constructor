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

export const ImageBase = (props: ImageBaseProps) => {
    const {Image} = React.useContext(ImageContext);

    // eslint-disable-next-line jsx-a11y/alt-text
    return Image ? <Image {...props} /> : <img {...props} />;
};

export default ImageBase;
