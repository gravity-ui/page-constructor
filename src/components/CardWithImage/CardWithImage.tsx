import React from 'react';

import {block} from '../../utils';
import {CardWithImageProps} from '../../models';
import FullScreenImage from '../FullscreenImage/FullscreenImage';

import './CardWithImage.scss';

const b = block('card-with-image');

const CardWithImage: React.FC<CardWithImageProps> = ({
    title,
    description,
    image,
    links,
    border,
    fullScreen,
    className,
}) => (
    <div className={b(null, className)}>
        <div className={b('image', {border})}>
            {fullScreen && <FullScreenImage src={image} imageClassName={b('image-item')} />}
            {!fullScreen && <img className={b('image-item')} src={image} alt={'card-image'} />}
        </div>
        {title && <h3 className={b('title')}>{title}</h3>}
        {description && <p className={b('description')}>{description}</p>}
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
