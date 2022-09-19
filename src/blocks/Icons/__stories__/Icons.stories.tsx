import React, {Fragment} from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import Icons from '../Icons';
import {BlockType, IconsBlockModel} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    title: 'Blocks/Icons',
    component: Icons,
} as Meta;

const DefaultTemplate: Story<IconsBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const SizeTemplate: Story<IconsBlockModel> = (args) => (
    <Fragment>
        <DefaultTemplate title="Size S" {...args} size="s" />
        <DefaultTemplate title="Size M" {...args} size="m" />
        <DefaultTemplate title="Size L" {...args} size="l" />
    </Fragment>
);

export const Default = DefaultTemplate.bind([]);
export const Size = SizeTemplate.bind([]);

Default.args = {
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
};

Size.args = {
    type: BlockType.IconsBlock,
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
        {
            src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/iso.svg',
            text: 'Information Security Management',
            url: '#',
        },
        {
            src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/iso.svg',
            text: 'Европейский регламент по защите данных',
            url: '#',
        },
        {
            src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/iso.svg',
            text: 'ГОСТ Р 57580',
            url: '#',
        },
    ],
};
