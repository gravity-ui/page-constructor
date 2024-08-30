import React, {useCallback} from 'react';

import {useAnalytics} from '../../hooks';
import {DefaultEventNames, HeaderBreadCrumbsProps} from '../../models';
import {block} from '../../utils';

import {i18n} from './i18n';

import './HeaderBreadcrumbs.scss';

const b = block('header-breadcrumbs');

export default function HeaderBreadcrumbs(props: HeaderBreadCrumbsProps) {
    const {items, theme = 'light', className, analyticsEvents, currentPageUrl} = props;
    const handleAnalytics = useAnalytics(DefaultEventNames.Breadcrumb);

    const onClick = useCallback(() => {
        handleAnalytics(analyticsEvents);
    }, [analyticsEvents, handleAnalytics]);

    const isCurrentPage = (url: string) => url === '.' || url === '#' || url === currentPageUrl;

    return (
        <nav className={b({theme}, className)} aria-label={i18n('label')}>
            <ol className={b('list')}>
                {items?.map((item) => (
                    <li className={b('item')} key={item.url}>
                        <a
                            href={item.url}
                            className={b('text')}
                            onClick={onClick}
                            aria-current={isCurrentPage(item.url) ? 'page' : undefined}
                        >
                            {item.text}
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
