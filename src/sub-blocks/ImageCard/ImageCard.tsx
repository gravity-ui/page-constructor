import React from 'react';

import {Image} from '../../components';
import {getMediaImage} from '../../components/Media/Image/utils';
import {ImageCardDirection, ImageCardMargins, ImageCardProps} from '../../models';
import {block} from '../../utils';
import Content from '../Content/Content';

import './ImageCard.scss';

const b = block('image-card');

const ImageCard = (props: ImageCardProps) => {
    const {
        border = 'shadow',
        title,
        text,
        image,
        enableImageBorderRadius = false,
        direction = ImageCardDirection.Direct,
        margins = ImageCardMargins.None,
        backgroundColor,
    } = props;

    const hasContent = Boolean(text || title);

    const renderContent = () => {
        if (!hasContent) {
            return null;
        }
        return (
            <div className={b('content')}>
                <Content title={title} text={text} colSizes={{all: 12, md: 12}} size="s" />
            </div>
        );
    };
    const renderImage = () => {
        const imageProps = getMediaImage(image);
        return (
            <div className={b('image', {margins})}>
                <Image
                    className={b('image_inner', {radius: enableImageBorderRadius})}
                    {...imageProps}
                />
            </div>
        );
    };

    return (
        <div
            className={b({border, 'with-content': hasContent, direction})}
            style={{backgroundColor}}
        >
            {direction === ImageCardDirection.Direct && (
                <React.Fragment>
                    {renderImage()}
                    {renderContent()}
                </React.Fragment>
            )}
            {direction === ImageCardDirection.Reverse && (
                <React.Fragment>
                    {renderContent()}
                    {renderImage()}
                </React.Fragment>
            )}
        </div>
    );
};

export default ImageCard;
