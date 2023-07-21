import React, {Fragment} from 'react';

import {DEFAULT_THEME} from '../../components/constants';
import {AnalyticsContext, AnalyticsContextProps} from '../../context/analyticsContext';
import {ImageContext, ImageContextProps} from '../../context/imageContext';
import {LocaleContext, LocaleContextProps} from '../../context/localeContext';
import {LocationContext, LocationContextProps} from '../../context/locationContext';
import {MapsContext, MapsContextType, initialMapValue} from '../../context/mapsContext/mapsContext';
import {MetrikaContext, MetrikaContextProps} from '../../context/metrikaContext';
import {MobileContext} from '../../context/mobileContext';
import {
    ProjectSettingsContext,
    ProjectSettingsContextProps,
} from '../../context/projectSettingsContext';
import {SSRContext, SSRContextProps} from '../../context/ssrContext';
import {ThemeProvider} from '../../context/theme';
import {Theme, WithChildren} from '../../models';

export interface PageConstructorProviderProps {
    isMobile?: boolean;
    locale?: LocaleContextProps;
    location?: LocationContextProps;
    metrika?: MetrikaContextProps;
    ssrConfig?: SSRContextProps;
    theme?: Theme;
    mapsContext?: MapsContextType;
    projectSettings?: ProjectSettingsContextProps;
    analytics?: AnalyticsContextProps;
    image?: ImageContextProps;
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
        image = {},
    } = props;

    /* eslint-disable react/jsx-key */
    const context = [
        <ThemeProvider theme={theme} />,
        <ProjectSettingsContext.Provider value={projectSettings} />,
        <LocaleContext.Provider value={locale} />,
        <ImageContext.Provider value={image} />,
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
