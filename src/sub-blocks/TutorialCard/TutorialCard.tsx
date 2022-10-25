import React from 'react';

import {block} from '../../utils';
import CardBase from '../../components/CardBase/CardBase';
import {ImageProps, TutorialCardProps} from '../../models';
import {Image, HTML} from '../../components/';

import {getMediaImage} from '../../components/Media/Image/utils';

import './TutorialCard.scss';

const b = block('tutorial-card');

function iconElement(icon: ImageProps, title: string) {
    const image = getMediaImage(icon ?? {});

    return <Image {...image} alt={image.alt || title} className={b('icon')} />;
}

const TutorialCard = (props: TutorialCardProps) => {
    const {url, title, text, border, icon} = props;

    return (
        <CardBase className={b()} url={url} border={border}>
            <CardBase.Content>
                {icon && iconElement(icon, title)}
                <h6 className={b('title')}>
                    <HTML>{title}</HTML>
                </h6>
                <HTML>{text}</HTML>
            </CardBase.Content>
        </CardBase>
    );
};

export default TutorialCard;
