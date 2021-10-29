import React from 'react';
import {AnimateContext} from '../../context/animateContext';
import {MetrikaContext} from '../../context/metrikaContext';
import {MobileContext} from '../../context/mobileContext';
import {SSRContext} from '../../context/ssrContext';
import {LocaleContext, LocaleContextProps} from '../../context/localeContext';
import {LocationContext, LocationContextProps} from '../../context/locationContext';
import {SSRConfig} from '../../models';
import {PageConstructor, PageConstructorProps} from './PageConstructor';

export interface PageConstructorProviderProps extends PageConstructorProps {
    isMobile?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metrika?: any;
    ssrConfig?: SSRConfig;
    location?: LocationContextProps;
    locale?: LocaleContextProps;
}

export const PageConstructorProvider: React.FC<PageConstructorProviderProps> = (props) => {
    const {
        content: {animated = true} = {},
        isMobile,
        metrika,
        ssrConfig = {},
        location = {},
        locale = {},
        ...rest
    } = props;

    return (
        <LocaleContext.Provider value={locale}>
            <LocationContext.Provider value={location}>
                <MobileContext.Provider value={Boolean(isMobile)}>
                    <MetrikaContext.Provider value={{metrika}}>
                        <SSRContext.Provider value={{isServer: ssrConfig?.isServer}}>
                            <AnimateContext.Provider value={{animated}}>
                                <PageConstructor content={props.content} {...rest} />
                            </AnimateContext.Provider>
                        </SSRContext.Provider>
                    </MetrikaContext.Provider>
                </MobileContext.Provider>
            </LocationContext.Provider>
        </LocaleContext.Provider>
    );
};
