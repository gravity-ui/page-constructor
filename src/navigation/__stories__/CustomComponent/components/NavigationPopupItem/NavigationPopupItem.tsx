import React from 'react';

import {Col, GridColumnSizesType} from '../../../../../grid';
import {NavigationLinkItem} from '../../../../../models';
import {cn} from '../../../../../utils';

import './NavigationPopupItem.scss';

const b = cn('navigation-popup-item');

export type NavigationPopupItemProps = NavigationLinkItem & {
    className?: string;
    hover?: boolean;
    sizes: GridColumnSizesType;
    padding: 'default' | 's';
};

export const NavigationPopupItem: React.FC<NavigationPopupItemProps> = ({
    className,
    hover,
    url,
    text,
    sizes,
    padding = 'default',
}) => (
    <Col className={b(null, className)} sizes={sizes}>
        <a className={b('content', {hover, padding})} href={url}>
            <div className={b('container')}>
                <div className={b('title-tag-wrapper')}>
                    <span className={b('title')}>{text}</span>
                </div>
            </div>
        </a>
    </Col>
);
