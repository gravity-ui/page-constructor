import React, {Fragment, useCallback, useContext} from 'react';

import {Image, Title} from '../../components';
import {LocationContext} from '../../context/locationContext';
import {Grid} from '../../grid';
import {useAnalytics} from '../../hooks';
import {IconsBlockItemProps, IconsBlockProps} from '../../models';
import {block, getLinkProps} from '../../utils';

import './Icons.scss';

const b = block('icons-block');

const getItemContent = (item: IconsBlockProps['items'][number]) => (
    <Fragment>
        <Image className={b('image')} src={item.src} />
        <p className={b('text')}>{item.text}</p>
    </Fragment>
);

const Icons = ({title, description, size = 's', colSizes = {all: 12}, items}: IconsBlockProps) => {
    const {hostname} = useContext(LocationContext);
    const handleAnalytics = useAnalytics();

    const onClick = useCallback(
        ({analyticsEvents, url}: IconsBlockItemProps) => {
            handleAnalytics(analyticsEvents, {url});
        },
        [handleAnalytics],
    );

    return (
        <div className={b({size})}>
            <Grid>
                {(title || description) && (
                    <Title
                        className={b('header')}
                        title={title}
                        subtitle={description}
                        colSizes={colSizes}
                    />
                )}
                {items &&
                    items.map((item) => {
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
                                onClick={() => onClick(item)}
                            >
                                {itemContent}
                            </a>
                        ) : (
                            <div className={b('item')} key={text}>
                                {itemContent}
                            </div>
                        );
                    })}
            </Grid>
        </div>
    );
};

export default Icons;
