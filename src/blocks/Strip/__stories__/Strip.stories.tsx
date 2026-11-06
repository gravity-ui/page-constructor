import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {PageConstructor} from '../../../containers/PageConstructor';
import {StripBlockModel} from '../../../models';
import Strip from '../Strip';

import data from './data.json';

export default {
    title: 'Blocks/Strip',
    component: Strip,
    parameters: {
        controls: {
            exclude: ['type'],
        },
    },
    argTypes: {
        color: {
            control: {type: 'radio', labels: {undefined: 'none'}},
            options: [undefined, 'text-color'],
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<StripBlockModel> = (args) => (
    <PageConstructor content={{blocks: [blockTransform(args)]}} />
);

export const Default = DefaultTemplate.bind({});
export const Wrap = DefaultTemplate.bind({});
export const BasicCard = DefaultTemplate.bind({});
export const BackgroundCard = DefaultTemplate.bind({});
export const OneImage = DefaultTemplate.bind({});
export const CustomSizing = DefaultTemplate.bind({});

Default.args = data.default.content as StripBlockModel;
Wrap.args = data.wrap.content as StripBlockModel;
BasicCard.args = data.basicCard.content as StripBlockModel;
BackgroundCard.args = data.backgroundCard.content as StripBlockModel;
OneImage.args = data.oneImage.content as StripBlockModel;
CustomSizing.args = data.customSizing.content as StripBlockModel;
