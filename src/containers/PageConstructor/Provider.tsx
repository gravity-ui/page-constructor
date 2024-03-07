import React, {Fragment} from 'react';

import {DEFAULT_THEME} from '../../components/constants';
import {AnalyticsContext, AnalyticsContextProps} from '../../context/analyticsContext';
// ISSUE-853 https://github.com/gravity-ui/page-constructor/issues/853
// temporal solution for Safari 17
import {BlockPreloadVideoMetadataContext} from '../../context/blockPreloadVideoMetadataContext';
import {ImageContext, ImageContextProps} from '../../context/imageContext';
import {LocaleContext, LocaleContextProps} from '../../context/localeContext';
import {LocationContext, LocationContextProps} from '../../context/locationContext';
import {MapsContext, MapsContextType, initialMapValue} from '../../context/mapsContext/mapsContext';
import {MobileContext} from '../../context/mobileContext';
import {
    ProjectSettingsContext,
    ProjectSettingsContextProps,
} from '../../context/projectSettingsContext';
import {SSRContext, SSRContextProps} from '../../context/ssrContext';
import {ThemeContext} from '../../context/theme';
import {Theme, WithChildren} from '../../models';

export interface PageConstructorProviderProps {
    isMobile?: boolean;
    locale?: LocaleContextProps;
    location?: LocationContextProps;
    ssrConfig?: SSRContextProps;
    theme?: Theme;
    mapsContext?: MapsContextType;
    projectSettings?: ProjectSettingsContextProps;
    analytics?: AnalyticsContextProps;
    image?: ImageContextProps;
    // ISSUE-853 https://github.com/gravity-ui/page-constructor/issues/853
    // temporal solution for Safari 17
    blockPreloadVideoMetadata?: boolean;
}

export const PageConstructorProvider = (props: WithChildren<PageConstructorProviderProps>) => {
    const {
        isMobile,
        mapsContext = initialMapValue,
        locale = {},
        location = {},
        analytics = {},
        ssrConfig = {},
        projectSettings = {},
        theme = DEFAULT_THEME,
        children,
        image = {},
        // ISSUE-853 https://github.com/gravity-ui/page-constructor/issues/853
        // temporal solution for Safari 17
        blockPreloadVideoMetadata,
    } = props;

    /* eslint-disable react/jsx-key */
    const context = [
        <ThemeContext.Provider value={{theme}} />,
        <ProjectSettingsContext.Provider value={projectSettings} />,
        <LocaleContext.Provider value={locale} />,
        <ImageContext.Provider value={image} />,
        <LocationContext.Provider value={location} />,
        <MobileContext.Provider value={Boolean(isMobile)} />,
        // ISSUE-853 https://github.com/gravity-ui/page-constructor/issues/853
        // temporal solution for Safari 17
        <BlockPreloadVideoMetadataContext.Provider value={Boolean(blockPreloadVideoMetadata)} />,
        <MapsContext.Provider value={mapsContext} />,
        <AnalyticsContext.Provider value={analytics} />,
        <SSRContext.Provider value={{isServer: ssrConfig?.isServer}} />,
    ].reduceRight((prev, provider) => React.cloneElement(provider, {}, prev), children);
    /* eslint-enable react/jsx-key */

    return <Fragment>{context}</Fragment>;
};
