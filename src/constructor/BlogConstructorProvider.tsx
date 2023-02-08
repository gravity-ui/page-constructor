import React, {Fragment} from 'react';

import {MobileContext} from '../contexts/MobileContext';
import {LocaleContext} from '../contexts/LocaleContext';
import {RouterContext, RouterContextProps} from '../contexts/RouterContext';
import {UserContext, UserContextProps} from '../contexts/UserContext';
import {DeviceContext, DeviceContextProps} from '../contexts/DeviceContext';
import {ThemeValueType, ThemeValueContext} from '../contexts/theme/ThemeValueContext';

import {Locale} from '../models/locale';

import {DEFAULT_THEME} from '../constants';

export interface BlogConstructorProviderProps {
    isMobile?: boolean;
    locale?: Locale;
    router?: RouterContextProps;
    theme?: ThemeValueType;
    user?: UserContextProps;
    device?: DeviceContextProps;
    children?: React.ReactNode;
}

export const BlogConstructorProvider: React.FC<BlogConstructorProviderProps> = ({
    isMobile,
    locale = {} as Locale,
    router = {} as RouterContextProps,
    theme = DEFAULT_THEME,
    user = {},
    device = {},
    children,
}) => {
    const context = [
        <ThemeValueContext.Provider value={{themeValue: theme}} key="theme-context" />,
        <LocaleContext.Provider value={{locale}} key="locale-context" />,
        <RouterContext.Provider value={router} key="router-context" />,
        <MobileContext.Provider value={Boolean(isMobile)} key="is-mobile-context" />,
        <UserContext.Provider value={user} key="user-context" />,
        <DeviceContext.Provider value={device} key="device-context" />,
    ].reduceRight((prev, provider) => React.cloneElement(provider, {}, prev), children);

    return <Fragment>{context}</Fragment>;
};
