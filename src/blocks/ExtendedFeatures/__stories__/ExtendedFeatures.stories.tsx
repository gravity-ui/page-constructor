import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {
    ExtendedFeaturesBlockModel,
    ExtendedFeaturesItem,
    ExtendedFeaturesProps,
} from '../../../models';
import ExtendedFeatures, {ExtendedFeaturesBlock} from '../ExtendedFeatures';

import data from './data.json';

export default {
    title: 'Blocks/ExtendedFeatures',
    component: ExtendedFeatures,
    args: {
        colSizes: {
            all: 12,
            sm: 6,
            md: 4,
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<ExtendedFeaturesBlockModel> = (args) => {
    const transformedArgs = blockTransform(args) as ExtendedFeaturesProps;
    return (
        <div style={{padding: '64px'}}>
            <ExtendedFeaturesBlock {...transformedArgs} />
        </div>
    );
};

const ColSizesTemplate: StoryFn<ExtendedFeaturesBlockModel> = (args) => {
    const transformedArgsFour = blockTransform({
        ...args,
        ...data.colSizes.four,
    }) as ExtendedFeaturesProps;

    const transformedArgsThree = blockTransform({
        ...args,
        ...data.colSizes.three,
    }) as ExtendedFeaturesProps;

    const transformedArgsTwo = blockTransform({
        ...args,
        ...data.colSizes.two,
    }) as ExtendedFeaturesProps;

    return (
        <div style={{padding: '64px', display: 'flex', gap: 20, flexDirection: 'column'}}>
            <ExtendedFeaturesBlock {...transformedArgsFour} />
            <ExtendedFeaturesBlock {...transformedArgsThree} />
            <ExtendedFeaturesBlock {...transformedArgsTwo} />
        </div>
    );
};

export const Default = DefaultTemplate.bind({});
export const WithLabel = DefaultTemplate.bind({});
export const ColSizes = ColSizesTemplate.bind({});

const DefaultArgs = {
    ...data.default.content,
    items: data.default.content.items,
};

Default.args = {...DefaultArgs} as ExtendedFeaturesProps;
WithLabel.args = {
    ...DefaultArgs,
    items: data.withLabel.content.items as ExtendedFeaturesItem[],
} as ExtendedFeaturesProps;
ColSizes.args = {
    ...data.default.content,
    items: data.default.content.items as ExtendedFeaturesItem[],
} as ExtendedFeaturesProps;
