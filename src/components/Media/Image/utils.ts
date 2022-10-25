import {ImageProps} from '../../../models';

export function getMediaImage(image: ImageProps) {
    return typeof image === 'string' ? {src: image} : image;
}
