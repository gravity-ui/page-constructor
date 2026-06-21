import * as React from 'react';

import {InnerContext} from '../../../../context/innerContext';
import {
    ImageProps,
    NavigationDropdownItem,
    NavigationItemType,
    NavigationLinkItem,
} from '../../../../models';
import {block} from '../../../../utils';

import './LangSwitcher.scss';

type LanguageSwitcherProps = {
    buttonText?: string;
    items: {
        text: string;
        href: string;
    }[];
    image?: ImageProps;
};

const b = block('lang-switcher');

export const LanguageSwitcher = ({buttonText, items, image}: LanguageSwitcherProps) => {
    const [isActive, setIsActive] = React.useState(false);
    const {navItemMap} = React.useContext(InnerContext);

    const navigationItems = React.useMemo<NavigationLinkItem[]>(
        () =>
            items.map((item) => ({
                type: NavigationItemType.Link,
                text: item.text,
                url: item.href,
            })),
        [items],
    );

    const hidePopup = React.useCallback(() => {
        setIsActive(false);
    }, []);

    const onClick = React.useCallback((event: React.MouseEvent) => {
        event.stopPropagation();
        setIsActive((active) => !active);
    }, []);

    const text = buttonText ?? 'Language';
    const data: NavigationDropdownItem = {
        type: NavigationItemType.Dropdown,
        text,
        items: navigationItems,
        isActive,
        hidePopup,
    };

    const NavigationDropdown = navItemMap[NavigationItemType.Dropdown];

    return (
        <NavigationDropdown
            data={data}
            text={text}
            type={NavigationItemType.Dropdown}
            items={navigationItems}
            isActive={isActive}
            hidePopup={hidePopup}
            onClick={onClick}
            className={b()}
            placement="top-start"
            icon={image}
            iconSize={20}
        />
    );
};
