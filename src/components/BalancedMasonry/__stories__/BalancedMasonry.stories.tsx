import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import BalancedMasonry, {BalancedMasonryProps} from '../BalancedMasonry';
import {BREAKPOINTS, COMPONENTS} from '../../../constants';
import CardBase from '../../CardBase/CardBase';

import './BalancedMansonry.stories.scss';

export default {
    component: BalancedMasonry,
    title: `${COMPONENTS}/BalancedMasonry`,
} as Meta;

const DefaultTemplate: Story<BalancedMasonryProps> = (args) => <BalancedMasonry {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    className: 'balanced-masonry-stories__class-name',
    columnClassName: 'balanced-masonry-stories__column-class-name',
    children: [
        <CardBase key="1" className="balanced-masonry-stories__card-base">
            <CardBase.Content>
                Вы всегда можете предложить новую возможность или улучшение в разделе Идеи.
            </CardBase.Content>
        </CardBase>,
        <CardBase key="2" className="balanced-masonry-stories__card-base">
            <CardBase.Content>
                Создавайте кластеры Managed Services for Kubernetes®, контролируйте их состояние и
                смотрите логи — всё в вашем мобильном телефоне.
            </CardBase.Content>
        </CardBase>,
        <CardBase key="3" className="balanced-masonry-stories__card-base">
            <CardBase.Content>
                Прямо из приложения вы можете получить ответ на любой вопрос касательно работы
                сервисов Yandex Cloud, написав сообщение и приложив скриншоты возникшей проблемы.
            </CardBase.Content>
        </CardBase>,
        <CardBase key="4" className="balanced-masonry-stories__card-base">
            <CardBase.Content>
                Предлагайте возможности, которых вам не хватает для полноценного управления вашим
                облаком прямо из приложения, и мы добавим их в новых релизах.
            </CardBase.Content>
        </CardBase>,
        <CardBase key="5" className="balanced-masonry-stories__card-base">
            <CardBase.Content>
                Лента новостей платформы позволит вам узнать о запуске новых сервисов и новых
                технологиях, а также зарегистрироваться на ближайшие мероприятия.
            </CardBase.Content>
        </CardBase>,
        <CardBase key="6" className="balanced-masonry-stories__card-base">
            <CardBase.Content>
                В приложении реализован доступ к данным в бакетах объектного хранения Object
                Storage, а также возможность мониторинга состояния сервиса с помощью графиков на
                дашбордах. В приложении реализован доступ к данным в бакетах объектного хранения
                Object Storage, а также возможность мониторинга состояния сервиса с помощью графиков
                на дашбордах.
            </CardBase.Content>
        </CardBase>,
        <CardBase key="7" className="balanced-masonry-stories__card-base">
            <CardBase.Content>
                На страницах ресурсов доступна полная информация о их работе, графики нагрузки из
                системы мониторинга и сведения о производимых операциях.
            </CardBase.Content>
        </CardBase>,
        <CardBase key="8" className="balanced-masonry-stories__card-base">
            <CardBase.Content>
                Лента новостей платформы позволит вам узнать о запуске новых сервисов и новых
                технологиях, а также зарегистрироваться на ближайшие мероприятия. Лента новостей
                платформы позволит вам узнать о запуске новых сервисов и новых технологиях, а также
                зарегистрироваться на ближайшие мероприятия.Лента новостей платформы позволит вам
                узнать о запуске новых сервисов и новых технологиях, а также зарегистрироваться на
                ближайшие мероприятия.Лента новостей платформы позволит вам узнать о запуске новых
                сервисов и новых технологиях, а также зарегистрироваться на ближайшие
                мероприятия.Лента новостей платформы позволит вам узнать о запуске новых сервисов и
                новых технологиях, а также зарегистрироваться на ближайшие мероприятия.Лента
                новостей платформы позволит вам узнать о запуске новых сервисов и новых технологиях,
                а также зарегистрироваться на ближайшие мероприятия.
            </CardBase.Content>
        </CardBase>,
        <CardBase key="9" className="balanced-masonry-stories__card-base">
            <CardBase.Content>
                В приложении реализован доступ к данным в бакетах объектного хранения Object
                Storage, а также возможность мониторинга состояния сервиса с помощью графиков на
                дашбордах.
            </CardBase.Content>
        </CardBase>,
        <CardBase key="10" className="balanced-masonry-stories__card-base">
            <CardBase.Content>
                Вы можете настроить аутентификацию в Yandex Cloud через свой сервер с Single
                Sign‑On. Благодаря поддержке идентификации федераций удостоверений, ваши
                пользователи получат доступ в приложение по корпоративному аккаунту.
            </CardBase.Content>
        </CardBase>,
        <CardBase key="11" className="balanced-masonry-stories__card-base">
            <CardBase.Content>
                С помощью приложения вы можете контролировать остаток на счёте, пополнять баланс и
                изучать детализацию расходов.
            </CardBase.Content>
        </CardBase>,
    ],
    breakpointCols: {
        [BREAKPOINTS.lg]: 3,
        [BREAKPOINTS.md]: 2,
        [BREAKPOINTS.sm]: 1,
    },
};
