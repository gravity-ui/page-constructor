import React from 'react';
import {block} from '../../utils';

import {ImageBlockProps} from '../../models';

import './ImageBlock.scss';

const b = block('image-block');

const ImageBlock: React.FunctionComponent<ImageBlockProps> = ({
    src,
    alt,
    width = '100%',
    height = 'auto',
}) => <img className={b()} src={src} style={{width, height}} alt={alt} />;

export default ImageBlock;
