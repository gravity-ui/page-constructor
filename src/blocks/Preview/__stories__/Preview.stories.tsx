import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import Preview from '../Preview';
import {PreviewBlockModel, PreviewBlockProps} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

import data from './data.json';

export default {
    title: 'Blocks/Preview',
    component: Preview,
    args: {
        stopVideo: false,
    },
    argTypes: {
        title: {control: 'text'},
        description: {control: 'text'},
    },
} as Meta;

const DefaultTemplate: Story<PreviewBlockModel> = (args) => {
    return <PageConstructor content={{blocks: [args]}} />;
};
export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as PreviewBlockProps;
