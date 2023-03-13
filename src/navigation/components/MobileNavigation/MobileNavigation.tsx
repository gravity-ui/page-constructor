import React, {MouseEventHandler, useRef, useCallback} from 'react';
import {Popup, Portal} from '@gravity-ui/uikit';

import {block} from '../../../utils';
import Foldable from '../../../components/Foldable/Foldable';
import {NavigationItemModel, NavigationDropdownItem, NavigationItemType} from '../../../models';
import {ItemColumnName} from '../../constants';
import NavigationItem from '../NavigationItem/NavigationItem';

import './MobileNavigation.scss';

const b = block('mobile-navigation');

interface MobileNavigationDropdownProps {
    data: NavigationDropdownItem;
    isOpened?: boolean;
    onItemClick?: MouseEventHandler;
    onToggle?: MouseEventHandler;
}

const MobileNavigationDropdown: React.FC<MobileNavigationDropdownProps> = ({
    data,
    onItemClick,
    onToggle,
    isOpened = false,
}) => {
    const ref = useRef(null);

    return (
        <div ref={ref} className={b('dropdown')}>
            <NavigationItem data={data} onClick={onToggle} isOpened={isOpened} />
            {isOpened && (
                <Popup anchorRef={ref} open={isOpened} className={b('popup')}>
                    {data.items.map((item) => (
                        <NavigationItem
                            key={item.text}
                            data={item}
                            className={b('dropdown-item')}
                            onClick={onItemClick}
                        />
                    ))}
                </Popup>
            )}
        </div>
    );
};

interface MobileNavigationItemProps
    extends Pick<MobileNavigationProps, 'onActiveItemChange' | 'onClose'> {
    item: NavigationItemModel;
    column: ItemColumnName;
    index: number;
    isOpened?: boolean;
    activeItemId?: string;
}

const MobileNavigationItem = ({
    item,
    index,
    isOpened,
    activeItemId,
    onActiveItemChange,
    column,
    onClose,
}: MobileNavigationItemProps) => {
    const id = `${column}-${index}`;
    const isActive = id === activeItemId && isOpened;
    const toggleActive: MouseEventHandler = useCallback(
        (e) => {
            e.stopPropagation();

            if (onActiveItemChange) {
                onActiveItemChange(isActive ? undefined : `${column}-${index}`);
            }
        },
        [onActiveItemChange, isActive, column, index],
    );

    const onItemClick: MouseEventHandler = useCallback(
        (e) => {
            toggleActive(e);
            onClose();
        },
        [toggleActive, onClose],
    );

    return (
        <li key={index} className={b('rows-item')}>
            {item.type === NavigationItemType.Dropdown ? (
                <MobileNavigationDropdown
                    data={item}
                    onToggle={toggleActive}
                    isOpened={isActive}
                    onItemClick={onItemClick}
                />
            ) : (
                <NavigationItem data={item} onClick={onItemClick} />
            )}
        </li>
    );
};

export interface MobileNavigationProps {
    className?: string;
    isOpened?: boolean;
    topItems?: NavigationItemModel[];
    bottomItems?: NavigationItemModel[];
    activeItemId?: string;
    onClose: () => void;
    onActiveItemChange: (index?: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = (props) => {
    if (typeof window === 'undefined') {
        return null;
    }

    const {isOpened, topItems, bottomItems, activeItemId, onActiveItemChange, onClose} = props;

    return (
        <Portal>
            <Foldable key={topItems?.length} className={b()} isOpened={Boolean(isOpened)}>
                <div className={b('wrapper')}>
                    <nav className={b('nav')}>
                        <ul className={b('rows')}>
                            {topItems?.map((link, index) => (
                                <MobileNavigationItem
                                    key={index}
                                    item={link}
                                    column={ItemColumnName.Top}
                                    index={index}
                                    isOpened={isOpened}
                                    activeItemId={activeItemId}
                                    onClose={onClose}
                                    onActiveItemChange={onActiveItemChange}
                                />
                            ))}
                        </ul>
                    </nav>
                    <ul className={b('rows')}>
                        {bottomItems?.map((item, index) => (
                            <MobileNavigationItem
                                key={index}
                                item={item}
                                column={ItemColumnName.Bottom}
                                index={index}
                                isOpened={isOpened}
                                activeItemId={activeItemId}
                                onClose={onClose}
                                onActiveItemChange={onActiveItemChange}
                            />
                        ))}
                    </ul>
                </div>
            </Foldable>
        </Portal>
    );
};

export default MobileNavigation;
