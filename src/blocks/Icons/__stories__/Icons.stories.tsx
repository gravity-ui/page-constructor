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
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'Telegram',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'Slack',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'GitHub',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'GitHub',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'GitHub',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'GitHub',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'GitHub',
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
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'Telegram',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'Slack',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'GitHub',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'YouTube',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'Stack Overflow',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'Twitter',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'Facebook',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/twitter.svg',
                    text: 'RSS',
                },
            ],
        },
        {
            type: BlockType.IconsBlock,
            title: 'Size L',
            size: 'l',
            items: [
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/iso.svg',
                    text: 'Information Security Management',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/iso.svg',
                    text: 'Security Controls for Cloud Services',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/iso.svg',
                    text: 'Protection of Personally Identiable Information',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/iso.svg',
                    text: 'Европейский регламент по защите данных',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/iso.svg',
                    text: 'Payment Card Industry Data Security Standard',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/iso.svg',
                    text: 'ГОСТ Р 57580',
                },
                {
                    url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
                    text: '№ 152-ФЗ «О персональных данных»',
                },
            ],
        },
    ],
};
