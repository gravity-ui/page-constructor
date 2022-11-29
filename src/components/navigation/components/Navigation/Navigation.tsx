import _ from 'lodash';
import block from 'bem-cn-lite';
import React, {
    Fragment,
    MouseEventHandler,
    useState,
    useEffect,
    useCallback,
    useContext,
    useRef,
} from 'react';

import OverflowScroller from '../../../OverflowScroller/OverflowScroller';
import {
    NavigationDropdownItem,
    NavigationItem as NavigationItemModel,
    NavigationItemType,
} from '../../../../models/navigation';
import NavigationPopup from '../NavigationPopup/NavigationPopup';
import NavigationItem from '../NavigationItem/NavigationItem';
import {LocationContext} from '../../../../context/locationContext';

import './Navigation.scss';

const b = block('navigation');

export interface NavigationProps {
    links: NavigationItemModel[];
    activeItemIndex: number;
    onActiveItemChange: (index: number) => void;
    className?: string;
    highlightActiveItem?: boolean;
}

export interface NavigationDropdownProps {
    data: NavigationDropdownItem;
    onClick: MouseEventHandler;
    isActive: boolean;
    position: number;
    hidePopup: () => void;
}

const NavigationDropdown: React.FC<NavigationDropdownProps> = ({
    data,
    isActive,
    position,
    hidePopup,
    onClick,
}) => {
    const {text, items, ...popupProps} = data;

    return (
        <Fragment>
            <NavigationItem
                className={b('link')}
                onClick={onClick}
                isOpened={isActive}
                data={{text, type: NavigationItemType.Dropdown}}
            />
            {isActive && (
                <NavigationPopup
                    left={position}
                    onClose={hidePopup}
                    items={items}
                    {...popupProps}
                />
            )}
        </Fragment>
    );
};

const Navigation: React.FC<NavigationProps> = ({
    className,
    onActiveItemChange,
    links,
    activeItemIndex,
    highlightActiveItem,
}) => {
    const {asPath, pathname} = useContext(LocationContext);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const [itemPositions, setItemPosition] = useState<number[]>([]);

    const [lastLeftScroll, setLastLeftScroll] = useState(0);

    const hidePopup = useCallback(() => {
        onActiveItemChange(-1);
    }, [onActiveItemChange]);

    const getItemClickHandler = useCallback<(index: number) => MouseEventHandler>(
        (index) => (e) => {
            e.stopPropagation();
            onActiveItemChange(index === activeItemIndex ? -1 : index);
        },
        [activeItemIndex, onActiveItemChange],
    );

    const calculateItemPositions = useCallback(() => {
        if (itemRefs.current.length) {
            const currentItemPositions = itemRefs.current.map(
                (itemRef) => (itemRef && itemRef.getBoundingClientRect().left) || 0,
            );

            setItemPosition(currentItemPositions);
        }
    }, []);

    useEffect(() => {
        const debouncedCalculateItemPositions = _.debounce(calculateItemPositions, 100);
        const calculateOnScroll = _.debounce(() => {
            const curLeftScroll = window.pageXOffset;

            if (curLeftScroll !== lastLeftScroll) {
                setLastLeftScroll(window.pageXOffset);
                calculateItemPositions();
            }
        }, 100);

        calculateItemPositions();
        setLastLeftScroll(window.pageXOffset);

        window.addEventListener('resize', debouncedCalculateItemPositions);
        window.addEventListener('scroll', calculateOnScroll);

        return () => {
            window.removeEventListener(`resize`, calculateItemPositions);
            window.removeEventListener('scroll', calculateOnScroll);
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
                    {links.map((link, index) => {
                        const isActive = index === activeItemIndex;
                        const onClick = getItemClickHandler(index);

                        return (
                            <li
                                ref={(el) => itemRefs.current.push(el)}
                                key={index}
                                className={b('links-item')}
                            >
                                {link.type === NavigationItemType.Dropdown ? (
                                    <NavigationDropdown
                                        data={link}
                                        onClick={onClick}
                                        isActive={isActive}
                                        position={itemPositions[index]}
                                        hidePopup={hidePopup}
                                    />
                                ) : (
                                    <NavigationItem data={link} onClick={onClick} />
                                )}
                                {highlightActiveItem && isActive && (
                                    <div className={b('slider-container')}>
                                        <div className={b('slider')} />
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </OverflowScroller>
    );
};

export default Navigation;
