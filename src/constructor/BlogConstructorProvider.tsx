import React, {Fragment} from 'react';

import {MobileContext} from 'contexts/MobileContext';
import {LocaleContext, LocaleContextProps} from 'contexts/LocaleContext';
import {RouterContext, RouterContextProps} from 'contexts/RouterContext';
import {UserContext, UserContextProps} from 'contexts/UserContext';
import {TranslationContext, TranslationContextProps} from 'contexts/TranslationContext';
import {ThemeValueType, ThemeValueContext} from 'contexts/theme/ThemeValueContext';

import {DEFAULT_THEME} from 'src/constants';

export interface BlogConstructorProviderProps {
    isMobile?: boolean;
    locale?: LocaleContextProps;
    router?: RouterContextProps;
    theme?: ThemeValueType;
    user?: UserContextProps;
    translation?: TranslationContextProps;
}

export const BlogConstructorProvider: React.FC<BlogConstructorProviderProps> = ({
    isMobile,
    locale = {},
    router = {} as RouterContextProps,
    theme = DEFAULT_THEME,
    user = null,
    translation = {},
    children,
}) => {
    /* eslint-disable react/jsx-key */
    const context = [
        <ThemeValueContext.Provider value={{themeValue: theme}} />,
        <LocaleContext.Provider value={locale} />,
        <RouterContext.Provider value={router} />,
        <MobileContext.Provider value={Boolean(isMobile)} />,
        <UserContext.Provider value={user} />,
        <TranslationContext.Provider value={translation} />,
    ].reduceRight((prev, provider) => React.cloneElement(provider, {}, prev), children);
    /* eslint-enable react/jsx-key */

    return <Fragment>{context}</Fragment>;
};
