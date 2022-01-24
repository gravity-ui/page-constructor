import React from 'react';
import block from 'bem-cn-lite';
import {HTML} from '@doc-tools/components';
import {CardBase} from '../index';

import {NewsCardProps} from '../../models';

import './NewsCard.scss';

const b = block('news-card');

const NewsCard: React.FC<NewsCardProps> = (props) => {
    const {date, title, border, url} = props;

    return (
        <CardBase className={b()} url={url} border={border}>
            <CardBase.Content>
                <p className={b('date')}>{date}</p>
                <h4 className={b('title')}>
                    <HTML>{title}</HTML>
                </h4>
            </CardBase.Content>
        </CardBase>
    );
};

export default NewsCard;
