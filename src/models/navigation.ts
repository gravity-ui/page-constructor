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

export type NavigationItem = NavigationLinkItem | NavigationButtonItem | NavigationDropdownItem;

export interface NavigationLogo extends Omit<NavigationItemBase, 'text'> {
    icon: ImageProps;
    text?: string;
}

export interface HeaderData {
    leftItems: NavigationItem[];
    rightItems?: NavigationItem[];
}

export interface FooterColumn {
    title: string;
    links: NavigationItem[];
}

export interface FooterUnderline {
    links?: NavigationItem[];
    copyright?: string;
}

export interface FooterData {
    columns: FooterColumn[];
    social?: NavigationSocialItem[];
    underline?: FooterUnderline;
}

export interface NavigationData {
    logo: NavigationLogo;
    header: HeaderData;
    footer?: FooterData;
}
