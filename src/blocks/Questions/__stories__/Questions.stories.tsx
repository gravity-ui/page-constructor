import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import QuestionsBlock from '../Questions';
import {QuestionsProps} from '../../../models';

export default {
    title: 'Компоненты/Questions',
    component: QuestionsBlock,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DefaultTemplate: Story<QuestionsProps> = (args: any) => {
    const props = {
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
    return <QuestionsBlock {...args} {...props} />;
};
export const Default = DefaultTemplate.bind({});
