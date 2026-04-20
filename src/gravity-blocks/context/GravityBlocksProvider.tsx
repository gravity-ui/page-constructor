import React from 'react';

import {ThemeProvider} from '@gravity-ui/uikit';

import {DEFAULT_THEME} from '../../components/constants';
import {AnimateContext} from './animateContext';
import {AnalyticsContext, AnalyticsContextProps} from './analyticsContext';
import {
    DEFAULT_FORMS_CONTEXT_VALUE,
    FormsContext,
    FormsContextProps,
} from './formsContext/FormsContext';
import {ImageContext, ImageContextProps} from './imageContext';
import {LocaleContext, LocaleContextProps} from './localeContext';
import {LocationContext, LocationContextProps} from './locationContext';
import {MapsContext, MapsContextType, initialMapValue} from './mapsContext/mapsContext';
import {MicrodataContext, MicrodataContextProps} from './microdataContext';
import {MobileContext} from './mobileContext';
import {ProjectSettingsContext, ProjectSettingsContextProps} from './projectSettingsContext';
import {SSRContext, SSRContextProps} from './ssrContext';
import {ThemeContext} from './theme';
import {WindowWidthProvider} from './windowWidthContext';
import {Theme} from '../../models';

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
    microdata?: MicrodataContextProps;
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
        microdata = {},
    } = props;

    /* eslint-disable react/jsx-key */
    const context = [
        <ThemeProvider theme={theme} />,
        <AnimateContext.Provider value={{animated}} />,
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
        <MicrodataContext.Provider value={microdata} />,
        <WindowWidthProvider />,
    ].reduceRight((prev, provider) => React.cloneElement(provider, {}, prev), children);
    /* eslint-enable react/jsx-key */

    return <React.Fragment>{context}</React.Fragment>;
};
