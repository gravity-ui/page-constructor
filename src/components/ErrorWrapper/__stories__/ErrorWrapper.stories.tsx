import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import ErrorWrapper, {ErrorWrapperProps} from '../ErrorWrapper';
import {COMPONENTS} from '../../../demo/constants';

export default {
    component: ErrorWrapper,
    title: `${COMPONENTS}/ErrorWrapper`,
} as Meta;

const DefaultTemplate: Story<ErrorWrapperProps> = (args) => <ErrorWrapper {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    text: 'Что-то сломалось',
    handler: () => console.log('Клик'),
    isError: true,
    buttonText: 'Попробовать еще раз',
    children: <div>Это children</div>,
};
