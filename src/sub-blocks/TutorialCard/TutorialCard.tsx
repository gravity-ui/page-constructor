import React from 'react';

import {block} from '../../utils';
import CardBase from '../../components/CardBase/CardBase';
import {ImageProps, TutorialCardProps, ReactFCC} from '../../models';
import {Image, HTML} from '../../components/';

import {getMediaImage} from '../../components/Media/Image/utils';

import './TutorialCard.scss';

const b = block('tutorial-card');

function iconElement(icon: ImageProps, title: string) {
    const {src, alt = title, disableCompress} = getMediaImage(icon ?? {});

    return <Image src={src} alt={alt} className={b('icon')} disableCompress={disableCompress} />;
}

const TutorialCard: ReactFCC<TutorialCardProps> = (props) => {
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
