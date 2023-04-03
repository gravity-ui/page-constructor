import {ThemeSupporting} from '../utils';
import {ButtonProps, ImageProps} from './constructor-items';

export enum NavigationItemType {
    Link = 'link',
    Dropdown = 'dropdown',
    Button = 'button',
    Social = 'social',
    GithubButton = 'github-button',
}

export interface NavigationItemBase {
    text: string;
    icon?: ImageProps;
    url?: string;
}

export enum NavigationGithubButtonIcon {
    heart = 'octicon-heart',
    eye = 'octicon-eye',
    star = 'octicon-star',
    fork = 'octicon-repo-forked',
    issue = 'octicon-issue-opened',
    comment = 'octicon-comment-discussion',
    download = 'octicon-download',
    package = 'octicon-package',
    template = 'octicon-repo-template',
    play = 'octicon-play',
}

export interface NavigationGithubButton extends Omit<NavigationItemBase, 'icon'> {
    type: NavigationItemType.GithubButton;
    url: string;
    label?: string;
    icon?: keyof typeof NavigationGithubButtonIcon;
    size?: string;
}

export interface NavigationLinkItem extends Omit<NavigationItemBase, 'url'> {
    type: NavigationItemType.Link;
    url: string;
    arrow?: boolean;
    target?: string;
}

export interface NavigationButtonItem extends ButtonProps {
    type: NavigationItemType.Button;
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

export type ThemedNavigationLogoData = NavigationLogoData & ThemeSupporting<NavigationLogoData>;

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
    logo: ThemedNavigationLogoData;
    header: HeaderData;
    footer?: FooterData;
}
