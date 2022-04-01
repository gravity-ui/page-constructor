import React, {Fragment} from 'react';
import {MetrikaContext, MetrikaContextProps} from '../../context/metrikaContext';
import {MobileContext} from '../../context/mobileContext';
import {SSRContext, SSRContextProps} from '../../context/ssrContext';
import {LocaleContext, LocaleContextProps} from '../../context/localeContext';
import {LocationContext, LocationContextProps} from '../../context/locationContext';
import {ConstructorTheme, ThemeValueContext} from '../../context/theme/ThemeValueContext';
import {DEFAULT_THEME} from '../../components/constants';

export interface PageConstructorProviderProps {
    isMobile?: boolean;
    locale?: LocaleContextProps;
    location?: LocationContextProps;
    metrika?: MetrikaContextProps;
    ssrConfig?: SSRContextProps;
    theme?: ConstructorTheme;
}

export const PageConstructorProvider: React.FC<PageConstructorProviderProps> = (props) => {
    const {
        isMobile,
        locale = {},
        location = {},
        metrika = {},
        ssrConfig = {},
        theme = DEFAULT_THEME,
        children,
    } = props;

    /* eslint-disable react/jsx-key */
    const context = [
        <ThemeValueContext.Provider value={{themeValue: theme}} />,
        <LocaleContext.Provider value={locale} />,
        <LocationContext.Provider value={location} />,
        <MobileContext.Provider value={Boolean(isMobile)} />,
        <MetrikaContext.Provider value={metrika} />,
        <SSRContext.Provider value={{isServer: ssrConfig?.isServer}} />,
    ].reduceRight((prev, provider) => React.cloneElement(provider, {}, prev), children);
    /* eslint-enable react/jsx-key */

    return <Fragment>{context}</Fragment>;
};
