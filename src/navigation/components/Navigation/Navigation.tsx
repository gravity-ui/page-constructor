import React, {useCallback, useContext, useEffect} from 'react';

import _ from 'lodash';

import OverflowScroller from '../../../components/OverflowScroller/OverflowScroller';
import {LocationContext} from '../../../context/locationContext';
import {NavigationItemModel} from '../../../models/navigation';
import {block} from '../../../utils';
import {ItemColumnName} from '../../constants';
import {NavigationListItem} from '../NavigationListItem/NavigationListItem';

import './Navigation.scss';

const b = block('navigation');

export interface NavigationProps {
    links: NavigationItemModel[];
    activeItemId?: string;
    className?: string;
    highlightActiveItem?: boolean;
    onActiveItemChange: (id?: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
    className,
    onActiveItemChange,
    links,
    activeItemId,
}) => {
    const {asPath, pathname} = useContext(LocationContext);

    const hidePopup = useCallback(() => {
        onActiveItemChange();
    }, [onActiveItemChange]);

    useEffect(() => {
        hidePopup();
    }, [hidePopup, asPath, pathname]);

    return (
        <OverflowScroller className={b(null, className)} onScrollStart={hidePopup}>
            <nav>
                <ul className={b('links')}>
                    {links.map((link, index) => (
                        <NavigationListItem
                            key={index}
                            className={b('links-item')}
                            item={link}
                            index={index}
                            activeItemId={activeItemId}
                            hidePopup={hidePopup}
                            column={ItemColumnName.Left}
                            onActiveItemChange={onActiveItemChange}
                        />
                    ))}
                </ul>
            </nav>
        </OverflowScroller>
    );
};

export default Navigation;
