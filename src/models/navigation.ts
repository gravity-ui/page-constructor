import {ImageProps, ButtonProps} from './constructor-items';

export enum NavigationItemType {
    Link = 'link',
    Dropdown = 'dropdown',
    Button = 'button',
    Social = 'social',
}

export interface NavigationItemBaseProps {
    text: string;
    icon?: ImageProps;
    url?: string;
}

export interface NavigationLinkItemProps extends NavigationItemBaseProps {
    type: NavigationItemType.Link;
    url: string;
    arrow?: boolean;
    target?: string;
}

export interface NavigationButtonItemProps extends ButtonProps {
    type: NavigationItemType.Button;
    url: string;
    target?: string;
}

export interface NavigationDropdownItemProps extends NavigationItemBaseProps {
    type: NavigationItemType.Dropdown;
    items: NavigationLinkItemProps[];
}

export interface NavigationSocialItemProps extends Omit<NavigationItemBaseProps, 'text'> {
    type: NavigationItemType.Social;
    icon: ImageProps;
    url: string;
}

export type NavigationItemProps =
    | NavigationLinkItemProps
    | NavigationButtonItemProps
    | NavigationDropdownItemProps;

export type NavigationItemDataProps =
    | NavigationLinkItemProps
    | NavigationButtonItemProps
    | NavigationSocialItemProps
    | DropdownItemDataProps;

export type DropdownItemDataProps = Omit<NavigationDropdownItemProps, 'items'>;

export interface NavigationLogoProps {
    icon: ImageProps;
    text?: string;
    url?: string;
}

export interface HeaderDataProps {
    leftItems: NavigationItemProps[];
    rightItems?: NavigationItemProps[];
}

export interface FooterColumnProps {
    title: string;
    links: NavigationItemProps[];
}

export interface FooterUnderlineProps {
    links?: NavigationItemProps[];
    copyright?: string;
}

export interface FooterDataProps {
    columns: FooterColumnProps[];
    social?: NavigationSocialItemProps[];
    underline?: FooterUnderlineProps;
}

export interface NavigationDataProps {
    logo: NavigationLogoProps;
    header: HeaderDataProps;
    footer?: FooterDataProps;
}
