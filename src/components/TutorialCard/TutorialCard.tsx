import React from 'react';
import {HTML} from '@doc-tools/components';

import {block} from '../../utils';
import CardBase from '../../components/CardBase/CardBase';
import {TutorialCardProps} from '../../models';

import './TutorialCard.scss';

const b = block('tutorial-card');

const TutorialCard: React.FC<TutorialCardProps> = (props) => {
    const {url, title, text, border} = props;

    return (
        <CardBase className={b()} url={url} border={border}>
            <CardBase.Content>
                <h6 className={b('title')}>
                    <HTML>{title}</HTML>
                </h6>
                <HTML>{text}</HTML>
            </CardBase.Content>
        </CardBase>
    );
};

export default TutorialCard;
