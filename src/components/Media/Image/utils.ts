import {ImageObjectProps, ImageProps} from '../../../models';

export function getMediaImage(image: ImageProps): ImageObjectProps {
    return typeof image === 'string' ? {src: image} : image;
}
