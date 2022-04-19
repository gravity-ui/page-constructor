import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import HeightCalculator, {HeightCalculatorProps} from '../HeightCalculator';
import {COMPONENTS} from '../../../demo/constants';

export default {
    component: HeightCalculator,
    title: `${COMPONENTS}/HeightCalculator`,
    parameters: {
        docsOnly: true,
        docs: {
            description: {
                component:
                    'Обертка для элементов интерфейса. При событии resize для window, вызывается функция `onCalculate`. Первым аргументом функция `onCalculate` получает высоту children-а с максимальной offsetHeight.',
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
