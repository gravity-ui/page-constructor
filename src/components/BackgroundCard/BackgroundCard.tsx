import React from 'react';
import {HTML} from '@doc-tools/components';

import {block} from '../../utils';
import CardBase from '../../components/CardBase/CardBase';
import {BackgroundCardProps} from '../../models';
import BackgroundImage from '../BackgroundImage/BackgroundImage';

import './BackgroundCard.scss';

const b = block('background-card');

const BackgroundCard: React.FC<BackgroundCardProps> = (props) => {
    const {url, title, text, border, background, paddingBottom} = props;

    return (
        <CardBase className={b({padding: paddingBottom})} url={url} border={border}>
            <CardBase.Content>
                <BackgroundImage className={b('image')} {...background} />
                <h6 className={b('title')}>
                    <HTML>{title}</HTML>
                </h6>
                <HTML className={b('text')}>{text}</HTML>
            </CardBase.Content>
        </CardBase>
    );
};

export default BackgroundCard;
