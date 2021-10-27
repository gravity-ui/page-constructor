import React, {Component, ComponentType} from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {AnimateContext, AnimateContextProps} from '../context/animateContext/AnimateContext';

export default function withAnimateContext<T extends AnimateContextProps>(
    WrappedComponent: ComponentType<T>,
) {
    const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    class WithAnimateContext extends Component<Omit<T, keyof AnimateContextProps>> {
        static displayName = `withAnimateContext(${componentName})`;
        static contextType = AnimateContext;

        render() {
            return <WrappedComponent {...(this.props as T)} {...this.context} />;
        }
    }

    // Copies non-react specific statics from a child component to a parent component
    hoistNonReactStatics(WithAnimateContext, WrappedComponent);
    return WithAnimateContext;
}
