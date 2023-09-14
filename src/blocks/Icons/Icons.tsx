import React, {Fragment, useCallback, useContext} from 'react';

import {Image, Title} from '../../components';
import {LocationContext} from '../../context/locationContext';
import {useAnalytics} from '../../hooks';
import {DefaultEventNames, IconsBlockProps} from '../../models';
import {block, getLinkProps} from '../../utils';

import './Icons.scss';

const b = block('icons-block');

const getItemContent = (item: IconsBlockProps['items'][number]) => (
    <Fragment>
        <Image className={b('image')} src={item.src} />
        <p className={b('text')}>{item.text}</p>
    </Fragment>
);

const Icons = ({title, size = 's', items, analyticsEvents, url: analyticsUrl}: IconsBlockProps) => {
    const {hostname} = useContext(LocationContext);
    const handleAnalytics = useAnalytics(DefaultEventNames.Link, analyticsUrl);
    const onClick = useCallback(() => {
        handleAnalytics(analyticsEvents);
    }, [handleAnalytics, analyticsEvents]);

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
                        onClick={onClick}
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
