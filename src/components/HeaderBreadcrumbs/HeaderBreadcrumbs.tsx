import React from 'react';
import {block} from '../../utils';
import {HeaderBreadCrumbsProps} from '../../models';
import {useMetrika} from '../../hooks/useMetrika';

import './HeaderBreadcrumbs.scss';

const b = block('header-breadcrumbs');

export default function HeaderBreadcrumbs(props: HeaderBreadCrumbsProps) {
    const {items, metrikaGoals, pixelEvents, theme = 'light', className} = props;
    const handleMetrika = useMetrika();

    const onClick = () => {
        handleMetrika({metrikaGoals, pixelEvents});
    };

    return (
        <div className={b({theme}, className)}>
            {items.map((item) => (
                <div className={b('item')} key={item.url}>
                    <a href={item.url} className={b('text')} onClick={onClick}>
                        {item.text}
                    </a>
                </div>
            ))}
        </div>
    );
}
