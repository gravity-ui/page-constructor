import * as React from 'react';

import {ThemeProvider} from '@gravity-ui/uikit';
import {useArgs} from '@storybook/preview-api';
import {Decorator} from '@storybook/react';

import FormGenerator from '../../../src/form-generator-v2/FormGenerator';
import type {Fields} from '../../../src/form-generator-v2/types';

import {GLOBAL_KEY} from './constants';

export const withFormAddon: Decorator = (Story, context) => {
    const [args, updateArgs] = useArgs();
    const inputs = context.parameters.inputs as Fields | undefined;
    const isActive = Boolean(context.globals[GLOBAL_KEY]);

    if (!isActive || !inputs) {
        return <Story />;
    }

    return (
        <ThemeProvider theme="dark">
            <div style={{display: 'flex', alignItems: 'flex-start', width: '100%'}}>
                <div
                    style={{
                        flex: 1,
                        position: 'sticky',
                        top: 0,
                        marginLeft: 'var(--g-spacing-4)',
                        paddingTop: 'var(--g-spacing-4)',
                    }}
                >
                    <Story />
                </div>
                <div
                    style={{
                        width: 420,
                        flexShrink: 0,
                        border: '1px solid var(--g-color-line-generic)',
                        borderRadius: 'var(--g-border-radius-m)',
                        margin: 'var(--g-spacing-4)',
                    }}
                >
                    <h4
                        style={{
                            padding: 'var(--g-spacing-4) var(--g-spacing-3)',
                            fontFamily: 'var(--g-text-subheader-font-family)',
                            fontWeight: 'var(--g-text-subheader-font-weight)',
                            fontSize: 'var(--g-text-subheader-3-font-size)',
                            lineHeight: 'var(--g-text-subheader-3-line-height)',
                            margin: 0,
                        }}
                    >
                        Form
                    </h4>
                    <FormGenerator
                        blockConfig={inputs}
                        contentConfig={args}
                        onUpdate={updateArgs}
                    />
                </div>
            </div>
        </ThemeProvider>
    );
};

export const decorators = [withFormAddon];
