import React, {useCallback} from 'react';

import {useAnalytics} from '../../hooks';
import {DefaultEventNames, HeaderBreadCrumbsProps} from '../../models';
import {block} from '../../utils';

import './HeaderBreadcrumbs.scss';

const b = block('header-breadcrumbs');

export default function HeaderBreadcrumbs(props: HeaderBreadCrumbsProps) {
    const {items, theme = 'light', className, analyticsEvents} = props;
    const handleAnalytics = useAnalytics(DefaultEventNames.Breadcrumb);

    const onClick = useCallback(() => {
        handleAnalytics(analyticsEvents);
    }, [analyticsEvents, handleAnalytics]);

    return (
        <div className={b({theme}, className)}>
            {items?.map((item) => (
                <div className={b('item')} key={item.url}>
                    <a href={item.url} className={b('text')} onClick={onClick}>
                        {item.text}
                    </a>
                </div>
            ))}
        </div>
    );
}
