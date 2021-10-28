import React, {CSSProperties, MouseEventHandler} from 'react';

export interface ImageProps {
    src: string;
    alt?: string;
    disableCompress?: boolean;
    style?: CSSProperties;
    className?: string;
    onClick?: MouseEventHandler;
}

const Image: React.FC<ImageProps> = (props) => {
    const {src, alt, disableCompress, style, className, onClick} = props;

    if (!src) {
        return null;
    }

    // TODO: Temporary solution for .svg images
    const disableWebp = disableCompress || src.endsWith('.svg');
    const webp = src + '.webp';

    return (
        <picture>
            {disableWebp ? null : <source srcSet={webp} type="image/webp" />}
            <img className={className} src={src} alt={alt} style={style} onClick={onClick} />
        </picture>
    );
};

export default Image;
