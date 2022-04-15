import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import TutorialCard from '../TutorialCard';
import {TutorialCardProps} from '../../../models';
import {CARDS, COMPONENTS} from '../../../constants';

export default {
    component: TutorialCard,
    title: `${COMPONENTS}/${CARDS}/TutorialCard`,
} as Meta;

const DefaultTemplate: Story<TutorialCardProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <TutorialCard {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    url: '#',
    title: 'Как развернуть 1С с кластером Microsoft SQL Server<sup>™</sup>',
    text: 'Создайте кластер базы данных MicrosoftSQLServer<sup>™</sup> самостоятельно или используйте сервис Managed Service for SQL Server<sup>™</sup>. Эта база данных оптимальна для работы с 1С:Предприятие.',
    border: 'shadow',
    icon: {
        src: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/prices/rub.svg',
    },
};
