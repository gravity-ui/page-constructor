import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import HeaderWithImage, {HeaderWithImageProps} from '../HeaderWithImage';
import {COMPONENTS, HEADERS} from '../../../constants';

export default {
    component: HeaderWithImage,
    title: `${COMPONENTS}/${HEADERS}/HeaderWithImage`,
} as Meta;

const DefaultTemplate: Story<HeaderWithImageProps> = (args) => (
    <HeaderWithImage {...args}>
        <div>Место для children</div>
    </HeaderWithImage>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    title: 'Облачные решения для <a href="#">компаний-разработчиков</a> сервисов и приложений',
    subtitle:
        'Разрабатывайте, тестируйте и запускайте новые продукты с <a>Yandex Cloud</a>, воплотите ваши идеи в жизнь быстрее и дешевле. </br> Современные облачные технологии упрощают инфраструктуру, сокращают время вывода на рынок новых продуктов (Time-to-Market) и уменьшают размер инвестиций на разработку.',
    image: 'https://storage.yandexcloud.net/cloud-www-assets/solutions/test-and-dev/razrabotka-big.png',
};
