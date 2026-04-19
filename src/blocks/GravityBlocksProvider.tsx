import React from 'react';

import {ThemeProvider} from '@gravity-ui/uikit';

import {DEFAULT_THEME} from '../components/constants';
import {AnimateContext} from '../context/animateContext';
import {AnalyticsContext, AnalyticsContextProps} from '../context/analyticsContext';
import {
    DEFAULT_FORMS_CONTEXT_VALUE,
    FormsContext,
    FormsContextProps,
} from '../context/formsContext/FormsContext';
import {ImageContext, ImageContextProps} from '../context/imageContext';
import {LocaleContext, LocaleContextProps} from '../context/localeContext';
import {LocationContext, LocationContextProps} from '../context/locationContext';
import {MapsContext, MapsContextType, initialMapValue} from '../context/mapsContext/mapsContext';
import {MobileContext} from '../context/mobileContext';
import {
    ProjectSettingsContext,
    ProjectSettingsContextProps,
} from '../context/projectSettingsContext';
import {SSRContext, SSRContextProps} from '../context/ssrContext';
import {ThemeContext} from '../context/theme';
import {WindowWidthProvider} from '../context/windowWidthContext';
import {Theme} from '../models';

export interface GravityBlocksProviderProps {
    isMobile?: boolean;
    locale?: LocaleContextProps;
    location?: LocationContextProps;
    ssrConfig?: SSRContextProps;
    theme?: Theme;
    mapsContext?: MapsContextType;
    projectSettings?: ProjectSettingsContextProps;
    analytics?: AnalyticsContextProps;
    forms?: FormsContextProps;
    image?: ImageContextProps;
    animated?: boolean;
}

export const GravityBlocksProvider: React.FC<
    React.PropsWithChildren<GravityBlocksProviderProps>
> = ({children, ...props}) => {
    const {
        isMobile,
        mapsContext = initialMapValue,
        locale = {},
        location = {},
        analytics = {},
        ssrConfig = {},
        projectSettings = {},
        theme = DEFAULT_THEME,
        image = {},
        forms = DEFAULT_FORMS_CONTEXT_VALUE,
        animated = true,
    } = props;

    /* eslint-disable react/jsx-key */
    const context = [
        <ThemeProvider />,
        <ThemeContext.Provider value={{theme}} />,
        <ProjectSettingsContext.Provider value={projectSettings} />,
        <LocaleContext.Provider value={locale} />,
        <ImageContext.Provider value={image} />,
        <LocationContext.Provider value={location} />,
        <MobileContext.Provider value={Boolean(isMobile)} />,
        <MapsContext.Provider value={mapsContext} />,
        <AnalyticsContext.Provider value={analytics} />,
        <FormsContext.Provider value={forms} />,
        <SSRContext.Provider value={{isServer: ssrConfig?.isServer}} />,
        <WindowWidthProvider />,
    ].reduceRight((prev, provider) => React.cloneElement(provider, {}, prev), children);
    /* eslint-enable react/jsx-key */

    return <React.Fragment>{context}</React.Fragment>;
};
