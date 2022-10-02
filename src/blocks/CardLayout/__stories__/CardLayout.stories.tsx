import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';

import CardLayout from '../CardLayout';
import {CardLayoutBlockModel} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

import data from './data.json';

const getPaddingsStoryName = (size: string) => {
    return data.cardsPaddings.storyName.replace('{{size}}', size);
};

export default {
    title: 'Blocks/CardLayout',
    component: CardLayout,
} as Meta;

const DefaultTemplate: Story<CardLayoutBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const PaddingsTemplate: Story<CardLayoutBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    title: getPaddingsStoryName('s'),
                    children: args.children?.map((child) => ({...child, paddingBottom: 's'})),
                },
                {
                    ...args,
                    title: getPaddingsStoryName('m'),
                    children: args.children?.map((child) => ({...child, paddingBottom: 'm'})),
                },
                {
                    ...args,
                    title: getPaddingsStoryName('l'),
                    children: args.children?.map((child) => ({...child, paddingBottom: 'l'})),
                },
                {
                    ...args,
                    title: getPaddingsStoryName('xl'),
                    children: args.children?.map((child) => ({...child, paddingBottom: 'xl'})),
                },
            ],
        }}
    />
);

export const CardsWithImage = DefaultTemplate.bind([]);
export const CardsWithImageFullScreen = DefaultTemplate.bind([]);
export const CardsWithImageAllProps = DefaultTemplate.bind([]);
export const BackgroundCardsPaddings = PaddingsTemplate.bind([]);
export const BackgroundCardsBackgroundColor = DefaultTemplate.bind([]);
export const BackgroundCardsContentSizes = DefaultTemplate.bind([]);
export const BackgroundCardsThemes = DefaultTemplate.bind([]);

CardsWithImage.args = data.cardsWithImage.content;
CardsWithImage.storyName = data.cardsWithImage.storyName;

CardsWithImageFullScreen.args = data.cardsWithImageFullScreen.content;
CardsWithImageFullScreen.storyName = data.cardsWithImageFullScreen.storyName;

CardsWithImageAllProps.args = data.cardsWithImageAllProps.content;
CardsWithImageAllProps.storyName = data.cardsWithImageAllProps.storyName;

BackgroundCardsPaddings.args = data.cardsPaddings.content;

BackgroundCardsBackgroundColor.args = data.cardsBackgroundColor.content;
BackgroundCardsBackgroundColor.storyName = data.cardsBackgroundColor.storyName;

BackgroundCardsContentSizes.args = data.cardsContentSizes.content;
BackgroundCardsContentSizes.storyName = data.cardsContentSizes.storyName;

BackgroundCardsThemes.args = data.backgroundCardThemes.content;
BackgroundCardsThemes.storyName = data.backgroundCardThemes.storyName;
