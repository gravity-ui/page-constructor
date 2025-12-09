import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';
import {InfoBlockModel} from '../../../models';
import Info from '../Info';

import data from './data.json';

export default {
    title: 'Blocks/Info',
    component: Info,
} as Meta;

const DefaultTemplate: StoryFn<InfoBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [blockTransform(args)],
        }}
    />
);

export const Default = DefaultTemplate.bind({});
export const WithContentList = DefaultTemplate.bind({});
export const LightTheme = DefaultTemplate.bind({});

Default.args = {
    ...data.dark.content,
    leftContent: {
        ...data.dark.content.leftContent,
        title: data.common.title,
        text: data.common.text,
    },
    rightContent: {
        title: data.common.title,
        links: data.common.links,
        text: data.common.text,
    },
} as InfoBlockModel;
Default.parameters = {
    controls: {
        include: Object.keys(Default.args),
    },
};

LightTheme.args = {
    ...data.light.content,
    leftContent: {
        ...data.light.content.leftContent,
        title: data.common.title,
        text: data.common.text,
    },
    rightContent: {
        title: data.common.title,
        links: data.common.links,
        text: data.common.text,
    },
} as InfoBlockModel;
LightTheme.parameters = {
    controls: {
        include: Object.keys(LightTheme.args),
    },
};

WithContentList.args = {
    ...data.light.content,
    leftContent: {
        ...data.dark.content.leftContent,
        title: data.common.title,
        text: data.common.text,
        list: data.common.list,
    },
    rightContent: {
        title: data.common.title,
        links: data.common.links,
        text: data.common.text,
        list: data.common.list,
    },
} as InfoBlockModel;
WithContentList.parameters = {
    controls: {
        include: Object.keys(WithContentList.args),
    },
};
