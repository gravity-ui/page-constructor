import React from 'react';
import {block} from '../../utils';

import {CardBase, HTML} from '../../components';
import {NewsCardProps} from '../../models';

import './NewsCard.scss';

const b = block('news-card');

const NewsCard = (props: NewsCardProps) => {
    const {date, isoDate, title, border, url} = props;

    return (
        <CardBase className={b()} url={url} border={border}>
            <CardBase.Content>
                {isoDate ? (
                    <time className={b('date')} dateTime={isoDate}>
                        {date}
                    </time>
                ) : (
                    <p className={b('date')}>{date}</p>
                )}
                <h4 className={b('title')}>
                    <HTML>{title}</HTML>
                </h4>
            </CardBase.Content>
        </CardBase>
    );
};

export default NewsCard;
