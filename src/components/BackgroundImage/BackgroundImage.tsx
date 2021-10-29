import React, {CSSProperties} from 'react';
import {block} from '../../utils';

import Image from '../Image/Image';

import './BackgroundImage.scss';

export interface BackgroundImageProps extends React.HTMLProps<HTMLDivElement> {
    src?: string;
    alt?: string;
    disableCompress?: boolean;
    style?: CSSProperties;
    imageClassName?: string;
}

const b = block('storage-background-image');

const BackgroundImage: React.FC<BackgroundImageProps> = (props) => {
    const {children, src, alt, disableCompress, className, imageClassName, style} = props;

    return (
        <div className={b(null, className)} style={style}>
            {src && (
                <Image
                    className={b('img', imageClassName)}
                    src={src}
                    alt={alt}
                    disableCompress={disableCompress}
                />
            )}
            {children && <div className={b('container')}>{children}</div>}
        </div>
    );
};

export default BackgroundImage;
