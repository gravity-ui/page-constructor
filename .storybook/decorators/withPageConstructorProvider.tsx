import * as React from 'react';
import type {Decorator} from '@storybook/react';
import {PageConstructorProvider} from '../../src/containers/PageConstructor/Provider';

export const withPageConstructorProvider: Decorator = (Story, context) => {
    return (
        <PageConstructorProvider>
            <Story {...context} />
        </PageConstructorProvider>
    );
};
