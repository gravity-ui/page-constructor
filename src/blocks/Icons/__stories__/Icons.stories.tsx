import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import Icons from '../Icons';
import {BlockType, IconsBlockModel} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    title: 'Компоненты/Icons',
    component: Icons,
} as Meta;

interface TemplateProps {
    items: IconsBlockModel[];
}

const DefaultTemplate: Story<TemplateProps> = (args) => (
    <PageConstructor content={{blocks: args.items}} />
);

const SizeTemplate: Story<TemplateProps> = (args) => (
    <PageConstructor content={{blocks: args.items}} />
);

export const Default = DefaultTemplate.bind([]);
export const Size = SizeTemplate.bind([]);

Default.args = {
    items: [
        {
            type: BlockType.IconsBlock,
            size: 's',
            items: [
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'Telegram',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'Slack',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'GitHub',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'GitHub',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'GitHub',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'GitHub',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'GitHub',
                    url: '#',
                },
            ],
        },
    ],
};

Size.args = {
    items: [
        {
            type: BlockType.IconsBlock,
            size: 's',
            title: 'Size S',
            items: [
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/telegram.svg',
                    text: 'Telegram',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/slack.svg',
                    text: 'Slack',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/git.svg',
                    text: 'GitHub',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/youtube.svg',
                    text: 'YouTube',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/stack.svg',
                    text: 'Stack Overflow',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'Twitter',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/facebook.svg',
                    text: 'Facebook',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/rss.svg',
                    text: 'RSS',
                    url: '#',
                },
            ],
        },
        {
            type: BlockType.IconsBlock,
            title: 'Size L',
            size: 'l',
            items: [
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/iso.svg',
                    text: 'Information Security Management',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/iso.svg',
                    text: 'Security Controls for Cloud Services',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/iso.svg',
                    text: 'Protection of Personally Identiable Information',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/iso.svg',
                    text: 'Европейский регламент по защите данных',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/iso.svg',
                    text: 'Payment Card Industry Data Security Standard',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/iso.svg',
                    text: 'ГОСТ Р 57580',
                    url: '#',
                },
                {
                    src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
                    text: '№ 152-ФЗ «О персональных данных»',
                    url: '#',
                },
            ],
        },
    ],
};
