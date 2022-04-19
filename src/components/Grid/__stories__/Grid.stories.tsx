import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Grid, {GridProps} from '../Grid';
import {COMPONENTS} from '../../../demo/constants';

const container = '[Container](?path=/story/компоненты-container--default&viewMode=docs)';

export default {
    component: Grid,
    title: `${COMPONENTS}/Grid`,
    parameters: {
        docsOnly: true,
        docs: {
            description: {
                component: `Используется вместе с ${container}. Распределяет элементы, обернутые в ${container}, по столбикам в соответствии с props в ${container} `,
            },
        },
    },
} as Meta;

const code = `<Grid justify="...">
    <Container sizes={{...}} hidden="..." visible="..." offsets={{...}} sticky={...}>...</Container>
    <Container sizes={{...}} hidden="..." visible="..." offsets={{...}} sticky={...}>...</Container>
    ...
    <Container sizes={{...}} hidden="..." visible="..." offsets={{...}} sticky={...}>...</Container>
</Grid>`;

export const Default: Story<GridProps> = () => (
    <div className="yfm">
        <pre>
            <code>{code}</code>
        </pre>
    </div>
);
