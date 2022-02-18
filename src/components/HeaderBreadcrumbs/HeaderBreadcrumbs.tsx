import React, {ReactNode} from 'react';
import {block} from '../../utils';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';

import './HeaderBreadcrumbs.scss';

const b = block('header-breadcrumbs');

export type Theme = 'default' | 'dark';

export interface HeaderBreadCrumbsProps extends ClassNameProps {
    items: {
        url: string;
        text: ReactNode;
    }[];
    theme?: Theme;
}

export default function HeaderBreadcrumbs(props: HeaderBreadCrumbsProps) {
    const {items, theme = 'light', className} = props;

    return (
        <div className={b({theme}, className)}>
            {items.map((item) => (
                <div className={b('item')} key={item.url}>
                    <a href={item.url} className={b('text')}>
                        {item.text}
                    </a>
                </div>
            ))}
        </div>
    );
}
