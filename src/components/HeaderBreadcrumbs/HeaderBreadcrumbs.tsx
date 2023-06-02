import React, {useCallback} from 'react';

import {useAnalytics} from '../../hooks';
import {useMetrika} from '../../hooks/useMetrika';
import {DefaultEventNames, HeaderBreadCrumbsProps} from '../../models';
import {block} from '../../utils';
import RouterLink from '../RouterLink/RouterLink';

import './HeaderBreadcrumbs.scss';

const b = block('header-breadcrumbs');

export default function HeaderBreadcrumbs(props: HeaderBreadCrumbsProps) {
    const {items, metrikaGoals, pixelEvents, theme = 'light', className} = props;
    const handleMetrika = useMetrika();
    const handleAnalytics = useAnalytics(DefaultEventNames.Breadcrumb);

    const onClick = useCallback(() => {
        handleAnalytics();
        handleMetrika({metrikaGoals, pixelEvents});
    }, [handleAnalytics, handleMetrika, metrikaGoals, pixelEvents]);

    return (
        <div className={b({theme}, className)}>
            {items.map((item) => (
                <div className={b('item')} key={item.url}>
                    <RouterLink href={item.url} className={b('text')} onClick={onClick}>
                        {item.text}
                    </RouterLink>
                </div>
            ))}
        </div>
    );
}
