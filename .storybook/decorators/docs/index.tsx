import {DocsContainer} from '@storybook/addon-docs';
import type {DocsContainerProps} from '@storybook/addon-docs';
import block from 'bem-cn-lite';
import React from 'react';

import {themes} from '../../theme';
import {MobileContext} from '../../../src/context/mobileContext';

import './DocsDecorator.scss';

export interface DocsDecoratorProps extends React.PropsWithChildren<DocsContainerProps> {}

const b = block('docs-decorator');

export function DocsDecorator({children, context}: DocsDecoratorProps) {
    // @ts-expect-error
    const theme = context.store.globals.globals.theme;

    return (
        <div className={b()}>
            <DocsContainer context={context} theme={themes[theme as 'dark' | 'light']}>
                <MobileContext.Provider value={false}>{children}</MobileContext.Provider>
            </DocsContainer>
        </div>
    );
}
