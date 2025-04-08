import {Meta, StoryFn} from '@storybook/react';

import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';
import {FoldableListBlockModel, FoldableListProps} from '../../../models';
import FoldableListBlock from '../FoldableList';

import data from './data.json';

export default {
    title: 'Blocks/FoldableList',
    component: FoldableListBlock,
} as Meta;

const DefaultTemplate: StoryFn<FoldableListBlockModel> = (args) => (
    <div style={{padding: '64px 0px'}}>
        <PageConstructor content={{blocks: [args]}} />
    </div>
);
export const Default = DefaultTemplate.bind({});
export const TextWithListDash = DefaultTemplate.bind({});
export const TextWithListBullet = DefaultTemplate.bind({});
export const WithContentList = DefaultTemplate.bind({});

Default.args = data.default.content as FoldableListProps;
WithContentList.args = {...data.default.content, list: data.common.list} as FoldableListProps;
TextWithListDash.args = data.textWithListDash.content as FoldableListProps;
TextWithListBullet.args = data.textWithListBullet.content as FoldableListProps;
