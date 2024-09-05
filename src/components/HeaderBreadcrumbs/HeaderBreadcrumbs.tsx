import React, {useCallback, useEffect} from 'react';

import {useForceUpdate} from '@react-spring/shared';

import {useAnalytics} from '../../hooks';
import {DefaultEventNames, HeaderBreadCrumbsProps} from '../../models';
import {block} from '../../utils';

import {i18n} from './i18n';

import './HeaderBreadcrumbs.scss';

const b = block('header-breadcrumbs');

const isCurrentPage = (url: string): boolean => {
    if (url === '' || url === '.' || url.startsWith('#')) {
        return true;
    }

    if (typeof window === 'undefined' || url.startsWith('.')) {
        return false;
    }

    const location = window.location;

    if (url.includes('//')) {
        return url === location.href;
    }

    if (url.startsWith('/')) {
        return url === location.pathname + location.search;
    }

    return false;
};

export default function HeaderBreadcrumbs(props: HeaderBreadCrumbsProps) {
    const {items, theme = 'light', className, analyticsEvents} = props;
    const handleAnalytics = useAnalytics(DefaultEventNames.Breadcrumb);
    const forceUpdate = useForceUpdate();

    const onClick = useCallback(() => {
        handleAnalytics(analyticsEvents);
    }, [analyticsEvents, handleAnalytics]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => forceUpdate(), []);

    return (
        <nav className={b({theme}, className)} aria-label={i18n('label')}>
            <ol className={b('list')}>
                {items?.map(({url, text}) => (
                    <li className={b('item')} key={url}>
                        <a
                            href={url}
                            className={b('text')}
                            onClick={onClick}
                            aria-current={isCurrentPage(url) ? 'page' : undefined}
                        >
                            {text}
                        </a>
                        <span className={b('separator')} aria-hidden>
                            &nbsp;/
                        </span>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
