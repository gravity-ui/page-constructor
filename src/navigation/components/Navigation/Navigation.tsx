import _ from 'lodash';
import React, {useState, useEffect, useCallback, useContext, useRef} from 'react';

import {block} from '../../../utils';
import OverflowScroller from '../../../components/OverflowScroller/OverflowScroller';
import {NavigationItemModel} from '../../../models/navigation';
import {LocationContext} from '../../../context/locationContext';
import {ItemColumnName} from '../../constants';
import {NavigationListItem} from '../NavigationListItem/NavigationListItem';

import './Navigation.scss';

const b = block('navigation');
const EVENT_HANDLE_DELAY = 100;

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
    highlightActiveItem,
}) => {
    const {asPath, pathname} = useContext(LocationContext);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const [itemPositions, setItemPosition] = useState<number[]>([]);

    const [lastLeftScroll, setLastLeftScroll] = useState(0);

    const hidePopup = useCallback(() => {
        onActiveItemChange();
    }, [onActiveItemChange]);

    const calculateItemPositions = useCallback(() => {
        if (itemRefs.current.length) {
            const currentItemPositions = itemRefs.current.map(
                (itemRef) => (itemRef && itemRef.getBoundingClientRect().left) || 0,
            );

            setItemPosition(currentItemPositions);
        }
    }, []);

    useEffect(() => {
        const debouncedCalculateItemPositions = _.debounce(
            calculateItemPositions,
            EVENT_HANDLE_DELAY,
        );
        const debouncedCalculateOnScroll = _.debounce(() => {
            const curLeftScroll = window.pageXOffset;

            if (curLeftScroll !== lastLeftScroll) {
                setLastLeftScroll(window.pageXOffset);
                calculateItemPositions();
            }
        }, EVENT_HANDLE_DELAY);

        calculateItemPositions();
        setLastLeftScroll(window.pageXOffset);

        window.addEventListener('resize', debouncedCalculateItemPositions);
        window.addEventListener('scroll', debouncedCalculateOnScroll);

        return () => {
            window.removeEventListener(`resize`, debouncedCalculateItemPositions);
            window.removeEventListener('scroll', debouncedCalculateOnScroll);
        };
    }, [calculateItemPositions, itemRefs, lastLeftScroll]);

    useEffect(() => {
        hidePopup();
    }, [hidePopup, asPath, pathname]);

    return (
        <OverflowScroller
            className={b(null, className)}
            onScrollStart={hidePopup}
            onScrollEnd={calculateItemPositions}
        >
            <nav>
                <ul className={b('links')}>
                    {links.map((link, index) => (
                        <NavigationListItem
                            key={index}
                            className={b('links-item')}
                            item={link}
                            itemRefs={itemRefs}
                            index={index}
                            activeItemId={activeItemId}
                            highlightActiveItem={highlightActiveItem}
                            hidePopup={hidePopup}
                            itemPositions={itemPositions}
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
