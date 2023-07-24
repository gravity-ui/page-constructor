import {DocsContainer} from '@storybook/addon-docs';
import type {DocsContainerProps} from '@storybook/addon-docs';
import block from 'bem-cn-lite';
import React from 'react';

import {themes} from '../../.storybook/theme';
import {MobileContext} from '../../src/context/mobileContext';
import {ThemeProvider} from '../../src/context/theme/ThemeProvider';

import './DocsDecorator.scss';

export interface DocsDecoratorProps extends React.PropsWithChildren<DocsContainerProps> {}

const b = block('docs-decorator');

export function DocsDecorator({children, context}: DocsDecoratorProps) {
    // @ts-expect-error
    const theme = context.store.globals.globals.theme;

    return (
        <div className={b()}>
            <DocsContainer context={context} theme={themes[theme as 'dark' | 'light']}>
                <ThemeProvider theme={theme}>
                    <MobileContext.Provider value={false}>{children}</MobileContext.Provider>
                </ThemeProvider>
            </DocsContainer>
        </div>
    );
}
