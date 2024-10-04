'use client';
import React from 'react';

import {PageConstructor, PageConstructorProvider} from '../../../src';

export default function Home() {
    return (
        <PageConstructorProvider projectSettings={{disableCompress: true}}>
            <PageConstructor
                content={{
                    blocks: [
                        {
                            type: 'header-block',
                            title: 'Yandex Open Source',
                            description:
                                'Мы в Яндексе верим, что вклад в опенсорс — это вклад в технологическую эволюцию: без открытости, совместной работы и поддержки развитие IT‑индустрии сильно затруднено. Уже много лет мы используем в своих продуктах сторонние открытые технологии, а также делимся собственными и активно вовлекаем в их развитие разработчиков по всему миру.',
                            width: 's',
                            verticalOffset: 'l',
                            offset: 'default',
                            resetPaddings: true,
                            background: {
                                image: {
                                    mobile: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/yos-index-cover-m.png',
                                    desktop:
                                        'https://storage.yandexcloud.net/yandex-opensource/pages/index/yos-index-cover.png',
                                },
                                color: '#EFF2F8',
                                fullWidth: false,
                                fullWidthMedia: true,
                            },
                        },
                        {
                            type: 'extended-features-block',
                            title: {
                                text: 'Почему мы выкладываем наши технологии в открытый доступ?',
                            },
                            items: [
                                {
                                    title: 'Ответственность',
                                    icon: 'https://storage.yandexcloud.net/cloud-www-assets/pages/open-source/os-index-icon-01.svg',
                                    text: 'Мы верим, что вкладываться в развитие опенсорс‑технологий — это ответственность каждого технологического лидера на рынке. Без опенсорс‑решений не появились бы многие продукты и сервисы не только Яндекса, но и других крупных компаний, и мы хотим отдавать обратно, делиться теми нашими решениями, которые, как мы считаем, принесут реальную пользу.',
                                },
                                {
                                    title: 'Польза для сообщества',
                                    icon: 'https://storage.yandexcloud.net/cloud-www-assets/pages/open-source/os-index-icon-02.svg',
                                    text: 'Технологии, которые мы разрабатываем, ежедневно помогают нам эффективно решать огромное количество самых разных задач в наших сервисах. Мы знаем, что разработчики вне Яндекса часто сталкиваются с теми же самыми задачами — и верим, что наши технологии могут быть полезны и им.',
                                },
                                {
                                    title: 'Качество сервисов',
                                    icon: 'https://storage.yandexcloud.net/cloud-www-assets/pages/open-source/os-index-icon-03.svg',
                                    text: 'Для нас важно разрабатывать и использовать только качественные технологические решения. В особенности это касается опенсорса: зная, что наши решения увидят и будут использовать другие, мы уделяем их качеству особое внимание. А уже в открытом доступе у технологии больше шансов развиваться и улучшаться — в том числе, при участии сообщества разработчиков.',
                                },
                                {
                                    title: 'Бизнес‑потенциал',
                                    icon: 'https://storage.yandexcloud.net/cloud-www-assets/pages/open-source/os-index-icon-04.svg',
                                    text: 'Мы верим, что при условии роста популярности наших решений и спроса на них со стороны сообщества, то, что мы выкладываем в опенсорс, может далее стать для нас бизнесом. То, что мы выкладываем в опенсорс, можно использовать и во внешних коммерческих проектах.',
                                },
                                {
                                    title: 'Поиск талантов',
                                    icon: 'https://storage.yandexcloud.net/cloud-www-assets/pages/open-source/os-index-icon-05.svg',
                                    text: 'Мы ценим каждого, кто вкладывается в сторонние опенсорс‑решения или делится с миром своими. Контрибьюторы в наши продукты нам особенно важны: среди них мы ищем и находим тех, кто сможет развивать технологии уже будучи частью команды Яндекса.',
                                },
                            ],
                        },
                        {
                            type: 'card-layout-block',
                            animated: false,
                            title: 'Краткая история опенсорса в Яндексе',
                            description:
                                'С начала истории развития опенсорса в Яндексе мы успели выложить в открытый доступ десятки собственных проектов, использовать в разработке наших продуктов внешние технологии, а также внесли существенный вклад в их развитие.',
                            colSizes: {
                                all: 12,
                                lg: 3,
                                md: 4,
                                sm: 6,
                            },
                            anchor: {
                                url: 'history',
                                text: 'history',
                            },
                            children: [
                                {
                                    type: 'layout-item',
                                    content: {
                                        title: '2010',
                                        text: 'Методология веб‑разработки БЭМ (Блок‑Элемент‑Модификатор) выходит в оперсорс',
                                    },
                                    media: {
                                        image: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/os-index-timeline-01.png',
                                    },
                                },
                                {
                                    type: 'layout-item',
                                    content: {
                                        title: '2012',
                                        text: 'Запуск Яндекс Браузера на базе Blink (Chromium)',
                                    },
                                    media: {
                                        image: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/os-index-timeline-02.png',
                                    },
                                },
                                {
                                    type: 'layout-item',
                                    content: {
                                        title: '2013',
                                        text: 'Яндекс начинает контрибьютить в ядро Linux',
                                    },
                                    media: {
                                        image: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/os-index-timeline-03.png',
                                    },
                                },
                                {
                                    type: 'layout-item',
                                    content: {
                                        title: '2016',
                                        text: 'Выход в опенсорс ClickHouse\n\nВыход в опенсорс Hermione (с 2024 года — Testplane)',
                                    },
                                    media: {
                                        image: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/os-index-timeline-2016.png',
                                    },
                                },
                                {
                                    type: 'layout-item',
                                    content: {
                                        title: '2017',
                                        text: 'Выход в опенсорс CatBoost\nЯндекс начинает контрибьютить в PostgreSQL',
                                    },
                                    media: {
                                        image: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/os-index-timeline-05.png',
                                    },
                                },
                                {
                                    type: 'layout-item',
                                    content: {
                                        title: '2018',
                                        text: 'Выход в опенсорс Одиссея\n\nЯндекс — топ‑контрибьютор в WAL‑G',
                                    },
                                    media: {
                                        image: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/os-index-timeline-06.png',
                                    },
                                },
                                {
                                    type: 'layout-item',
                                    content: {
                                        title: '2019',
                                        text: 'В Яндексе появляется команда разработки СУБД с открытым исходным кодом\n\nЯндекс — спонсор разработки PostgreSQL',
                                    },
                                    media: {
                                        image: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/os-index-timeline-07.png',
                                    },
                                },
                                {
                                    type: 'layout-item',
                                    content: {
                                        title: '2020',
                                        text: 'Выход в опенсорс Testsuite',
                                    },
                                    media: {
                                        image: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/os-index-timeline-2020.png',
                                    },
                                },
                                {
                                    type: 'layout-item',
                                    content: {
                                        title: '2022',
                                        text: 'Яндекс — один из основных спонсоров разработки PostgreSQL\n\nВыход в опенсорс YDB, userver, YaLM 100B, DivKit, Yatagan\n\nСтарт программы «Код для всех»',
                                    },
                                    media: {
                                        image: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/os-index-timeline-09.png',
                                    },
                                },
                                {
                                    type: 'layout-item',
                                    content: {
                                        title: '2023',
                                        text: 'Выход в опенсорс YTsaurus, Gravity&#160;UI, AppMetrica, Diplodoc, DataLens и счётчика Метрики\n\nСтарт Программы грантов Yandex Open Source',
                                    },
                                    media: {
                                        image: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/os-index-timeline-2023.png',
                                    },
                                },
                                {
                                    type: 'layout-item',
                                    content: {
                                        title: '2024',
                                        text: 'Первый Yandex Open Source Jam\n\nВыход в опенсорс YaFSDP',
                                    },
                                    media: {
                                        image: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/os-index-timeline-2024.png',
                                    },
                                },
                            ],
                        },
                        {
                            type: 'card-layout-block',
                            title: 'Наши проекты',
                            description:
                                'В Яндексе мы разрабатываем и развиваем технологические решения самых разных сфер применения, размеров и сложности. Поэтому и в открытый доступ попадают самые разные проекты — главное, чтобы они приносили пользу не только нам, но и другим.',
                            colSizes: {
                                all: 12,
                                lg: 3,
                                md: 4,
                                sm: 6,
                            },
                            anchor: {
                                url: 'projects',
                                text: 'projects',
                            },
                            children: [
                                {
                                    type: 'background-card',
                                    title: 'YDB',
                                    text: 'Отказоустойчивая распределённая SQL база данных',
                                    backgroundColor: '#2399FF',
                                    background: {
                                        src: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/os-index-card-ydb.png',
                                        alt: 'card-background',
                                    },
                                    paddingBottom: 'm',
                                    theme: 'dark',
                                },
                                {
                                    type: 'background-card',
                                    title: 'YTsaurus',
                                    text: 'Платформа для хранения и обработки больших данных',
                                    backgroundColor: '#FFB23E',
                                    background: {
                                        src: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/os-index-card-yt.png',
                                        alt: 'card-background',
                                    },
                                    paddingBottom: 'm',
                                    theme: 'light',
                                },
                                {
                                    type: 'background-card',
                                    title: 'GravityUI',
                                    text: 'Библиотеки для создания интерфейсов',
                                    backgroundColor: '#262626',
                                    background: {
                                        src: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/os-index-card-gui.png',
                                        alt: 'card-background',
                                    },
                                    paddingBottom: 'm',
                                    theme: 'dark',
                                },
                                {
                                    type: 'background-card',
                                    title: 'DivKit',
                                    text: 'Фреймворк для server‑driven интерфейсов',
                                    backgroundColor: '#F1F1F1',
                                    background: {
                                        src: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/os-index-card-dk.png',
                                        alt: 'card-background',
                                    },
                                    paddingBottom: 'm',
                                    theme: 'light',
                                },
                                {
                                    type: 'background-card',
                                    title: 'Diplodoc',
                                    text: 'Платформа для написания документации в концепции Docs as Code',
                                    backgroundColor: '#79F985',
                                    background: {
                                        src: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/os-index-card-dd.png',
                                        alt: 'card-background',
                                    },
                                    paddingBottom: 'm',
                                    theme: 'light',
                                },
                                {
                                    type: 'background-card',
                                    title: 'userver',
                                    text: 'Фреймворк для создания высоконагруженных приложений',
                                    backgroundColor: '#FF9D73',
                                    background: {
                                        src: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/os-index-card-u.png',
                                        alt: 'card-background',
                                    },
                                    paddingBottom: 'm',
                                    theme: 'light',
                                },
                                {
                                    type: 'background-card',
                                    title: 'DataLens',
                                    text: 'BI-платформа для анализа и визуализации данных',
                                    backgroundColor: '#FF7132',
                                    background: {
                                        src: 'https://storage.yandexcloud.net/yandex-opensource/pages/index/os-index-card-dl.png',
                                        alt: 'card-background',
                                    },
                                    paddingBottom: 'm',
                                    theme: 'dark',
                                },
                                {
                                    type: 'basic-card',
                                    title: 'И это ещё не всё',
                                    text: 'Узнать про наши опенсорс‑проекты больше вы можете на другой странице',
                                    border: 'none',
                                    buttons: [
                                        {
                                            text: 'Все проекты',
                                            primary: true,
                                            theme: 'monochrome',
                                            size: 'promo',
                                            url: '/projects',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            largeMedia: true,
                            mediaOnly: false,
                            size: 'l',
                            type: 'media-block',
                            direction: 'content-media',
                            anchor: {
                                url: '1',
                                text: 'Фильм',
                            },
                            title: 'Смотрите фильм с YaC 22',
                            description:
                                'Руководители опенсорс‑проектов рассказывают про историю и культуру открытого кода в Яндексе.',
                            media: {
                                youtube: 'https://www.youtube.com/watch?v=G7G286S8ntc',
                                previewImg:
                                    'https://storage.yandexcloud.net/cloud-www-assets/pages/open-source/video-cover.png',
                            },
                            disableShadow: true,
                        },
                        {
                            type: 'content-layout-block',
                            size: 'l',
                            centered: true,
                            textContent: {
                                title: '',
                                text: '',
                                additionalInfo: '',
                                buttons: [
                                    {
                                        text: 'Сделано на GravityUI',
                                        theme: 'monochrome',
                                        img: 'https://storage.yandexcloud.net/cloud-www-assets/pages/open-source/open-source-gravity-ui-button.svg',
                                        url: 'https://gravity-ui.com/',
                                    },
                                ],
                            },
                        },
                    ],
                }}
            />
        </PageConstructorProvider>
    );
}
