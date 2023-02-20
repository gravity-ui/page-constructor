import React, {Fragment} from 'react';
import {MetrikaContext, MetrikaContextProps} from '../../context/metrikaContext';
import {AnalyticsContext, AnalyticsContextProps} from '../../context/analyticsContext';
import {MobileContext} from '../../context/mobileContext';
import {MapsContext, MapsContextType, initialMapValue} from '../../context/mapsContext/mapsContext';
import {
    ProjectSettingsContext,
    ProjectSettingsContextProps,
} from '../../context/projectSettingsContext';
import {SSRContext, SSRContextProps} from '../../context/ssrContext';
import {LocaleContext, LocaleContextProps} from '../../context/localeContext';
import {LocationContext, LocationContextProps} from '../../context/locationContext';
import {ConstructorTheme, ThemeValueContext} from '../../context/theme/ThemeValueContext';
import {DEFAULT_THEME} from '../../components/constants';
import {WithChildren} from '../../models';

export interface PageConstructorProviderProps {
    isMobile?: boolean;
    locale?: LocaleContextProps;
    location?: LocationContextProps;
    metrika?: MetrikaContextProps;
    ssrConfig?: SSRContextProps;
    theme?: ConstructorTheme;
    mapsContext?: MapsContextType;
    projectSettings?: ProjectSettingsContextProps;
    analytics?: AnalyticsContextProps;
}

export const PageConstructorProvider = (props: WithChildren<PageConstructorProviderProps>) => {
    const {
        isMobile,
        mapsContext = initialMapValue,
        locale = {},
        location = {},
        metrika = {},
        analytics = {},
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
        <MapsContext.Provider value={mapsContext} />,
        <MetrikaContext.Provider value={metrika} />,
        <AnalyticsContext.Provider value={analytics} />,
        <SSRContext.Provider value={{isServer: ssrConfig?.isServer}} />,
    ].reduceRight((prev, provider) => React.cloneElement(provider, {}, prev), children);
    /* eslint-enable react/jsx-key */

    return <Fragment>{context}</Fragment>;
};
