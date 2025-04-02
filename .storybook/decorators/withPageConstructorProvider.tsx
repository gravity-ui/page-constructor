import * as React from 'react';
import type {Decorator} from '@storybook/react';
import {PageConstructorProvider} from '../../src/containers/PageConstructor/Provider';

export const withPageConstructorProvider: Decorator = (Story, context) => {
    return (
        <PageConstructorProvider
            isMobile={context.globals.platform === 'mobile'}
            locale={{lang: context.globals.lang}}
            theme={context.globals.theme}
        >
            <Story {...context} />
        </PageConstructorProvider>
    );
};
