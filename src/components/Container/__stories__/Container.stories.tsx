import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';

import Container, {ContainerProps} from '../Container';
import {COMPONENTS} from '../../../constants';
import {GridColumnSize} from '../../../grid';
import Grid from '../../Grid/Grid';

export default {
    component: Container,
    title: `${COMPONENTS}/Container`,
    argTypes: {
        sizes: {
            description: 'Количество колонок, занимаемого Container',
        },
        offsets: {
            description: 'Количество колонок в строке',
        },
        hidden: {
            description: 'Ширина от которой элемент будет скрыт',
        },
        visible: {
            description: 'Ширина от которой элемент будет видим',
        },
    },
} as Meta;

const DefaultTemplate: Story<ContainerProps> = (args) => (
    <Grid>
        <Container {...args}>1</Container>
        <Container {...args}>2</Container>
        <Container {...args}>3</Container>
        <Container {...args}>4</Container>
        <Container {...args}>5</Container>
    </Grid>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    sizes: {
        [GridColumnSize.All]: 2,
        [GridColumnSize.Sm]: 2,
        [GridColumnSize.Lg]: 2,
        [GridColumnSize.Xl]: 2,
        [GridColumnSize.Md]: 2,
    },
    hidden: GridColumnSize.Sm,
    visible: GridColumnSize.Sm,
    offsets: {
        [GridColumnSize.All]: 12,
        [GridColumnSize.Sm]: 12,
        [GridColumnSize.Lg]: 12,
        [GridColumnSize.Xl]: 12,
        [GridColumnSize.Md]: 12,
    },
    sticky: false,
};
