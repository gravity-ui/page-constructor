import React, {CSSProperties, MouseEventHandler} from 'react';

import {ImageContext} from '../../context/imageContext/imageContext';
import {ImageObjectProps} from '../../models';

export interface ImageBaseProps extends Partial<ImageObjectProps> {
    style?: CSSProperties;
    className?: string;
    onClick?: MouseEventHandler;
    onError?: () => void;
}

export const ImageBase = (props: ImageBaseProps) => {
    const {Image} = React.useContext(ImageContext);

    return Image ? <Image {...props} /> : <img {...props} />;
};

export default ImageBase;
