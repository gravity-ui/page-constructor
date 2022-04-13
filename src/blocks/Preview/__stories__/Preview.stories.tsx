import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import Preview from '../Preview';
import {BlockType, PreviewBlockModel, PreviewItemType, MediaVideoType} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    title: 'Блоки/Preview',
    component: Preview,
} as Meta;

const DefaultTemplate: Story<PreviewBlockModel> = (args) => {
    return <PageConstructor content={{blocks: [args]}} />;
};
export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.PreviewBlock,
    direction: 'content-media',
    ratioMediaContent: '2-1',
    stopVideo: true,
    showImmediately: true,
    items: [
        {
            type: PreviewItemType.Video,
            media: {
                light: {
                    video: {
                        type: MediaVideoType.Player,
                        src: ['https://youtu.be/2dgZ8c-MGlc'],
                        loop: true,
                    },
                    previewImg:
                        'https://storage.yandexcloud.net/cloud-www-assets/solutions/data-warehouse/scale-managed-greenplum.png',
                },
                dark: {
                    video: {
                        type: MediaVideoType.Player,
                        src: ['https://youtu.be/eR6XrldgrpM'],
                        loop: true,
                    },
                    previewImg:
                        'https://storage.yandexcloud.net/cloud-www-assets/solutions/data-warehouse/greenplum-cover.png',
                },
            },
            content: {
                title: 'Managed Greenplum: хранилище данных в облаке',
                description:
                    'Расскажем о создании Data Warehouse в Yandex.Cloud на базе нового сервиса Managed Greenplum.',
            },
        },
        {
            type: PreviewItemType.Video,
            media: {
                video: {
                    type: MediaVideoType.Player,
                    src: ['https://youtu.be/eR6XrldgrpM'],
                    loop: true,
                },
                previewImg:
                    'https://storage.yandexcloud.net/cloud-www-assets/solutions/data-warehouse/greenplum-cover.png',
            },
            content: {
                title: 'Greenplum Community Meetup',
                description:
                    'Как быстро стартовать с Greenplum и построить гибкое и надежное корпоративное хранилище.',
            },
        },
    ],
};
