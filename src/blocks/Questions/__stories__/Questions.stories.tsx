import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {QuestionsBlockModel, QuestionsProps} from '../../../models';
import QuestionsBlock from '../Questions';

import data from './data.json';

export default {
    title: 'Blocks/Questions',
    component: QuestionsBlock,
} as Meta;

const DefaultTemplate: StoryFn<QuestionsBlockModel> = (args) => {
    const transformedArgs = blockTransform(args) as QuestionsProps;
    return (
        <div style={{padding: '64px'}}>
            <QuestionsBlock {...transformedArgs} />
        </div>
    );
};

export const Default = DefaultTemplate.bind({});
export const TextWithListDash = DefaultTemplate.bind({});
export const TextWithListBullet = DefaultTemplate.bind({});
export const WithContentList = DefaultTemplate.bind({});

Default.args = data.default.content as QuestionsProps;
WithContentList.args = {...data.default.content, list: data.common.list} as QuestionsProps;
TextWithListDash.args = data.textWithListDash.content as QuestionsProps;
TextWithListBullet.args = data.textWithListBullet.content as QuestionsProps;
