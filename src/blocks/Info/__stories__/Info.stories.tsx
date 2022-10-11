import React from 'react';
import _ from 'lodash';
import {Meta, Story} from '@storybook/react/types-6-0';
import {InfoBlockModel, InfoBlockProps} from '../../../models';
import Info from '../Info';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

import data from './data.json';

export default {
    title: 'Blocks/Info',
    component: Info,
} as Meta;

const DefaultTemplate: Story<InfoBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Light = DefaultTemplate.bind({});
export const Dark = DefaultTemplate.bind({});

Light.args = {
    ...data.light.content,
    rightContent: {...data.light.content.rightContent, ..._.omit(data.common, 'titleWithLink')},
    leftContent: {
        ...data.light.content.leftContent,
        ..._.omit(data.common, 'titleWithLink'),
        title: data.common.titleWithLink,
    },
} as InfoBlockProps;
Dark.args = {
    ...data.dark.content,
    rightContent: {...data.dark.content.rightContent, ..._.omit(data.common, 'titleWithLink')},
    leftContent: {
        ...data.dark.content.leftContent,
        ..._.omit(data.common, 'titleWithLink'),
        title: data.common.titleWithLink,
    },
} as InfoBlockProps;
