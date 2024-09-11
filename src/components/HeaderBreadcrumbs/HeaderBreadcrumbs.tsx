import React, {useCallback} from 'react';

import {useAnalytics} from '../../hooks';
import {DefaultEventNames, HeaderBreadCrumbsProps} from '../../models';
import {block} from '../../utils';

import {i18n} from './i18n';

import './HeaderBreadcrumbs.scss';

const b = block('header-breadcrumbs');

export default function HeaderBreadcrumbs(props: HeaderBreadCrumbsProps) {
    const {items, theme = 'light', className, analyticsEvents} = props;
    const handleAnalytics = useAnalytics(DefaultEventNames.Breadcrumb);

    const onClick = useCallback(() => {
        handleAnalytics(analyticsEvents);
    }, [analyticsEvents, handleAnalytics]);

    return (
        <nav className={b({theme}, className)} aria-label={i18n('label')}>
            <ol className={b('list')}>
                {items?.map(({url, text}) => (
                    <li className={b('item')} key={url}>
                        <a href={url} className={b('text')} onClick={onClick}>
                            {text}
                        </a>
                        <span className={b('separator')} aria-hidden>
                            /
                        </span>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
