import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Table from '../Table';
import {TableProps} from '../../../models';
import {COMPONENTS} from '../../../constants';

export default {
    component: Table,
    title: `${COMPONENTS}/Table`,
} as Meta;

const DefaultTemplate: Story<TableProps> = (args) => <Table {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    content: [
        ['Процессы', 'Собственная инфраструктура', 'IaaS', 'PaaS'],
        ['Управление доступом к данным', '0', '0', '0'],
        ['Безопасность ОС и приложений', '0', '0', '1'],
        ['Сетевая безопасность (Overlay)', '0', '0', '1'],
        ['Логи аудита', '0', '1', '1'],
        ['Физическая безопасность и катастрофоустойчивость (DR)', '1', '1', '1'],
    ],
    legend: ['Клиент', 'Yandex Cloud'],
    justify: ['start', 'center', 'center', 'center'],
    marker: 'disk',
};
