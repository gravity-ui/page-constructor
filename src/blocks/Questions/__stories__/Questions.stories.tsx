import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import QuestionsBlock from '../Questions';
import {QuestionsBlockModel, QuestionsProps} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

import data from './data.json';

export default {
    title: 'Blocks/Questions',
    component: QuestionsBlock,
} as Meta;

const DefaultTemplate: Story<QuestionsBlockModel> = (args) => (
    <div style={{padding: '64px 0px'}}>
        <PageConstructor content={{blocks: [args]}} />
    </div>
);
export const Default = DefaultTemplate.bind({});
export const TextWithListDash = DefaultTemplate.bind({});
export const TextWithListBullet = DefaultTemplate.bind({});

Default.args = data.default.content as QuestionsProps;
TextWithListDash.args = data.textWithListDash.content as QuestionsProps;
TextWithListBullet.args = data.textWithListBullet.content as QuestionsProps;
