import React, {Fragment} from 'react';
import {AnimateContext} from '../../context/animateContext';
import {MetrikaContext, MetrikaContextProps} from '../../context/metrikaContext';
import {MobileContext} from '../../context/mobileContext';
import {TabletContext} from '../../context/tabletContext';
import {SSRContext, SSRContextProps} from '../../context/ssrContext';
import {LocaleContext, LocaleContextProps} from '../../context/localeContext';
import {LocationContext, LocationContextProps} from '../../context/locationContext';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';
import {PageConstructor, PageConstructorProps} from './PageConstructor';
import {DEFAULT_THEME} from '../../components/constants';

export interface PageConstructorProviderProps extends PageConstructorProps {
    isMobile?: boolean;
    isTablet?: boolean;
    metrika?: MetrikaContextProps;
    ssrConfig?: SSRContextProps;
    location?: LocationContextProps;
    locale?: LocaleContextProps;
    theme?: string;
}

export const PageConstructorProvider: React.FC<PageConstructorProviderProps> = (props) => {
    const {
        content: {animated = true} = {},
        isMobile,
        isTablet,
        metrika = {},
        ssrConfig = {},
        location = {},
        locale = {},
        theme = DEFAULT_THEME,
        ...rest
    } = props;

    const constructor = <PageConstructor content={props.content} {...rest} />;

    /* eslint-disable react/jsx-key */
    const context = [
        <ThemeValueContext.Provider value={{themeValue: theme}} />,
        <LocaleContext.Provider value={locale} />,
        <LocationContext.Provider value={location} />,
        <MobileContext.Provider value={Boolean(isMobile)} />,
        <TabletContext.Provider value={Boolean(isTablet)} />,
        <MetrikaContext.Provider value={metrika} />,
        <SSRContext.Provider value={{isServer: ssrConfig?.isServer}} />,
        <AnimateContext.Provider value={{animated}} />,
    ].reduceRight((prev, provider) => React.cloneElement(provider, {}, prev), constructor);
    /* eslint-enable react/jsx-key */

    return <Fragment>{context}</Fragment>;
};
