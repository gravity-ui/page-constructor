import React from 'react';

import {block} from '../../utils';
import {CardWithImageProps} from '../../models';
import FullScreenImage from '../FullscreenImage/FullscreenImage';
import {Image} from '../index';
import {HTML} from '@doc-tools/components';

import './CardWithImage.scss';

const b = block('card-with-image');

const CardWithImage: React.FC<CardWithImageProps> = ({
    title,
    description,
    image,
    disableCompress,
    links,
    border,
    fullScreen,
    className,
}) => (
    <div className={b(null, className)}>
        <div className={b('image', {border})}>
            {fullScreen ? (
                <FullScreenImage
                    src={image}
                    imageClassName={b('image-item')}
                    disableCompress={disableCompress}
                />
            ) : (
                <Image
                    className={b('image-item')}
                    src={image}
                    alt={'card-image'}
                    disableCompress={disableCompress}
                />
            )}
        </div>
        {title && (
            <h3 className={b('title')}>
                <HTML>{title}</HTML>
            </h3>
        )}
        {description && (
            <p className={b('description')}>
                <HTML>{description}</HTML>
            </p>
        )}
        {links && (
            <div className={b('links')}>
                {links.map((item) => (
                    <a href={item.link} key={item.link} className={b('links-item')}>
                        {item.title}
                    </a>
                ))}
            </div>
        )}
    </div>
);

export default CardWithImage;
