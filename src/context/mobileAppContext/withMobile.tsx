import React from 'react';
import {Subtract} from 'utility-types';
import {MobileAppContext, MobileAppContextProps} from './MobileAppContext';

export interface WithMobileProps extends MobileAppContextProps {}

export function withMobile<T extends WithMobileProps>(
    WrappedComponent: React.ComponentType<T>,
): React.ComponentType<Subtract<T, WithMobileProps>> {
    const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    return class WithMobileComponent extends React.Component<Subtract<T, WithMobileProps>> {
        static displayName = `withMobile(${componentName})`;
        static contextType = MobileAppContext;

        render() {
            return (
                <WrappedComponent
                    {...(this.props as T)}
                    mobile={this.context.mobile}
                    platform={this.context.platform}
                    useHistory={this.context.useHistory}
                    useLocation={this.context.useLocation}
                    setMobile={this.context.setMobile}
                    setPlatform={this.context.setPlatform}
                />
            );
        }
    };
}
