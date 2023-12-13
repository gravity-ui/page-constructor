import React, {Fragment} from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {PageConstructor} from '../../../containers/PageConstructor';
import {CardLayoutBlockModel, CardLayoutBlockProps, SubBlockModels} from '../../../models';
import CardLayout from '../CardLayout';

import data from './data.json';

export default {
    title: 'Blocks/CardLayout',
    component: CardLayout,
} as Meta;

const createCardArray: (
    count: number,
    shared: Omit<SubBlockModels, 'type'> & {type: string},
) => SubBlockModels[] = (count, shared) =>
    Array.from({length: count}, () => ({...shared} as SubBlockModels));

const DefaultTemplate: StoryFn<CardLayoutBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const ColSizeTemplate: StoryFn<CardLayoutBlockModel> = (args) => (
    <Fragment>
        <PageConstructor
            content={{
                blocks: [
                    {
                        ...args,
                        description: data.colSizes.four.description,
                        colSizes: data.colSizes.four.colSizes,
                    },
                    {
                        ...args,
                        description: data.colSizes.two.description,
                        colSizes: data.colSizes.two.colSizes,
                        children: createCardArray(8, data.colSizes.two.card) as SubBlockModels[],
                    },
                ],
            }}
        />
    </Fragment>
);

const WithCustomIndentsTemplate: StoryFn<CardLayoutBlockModel> = ({title, ...restArgs}) => (
    <Fragment>
        <PageConstructor
            content={{
                blocks: [
                    {
                        ...restArgs,
                        title: `${title} with zero indents at the top and bottom`,
                        indent: {
                            top: '0',
                            bottom: '0',
                        },
                    },
                    {
                        ...restArgs,
                        title: `${title} with XS indents at the top and bottom`,
                        indent: {
                            top: 'xs',
                            bottom: 'xs',
                        },
                    },
                    {
                        ...restArgs,
                        title: `${title} with S indents at the top and bottom`,
                        indent: {
                            top: 's',
                            bottom: 's',
                        },
                    },
                    {
                        ...restArgs,
                        title: `${title} with M indents at the top and bottom`,
                        indent: {
                            top: 'm',
                            bottom: 'm',
                        },
                    },
                    {
                        ...restArgs,
                        title: `${title} with L (default) indents at the top and bottom`,
                        indent: {
                            top: 'l',
                            bottom: 'l',
                        },
                    },
                    {
                        ...restArgs,
                        title: `${title} with XL indents at the top and bottom`,
                        indent: {
                            top: 'xl',
                            bottom: 'xl',
                        },
                    },
                ],
            }}
        />
    </Fragment>
);

const WithBackgroundTemplate: StoryFn<CardLayoutBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    background: {
                        src: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/content-bg-img_light.png',
                        disableCompress: true,
                    },
                    children: createCardArray(8, data.withBackgroundImage.card),
                },
                {
                    ...args,
                    background: {
                        style: {
                            backgroundColor: '#E5D0FF',
                        },
                    },
                    children: createCardArray(4, data.withBackgroundImage.card),
                },
                {
                    ...args,
                    background: {
                        src: null,
                        desktop:
                            'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/content-bg-img_light.png',
                        mobile: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img_8-12_dark.png',
                    },
                    description:
                        'Three cards in a row on the desktop, two cards in a row on a tablet, one card in a row on a mobile phone. Dark background image on a mobile phone',
                    colSizes: {
                        all: 12,
                        sm: 6,
                        md: 4,
                    },
                    children: createCardArray(3, data.withBackgroundImage.card),
                },
            ],
        }}
    />
);

export const Default = DefaultTemplate.bind({});
export const ColSize = ColSizeTemplate.bind({});
export const WithCustomIndents = WithCustomIndentsTemplate.bind({});
export const WithBackgroundImage = WithBackgroundTemplate.bind({});

Default.args = {
    ...data.default.content,
    children: createCardArray(6, data.default.card),
} as CardLayoutBlockProps;

ColSize.args = {
    ...data.default.content,
    children: createCardArray(8, data.colSizes.four.card),
} as CardLayoutBlockProps;

WithCustomIndents.args = {
    ...data.default.content,
    children: createCardArray(3, data.default.card),
} as CardLayoutBlockProps;

WithBackgroundImage.args = {
    ...data.withBackgroundImage.content,
} as CardLayoutBlockProps;
