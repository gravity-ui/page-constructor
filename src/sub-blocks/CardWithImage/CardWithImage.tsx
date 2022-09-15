import React from 'react';

import {block} from '../../utils';
import {CardWithImageProps, LinkTheme, ReactFCC} from '../../models';
import {Image, FullscreenImage} from '../../components';
import {Content} from '../';

import './CardWithImage.scss';

const b = block('card-with-image');

const CardWithImage: ReactFCC<CardWithImageProps> = ({
    title,
    description,
    image,
    disableCompress,
    links,
    border,
    fullScreen,
    className,
    additionalInfo,
    buttons,
}) => {
    const unifiedLinks = links?.map((link) => ({
        theme: 'normal' as LinkTheme,
        ...link,
        text: link.title,
        url: link.link,
    }));

    return (
        <div className={b(null, className)}>
            <div className={b('image', {border})}>
                {fullScreen ? (
                    <FullscreenImage
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
            <div className={b('content')}>
                <Content
                    title={title}
                    text={description}
                    links={unifiedLinks}
                    additionalInfo={additionalInfo}
                    buttons={buttons}
                    size="s"
                    colSizes={{all: 12, md: 12}}
                />
            </div>
        </div>
    );
};

export default CardWithImage;
