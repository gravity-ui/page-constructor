import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import HeightCalculator, {HeightCalculatorProps} from '../HeightCalculator';
import {COMPONENTS} from '../../../demo/constants';

import data from './data.json';

export default {
    component: HeightCalculator,
    title: `${COMPONENTS}/HeightCalculator`,
    parameters: {
        docsOnly: true,
        docs: {
            description: {
                component: data.default.content.description,
            },
        },
    },
} as Meta;

export const Default: Story<HeightCalculatorProps> = () => (
    <div className="yfm">
        <pre>
            <code>
                {'<HeightCalculator onCalculate={(height) => {...}}>children</HeightCalculator>'}
            </code>
        </pre>
    </div>
);
