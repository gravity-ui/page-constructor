import {Meta, Story} from '@storybook/react/types-6-0';
import yfm from '@doc-tools/transform';
import React from 'react';

import Text from '../Text';
import {TextProps} from '../../../models';
import {COMPONENTS} from '../../../demo/constants';

export default {
    component: Text,
    title: `${COMPONENTS}/Text`,
} as Meta;

const DefaultTemplate: Story<TextProps> = (args) => <Text {...args} />;
const FootnotesTemplate: Story<TextProps> = (args) => <Text {...args} />;

export const Default = DefaultTemplate.bind({});
export const Footnotes = FootnotesTemplate.bind({});

Default.args = {
    text: yfm(
        '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
    ).result.html,
    folded: yfm(
        'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
    ).result.html,
    justify: 'start',
};

Footnotes.args = {
    text: yfm(
        '1. Включая НДС. Порядок и условия предоставления гранта указаны в [полных условиях программы Cloud Boost Start](https://cloud.yandex.ru/cloud-boost/terms-start).',
    ).result.html,
    footnote: true,
};
