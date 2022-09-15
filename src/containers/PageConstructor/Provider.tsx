import React, {Fragment} from 'react';
import {MetrikaContext, MetrikaContextProps} from '../../context/metrikaContext';
import {MobileContext} from '../../context/mobileContext';
import {
    ProjectSettingsContext,
    ProjectSettingsContextProps,
} from '../../context/projectSettingsContext';
import {SSRContext, SSRContextProps} from '../../context/ssrContext';
import {LocaleContext, LocaleContextProps} from '../../context/localeContext';
import {LocationContext, LocationContextProps} from '../../context/locationContext';
import {ConstructorTheme, ThemeValueContext} from '../../context/theme/ThemeValueContext';
import {DEFAULT_THEME} from '../../components/constants';
import {ReactFCC} from '../../models';

export interface PageConstructorProviderProps {
    isMobile?: boolean;
    locale?: LocaleContextProps;
    location?: LocationContextProps;
    metrika?: MetrikaContextProps;
    ssrConfig?: SSRContextProps;
    theme?: ConstructorTheme;
    projectSettings?: ProjectSettingsContextProps;
}

export const PageConstructorProvider: ReactFCC<PageConstructorProviderProps> = (props) => {
    const {
        isMobile,
        locale = {},
        location = {},
        metrika = {},
        ssrConfig = {},
        projectSettings = {},
        theme = DEFAULT_THEME,
        children,
    } = props;

    /* eslint-disable react/jsx-key */
    const context = [
        <ThemeValueContext.Provider value={{themeValue: theme}} />,
        <ProjectSettingsContext.Provider value={projectSettings} />,
        <LocaleContext.Provider value={locale} />,
        <LocationContext.Provider value={location} />,
        <MobileContext.Provider value={Boolean(isMobile)} />,
        <MetrikaContext.Provider value={metrika} />,
        <SSRContext.Provider value={{isServer: ssrConfig?.isServer}} />,
    ].reduceRight((prev, provider) => React.cloneElement(provider, {}, prev), children);
    /* eslint-enable react/jsx-key */

    return <Fragment>{context}</Fragment>;
};
