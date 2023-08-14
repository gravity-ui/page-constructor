import React, {Fragment, useContext} from 'react';

import {Image, Title} from '../../components';
import {LocationContext} from '../../context/locationContext';
import {IconsBlockProps} from '../../models';
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

    return (
        <div className={b({size})}>
            {title && <Title className={b('header')} title={title} colSizes={{all: 12}} />}
            {items.map((item) => {
                const itemContent = getItemContent(item);
                return item.url ? (
                    <a
                        className={b('item')}
                        key={item.url}
                        href={item.url}
                        {...getLinkProps(item.url, hostname)}
                    >
                        {itemContent}
                    </a>
                ) : (
                    <div className={b('item')} key={item.url}>
                        {itemContent}
                    </div>
                );
            })}
        </div>
    );
};

export default Icons;
