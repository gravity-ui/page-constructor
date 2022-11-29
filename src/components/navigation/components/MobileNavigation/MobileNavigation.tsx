import React, {MouseEventHandler, useRef, useCallback} from 'react';
import {Popup, Portal} from '@gravity-ui/uikit';

import {block} from '../../../../utils';
import Foldable from '../../../Foldable/Foldable';
import {
    NavigationItem as NavigationItemModel,
    NavigationDropdownItem,
    NavigationItemType,
} from '../../../../models/navigation';
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
    link: NavigationItemModel;
    index: number;
    isActive?: boolean;
}

const MobileNavigationItem = ({
    link,
    index,
    isActive,
    onActiveItemChange,
    onClose,
}: MobileNavigationItemProps) => {
    const toggleActive: MouseEventHandler = useCallback(
        (e) => {
            e.stopPropagation();

            if (onActiveItemChange) {
                onActiveItemChange(isActive ? -1 : index);
            }
        },
        [isActive, index, onActiveItemChange],
    );

    const onItemClick: MouseEventHandler = useCallback(
        (e) => {
            toggleActive(e);
            onClose();
        },
        [toggleActive, onClose],
    );

    return (
        <li key={index} className={b('links-item')}>
            {link.type === NavigationItemType.Dropdown ? (
                <MobileNavigationDropdown
                    data={link}
                    onToggle={toggleActive}
                    isOpened={isActive}
                    onItemClick={onItemClick}
                />
            ) : (
                <NavigationItem data={link} onClick={onItemClick} />
            )}
        </li>
    );
};

export interface MobileNavigationProps {
    className?: string;
    isOpened?: boolean;
    topItems?: NavigationItemModel[];
    bottomItems?: NavigationItemModel[];
    activeItemIndex: number;
    onClose: () => void;
    onActiveItemChange: (index: number) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = (props) => {
    if (typeof window === 'undefined') {
        return null;
    }

    const {isOpened, topItems, bottomItems, activeItemIndex, onActiveItemChange, onClose} = props;

    return (
        <Portal>
            <Foldable key={topItems?.length} className={b()} isOpened={Boolean(isOpened)}>
                <div className={b('wrapper')}>
                    <nav>
                        <ul className={b('links')}>
                            {topItems?.map((link, index) => {
                                const isActive = index === activeItemIndex;

                                return (
                                    <MobileNavigationItem
                                        key={index}
                                        link={link}
                                        index={index}
                                        isActive={isOpened && isActive}
                                        onClose={onClose}
                                        onActiveItemChange={onActiveItemChange}
                                    />
                                );
                            })}
                        </ul>
                    </nav>
                    {bottomItems?.map((item) => (
                        <NavigationItem key={item.text} data={item} className={b('button')} />
                    ))}
                </div>
            </Foldable>
        </Portal>
    );
};

export default MobileNavigation;
