import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import QuestionsBlock from '../Questions';
import {BlockType, QuestionsBlockModel} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    title: 'Компоненты/Questions',
    component: QuestionsBlock,
} as Meta;

const DefaultTemplate: Story<QuestionsBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);
export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.QuestionsBlock,
    title: 'Раз два три четыре',
    items: [
        {
            title: 'Раз',
            text: 'Раз раз',
            listStyle: 'dash',
            link: {
                url: '#',
                text: 'Link',
                textSize: 's',
                theme: 'normal',
                arrow: true,
            },
        },
        {
            title: 'Два',
            text: 'Два два',
            listStyle: 'disk',
            link: {
                url: '#',
                text: 'Link',
                textSize: 's',
                theme: 'normal',
                arrow: true,
            },
        },
    ],
};
