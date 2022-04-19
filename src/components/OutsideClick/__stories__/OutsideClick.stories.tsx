import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import OutsideClick, {OutsideClickProps} from '../OutsideClick';
import {COMPONENTS} from '../../../demo/constants';

export default {
    component: OutsideClick,
    title: `${COMPONENTS}/OutsideClick`,
    parameters: {
        docsOnly: true,
        docs: {
            description: {
                component:
                    'Обертка для элементов интерфейса. При клике вне элемента вызывается функция `onOutsideClick`. При клике на элемент вызывается функция `onClick`',
            },
        },
    },
} as Meta;

const code = `<OutsideClickProps className="..." onOutsideClick={() => {...}} onClick={() => {...}}>
    children
</OutsideClickProps>`;

export const Default: Story<OutsideClickProps> = () => (
    <div className="yfm">
        <pre>
            <code>{code}</code>
        </pre>
    </div>
);
