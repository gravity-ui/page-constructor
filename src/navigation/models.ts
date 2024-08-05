import {MouseEventHandler} from 'react';

import {
    ClassNameProps,
    NavigationItemData,
    NavigationItemModel,
    NavigationLinkItem,
    ThemedNavigationLogoData,
} from '../models';

export interface MobileMenuButtonProps {
    isSidebarOpened: boolean;
    additionalProps?: any[];
    onSidebarOpenedChange: (arg: boolean, additionalProps?: any[]) => void;
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

export interface ActiveItemProps {
    activeItemId?: string;
    onActiveItemChange: (id?: string) => void;
}

export interface MenuLayoutProps {
    menuLayout?: NavigationLayout;
}
export interface NavigationItemProps extends ClassNameProps, MenuLayoutProps {
    data: NavigationItemData;
    onClick?: MouseEventHandler;
    isActive?: boolean;
    isTopLevel?: boolean;
    hidePopup?: () => void;
}

export interface NavigationListItemProps extends MenuLayoutProps, ActiveItemProps, ClassNameProps {
    data: NavigationItemModel;
    column: ItemColumnName;
    index: number;
}

export interface NavigationListProps
    extends Pick<NavigationListItemProps, 'column'>,
        MenuLayoutProps,
        ActiveItemProps,
        ClassNameProps {
    items: NavigationItemModel[];
    itemClassName?: string;
}

export interface ItemsWrapperProps
    extends Pick<NavigationListProps, 'items'>,
        ActiveItemProps,
        ClassNameProps {}

export interface DesktopNavigationProps extends MobileMenuButtonProps, ActiveItemProps {
    logo: ThemedNavigationLogoData;
    leftItemsWithIconSize: NavigationItemModel[];
    rightItemsWithIconSize?: NavigationItemModel[];
    additionalProps?: any[];
}

export interface MobileNavigationProps extends ClassNameProps, ActiveItemProps {
    isOpened?: boolean;
    topItems?: NavigationItemModel[];
    bottomItems?: NavigationItemModel[];
}

export interface NavigationProps extends MobileMenuButtonProps, ActiveItemProps {
    logo: ThemedNavigationLogoData;
    leftItemsWithIconSize: NavigationItemModel[];
    rightItemsWithIconSize?: NavigationItemModel[];
}

export interface NavigationPopupProps extends ClassNameProps {
    open: boolean;
    items: NavigationLinkItem[];
    onClose: () => void;
    anchorRef: React.RefObject<Element>;
}
