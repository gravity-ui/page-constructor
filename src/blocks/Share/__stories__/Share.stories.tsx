import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {PCShareSocialNetwork, ShareBLockModel, ShareBlockProps} from '../../../models';
import Share from '../Share';

import data from './data.json';

export default {
    component: Share,
    title: 'Blocks/Share',
    argTypes: {
        items: {
            control: {type: 'check'},
            options: Object.values(PCShareSocialNetwork),
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<ShareBLockModel> = (args) => (
    <Share {...(blockTransform(args) as ShareBlockProps)} />
);

export const Default = DefaultTemplate.bind({});
export const CustomTitle = DefaultTemplate.bind({});

Default.args = data.default.content as ShareBLockModel;
Default.parameters = {
    controls: {
        include: ['title', 'items'],
    },
};

CustomTitle.args = data.customTitle.content as ShareBLockModel;
CustomTitle.parameters = {
    controls: {
        include: ['title', 'items'],
    },
};
