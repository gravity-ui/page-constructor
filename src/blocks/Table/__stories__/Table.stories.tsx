import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Table from '../Table';
import {PageConstructor} from '../../../containers/PageConstructor';
import {BlockType, TableBlockModel} from '../../../models';

export default {
    component: Table,
    title: 'Блоки/Table',
} as Meta;

const DefaultTemplate: Story<TableBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.TableBlock,
    title: 'Разделение ответственности за обеспечение безопасности',
    table: {
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
    },
};
