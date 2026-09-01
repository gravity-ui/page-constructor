'use client';

import * as React from 'react';

import {useAnalytics} from '../../hooks';
import {DefaultEventNames, HeaderBreadCrumbsProps} from '../../models';
import {block, getQaAttrubutes} from '../../utils';

import {i18n} from './i18n';

import './HeaderBreadcrumbs.scss';

const b = block('header-breadcrumbs');

export default function HeaderBreadcrumbs(props: HeaderBreadCrumbsProps) {
    const {items, theme = 'light', className, analyticsEvents, qa} = props;
    const qaAttributes = getQaAttrubutes(qa, ['list', 'item']);

    const handleAnalytics = useAnalytics(DefaultEventNames.Breadcrumb);

    const onClick = React.useCallback(() => {
        handleAnalytics(analyticsEvents);
    }, [analyticsEvents, handleAnalytics]);

    return (
        <nav
            className={b({theme}, className)}
            aria-label={i18n('label')}
            data-qa={qaAttributes.default}
        >
            <ol className={b('list')} data-qa={qaAttributes.list}>
                {items?.map(({url, text}) => (
                    <li className={b('item')} key={url} data-qa={qaAttributes.item}>
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
