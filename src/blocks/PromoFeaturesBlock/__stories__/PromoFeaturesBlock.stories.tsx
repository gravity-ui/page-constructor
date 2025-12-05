import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {PromoFeaturesBlockModel, PromoFeaturesProps} from '../../../models';
import PromoFeaturesBlock from '../PromoFeaturesBlock';

import data from './data.json';

export default {
    title: 'Blocks/PromoFeaturesBlock',
    component: PromoFeaturesBlock,
    args: {
        theme: 'default',
    },
} as Meta;

const DefaultTemplate: StoryFn<PromoFeaturesBlockModel> = (args) => {
    const transformedArgs = blockTransform(args) as PromoFeaturesProps;
    return (
        <div style={{padding: '64px'}}>
            <PromoFeaturesBlock {...transformedArgs} />
        </div>
    );
};

export const DefaultTheme = DefaultTemplate.bind({});
export const GreyTheme = DefaultTemplate.bind({});

const DefaultArgs = data.common;

DefaultTheme.args = {
    ...DefaultArgs,
    ...data.defaultTheme.content,
} as PromoFeaturesProps;
GreyTheme.args = {
    ...DefaultArgs,
    ...data.greyTheme.content,
} as PromoFeaturesProps;
