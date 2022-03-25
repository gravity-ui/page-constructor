import {ImageObjectProps, ImageProps} from '../../../models';

export function unifyImageToObject(image: ImageProps): ImageObjectProps {
    return typeof image === 'string' ? {src: image} : image;
}
