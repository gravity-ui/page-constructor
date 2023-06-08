import {MouseEventHandler} from 'react';

import {
    NavigationItemData,
    NavigationItemModel,
    NavigationLinkItem,
    ThemedNavigationLogoData,
} from '../models';

export interface MobileMenuButtonProps {
    isSidebarOpened: boolean;
    onSidebarOpenedChange: (arg: boolean) => void;
}

export enum ItemColumnName {
    Left = 'left',
    Right = 'right',
    Top = 'top',
    Bottom = 'bottom',
}

export enum NavigationLayout {
    Desktop = 'desktop',
    Mobile = 'mobile',
    Dropdown = 'dropdown',
}

export interface NavigationItemProps {
    data: NavigationItemData;
    className?: string;
    onClick?: MouseEventHandler;
    isActive?: boolean;
    isTopLevel?: boolean;
    highlightActiveItem?: boolean;
    menuLayout?: NavigationLayout;
    hidePopup?: () => void;
}

export interface NavigationListItemProps
    extends Pick<NavigationItemProps, 'highlightActiveItem' | 'isTopLevel' | 'menuLayout'> {
    data: NavigationItemModel;
    column: ItemColumnName;
    index: number;
    activeItemId?: string;
    className?: string;
    onActiveItemChange: (id?: string) => void;
}

export interface NavigationListProps
    extends Pick<
        NavigationListItemProps,
        | 'activeItemId'
        | 'column'
        | 'className'
        | 'onActiveItemChange'
        | 'highlightActiveItem'
        | 'menuLayout'
    > {
    items: NavigationItemModel[];
    itemClassName?: string;
    highlightActiveItem?: boolean;
}

export interface ItemsWrapperProps
    extends Pick<
        NavigationListProps,
        | 'items'
        | 'activeItemId'
        | 'className'
        | 'highlightActiveItem'
        | 'onActiveItemChange'
        | 'highlightActiveItem'
    > {}

export interface DesktopNavigationProps
    extends MobileMenuButtonProps,
        Pick<ItemsWrapperProps, 'activeItemId' | 'onActiveItemChange'> {
    logo: ThemedNavigationLogoData;
    leftItemsWithIconSize: NavigationItemModel[];
    rightItemsWithIconSize?: NavigationItemModel[];
}

export interface MobileNavigationProps
    extends Pick<ItemsWrapperProps, 'activeItemId' | 'onActiveItemChange' | 'className'> {
    isOpened?: boolean;
    topItems?: NavigationItemModel[];
    bottomItems?: NavigationItemModel[];
}

export interface NavigationProps
    extends MobileMenuButtonProps,
        Pick<ItemsWrapperProps, 'activeItemId' | 'onActiveItemChange'> {
    logo: ThemedNavigationLogoData;
    leftItemsWithIconSize: NavigationItemModel[];
    rightItemsWithIconSize?: NavigationItemModel[];
}

export interface NavigationPopupProps {
    open: boolean;
    items: NavigationLinkItem[];
    onClose: () => void;
    anchorRef: React.RefObject<Element>;
    className?: string;
}
