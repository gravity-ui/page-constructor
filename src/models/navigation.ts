import {ImageProps, ButtonProps} from './constructor-items';

export enum NavigationItemType {
    Link = 'link',
    Dropdown = 'dropdown',
    Button = 'button',
    Social = 'social',
}

export interface NavigationItemBase {
    text: string;
    icon?: ImageProps;
    url?: string;
}

export interface NavigationLinkItem extends NavigationItemBase {
    type: NavigationItemType.Link;
    url: string;
    arrow?: boolean;
    target?: string;
}

export interface NavigationButtonItem extends ButtonProps {
    type: NavigationItemType.Button;
    url: string;
    target?: string;
}

export interface NavigationDropdownItem extends NavigationItemBase {
    type: NavigationItemType.Dropdown;
    items: NavigationLinkItem[];
}

export interface NavigationSocialItem extends Omit<NavigationItemBase, 'text'> {
    type: NavigationItemType.Social;
    icon: ImageProps;
    url: string;
}

export type NavigationItemModel =
    | NavigationLinkItem
    | NavigationButtonItem
    | NavigationDropdownItem;

export type NavigationItemData =
    | NavigationLinkItem
    | NavigationButtonItem
    | NavigationSocialItem
    | DropdownItemData;

export type DropdownItemData = Omit<NavigationDropdownItem, 'items'>;

export interface NavigationLogoData {
    icon: ImageProps;
    text?: string;
    url?: string;
}

export interface HeaderData {
    leftItems: NavigationItemModel[];
    rightItems?: NavigationItemModel[];
}

export interface FooterColumn {
    title: string;
    links: NavigationItemModel[];
}

export interface FooterUnderline {
    links?: NavigationItemModel[];
    copyright?: string;
}

export interface FooterData {
    columns: FooterColumn[];
    social?: NavigationSocialItem[];
    underline?: FooterUnderline;
}

export interface NavigationData {
    logo: NavigationLogoData;
    header: HeaderData;
    footer?: FooterData;
}
