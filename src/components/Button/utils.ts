import {ButtonSize, ButtonView} from '@gravity-ui/uikit';

export const ICON_QA = 'button-icon';

export type OldButtonTheme =
    | 'normal'
    | 'normal-contrast'
    | 'outlined-contrast'
    | 'flat-contrast'
    | 'action'
    | 'flat'
    | 'light'
    | 'clear'
    | 'raised'
    | 'pseudo'
    | 'link'
    | 'accent'
    | 'websearch'
    | 'flat-special'
    | 'normal-special'
    | 'normal-dark'
    | 'pseudo-special';

const themeMap: Record<OldButtonTheme, ButtonView> = {
    normal: 'normal',
    'normal-contrast': 'contrast-light',
    'outlined-contrast': 'outlined',
    'flat-contrast': 'flat',
    action: 'action',
    flat: 'flat',
    light: 'flat-secondary',
    clear: 'flat-secondary',
    raised: 'raised',
    pseudo: 'outlined',
    link: 'outlined-info',
    accent: 'action',
    websearch: 'action',
    'flat-special': 'flat',
    'normal-special': 'contrast-light',
    'normal-dark': 'outlined',
    'pseudo-special': 'outlined',
};

export type OldButtonSize = 'xs' | 'ns' | 's' | 'm' | 'l' | 'n' | 'head' | 'promo';

const sizeMap: Record<OldButtonSize, ButtonSize> = {
    xs: 's',
    ns: 's',
    s: 'm',
    m: 'l',
    l: 'l',
    n: 'l',
    head: 'l',
    promo: 'xl',
};

export const toCommonView = (theme: OldButtonTheme) => themeMap[theme] ?? theme;
export const toCommonSize = (size: OldButtonSize) => sizeMap[size] ?? size;
