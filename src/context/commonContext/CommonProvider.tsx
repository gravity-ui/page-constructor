import React from 'react';
import {ThemeProvider, ThemeProviderProps} from '../theme';
import {MobileProvider, MobileProviderProps} from '../mobileAppContext';

export interface CommonProviderProps extends ThemeProviderProps, MobileProviderProps {}

export class CommonProvider extends React.Component<CommonProviderProps> {
    render() {
        const {children, theme, mobile, platform, useLocation, useHistory} = this.props;

        return (
            <ThemeProvider theme={theme}>
                <MobileProvider
                    mobile={mobile}
                    platform={platform}
                    useHistory={useHistory}
                    useLocation={useLocation}
                >
                    {children}
                </MobileProvider>
            </ThemeProvider>
        );
    }
}
