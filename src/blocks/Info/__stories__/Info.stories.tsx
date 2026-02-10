import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {CustomBlock, InfoBlockModel, InfoBlockProps} from '../../../models';
import Info from '../Info';

import data from './data.json';

export default {
    title: 'Blocks/Info',
    component: Info,
} as Meta;

const DefaultTemplate: StoryFn<InfoBlockProps> = (args) => (
    <Info {...(blockTransform(args as CustomBlock) as InfoBlockProps)} />
);

export const Default = DefaultTemplate.bind({});
export const LightTheme = DefaultTemplate.bind({});
export const WithContentList = DefaultTemplate.bind({});

Default.args = data.default as InfoBlockModel;

LightTheme.args = {
    ...data.default,
    ...data.light,
} as InfoBlockModel;
LightTheme.parameters = {
    controls: {
        include: Object.keys(LightTheme.args),
    },
};

WithContentList.args = {
    type: data.default.type,
    theme: data.light.theme,
    backgroundColor: data.light.backgroundColor,
    leftContent: {
        ...data.default.leftContent,
        list: data.list,
    },
    rightContent: {
        ...data.default.rightContent,
        list: data.list,
    },
} as InfoBlockModel;
WithContentList.parameters = {
    controls: {
        include: Object.keys(WithContentList.args),
    },
};
