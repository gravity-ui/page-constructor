import React from 'react';
import {HTML} from '@doc-tools/components';

import {block} from '../../utils';
import CardBase from '../../components/CardBase/CardBase';
import {ImageProps, TutorialCardProps} from '../../models';
import Image from '../../components/Image/Image';

import {unifyImageToObject} from '../Media/Image/utils';

import './TutorialCard.scss';

const b = block('tutorial-card');

function iconElement(icon: ImageProps, title: string) {
    const {src, alt = title, disableCompress} = unifyImageToObject(icon ?? {});

    return <Image src={src} alt={alt} className={b('icon')} disableCompress={disableCompress} />;
}

const TutorialCard: React.FC<TutorialCardProps> = (props) => {
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
