import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {FoldableListBlockModel, FoldableListProps} from '../../../models';
import FoldableListBlock from '../FoldableList';

import data from './data.json';

export default {
    title: 'Blocks/FoldableList',
    component: FoldableListBlock,
} as Meta;

const DefaultTemplate: StoryFn<FoldableListBlockModel> = (args) => {
    const transformedArgs = blockTransform(args) as FoldableListProps;
    return (
        <div style={{padding: '64px 64px'}}>
            <FoldableListBlock {...transformedArgs} />
        </div>
    );
};

export const Default = DefaultTemplate.bind({});
export const TextWithListDash = DefaultTemplate.bind({});
export const TextWithListBullet = DefaultTemplate.bind({});
export const WithContentList = DefaultTemplate.bind({});

Default.args = data.default as FoldableListBlockModel;
WithContentList.args = {...data.default, list: data.common.list} as FoldableListBlockModel;
TextWithListDash.args = data.textWithListDash as FoldableListBlockModel;
TextWithListBullet.args = data.textWithListBullet as FoldableListBlockModel;
