import React, {Fragment, useCallback, useContext} from 'react';

import {Image, Title} from '../../components';
import {LocationContext} from '../../context/locationContext';
import {useAnalytics} from '../../hooks';
import {AnalyticsEventsBase, IconsBlockProps} from '../../models';
import {block, getLinkProps} from '../../utils';

import './Icons.scss';

const b = block('icons-block');

const getItemContent = (item: IconsBlockProps['items'][number]) => (
    <Fragment>
        <Image className={b('image')} src={item.src} />
        <p className={b('text')}>{item.text}</p>
    </Fragment>
);

const Icons = ({title, size = 's', items}: IconsBlockProps) => {
    const {hostname} = useContext(LocationContext);
    const handleAnalytics = useAnalytics();

    const onClick = useCallback(
        (analyticsEvents?: AnalyticsEventsBase['analyticsEvents']) => {
            handleAnalytics(analyticsEvents);
        },
        [handleAnalytics],
    );

    return (
        <div className={b({size})}>
            {title && <Title className={b('header')} title={title} colSizes={{all: 12}} />}
            {items.map((item) => {
                const itemContent = getItemContent(item);
                const {url, text} = item;
                return url ? (
                    <a
                        className={b('item')}
                        key={url}
                        href={url}
                        aria-label={text}
                        title={text}
                        {...getLinkProps(url, hostname)}
                        onClick={() => onClick(item.analyticsEvents)}
                    >
                        {itemContent}
                    </a>
                ) : (
                    <div className={b('item')} key={url}>
                        {itemContent}
                    </div>
                );
            })}
        </div>
    );
};

export default Icons;
