import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {ExtendedFeaturesBlockModel, ExtendedFeaturesProps} from '../../../models';
import ExtendedFeatures, {ExtendedFeaturesBlock} from '../ExtendedFeatures';

import data from './data.json';

export default {
    component: ExtendedFeatures,
    title: 'Blocks/ExtendedFeatures',
} as Meta;

const DefaultTemplate: StoryFn<ExtendedFeaturesBlockModel> = (args) => {
    const transformed = blockTransform(args) as ExtendedFeaturesProps;
    return (
        <div style={{padding: '64px'}}>
            <ExtendedFeaturesBlock {...transformed} />
        </div>
    );
};

const ColSizesTemplate: StoryFn<Record<number, ExtendedFeaturesBlockModel>> = (args) => (
    <div style={{padding: '64px', display: 'flex', flexDirection: 'column', gap: 20}}>
        {Object.values(args).map((itemArgs, index) => {
            const transformed = blockTransform(itemArgs) as ExtendedFeaturesProps;
            return <ExtendedFeaturesBlock key={index} {...transformed} />;
        })}
    </div>
);

export const Default = DefaultTemplate.bind({});
export const WithLabel = DefaultTemplate.bind({});
export const ColSizes = ColSizesTemplate.bind({});

const DEFAULT_BLOCK = data.default.content as unknown as ExtendedFeaturesBlockModel;

const WITH_LABEL_BLOCK = {
    ...data.default.content,
    items: data.withLabel?.content?.items,
} as unknown as ExtendedFeaturesBlockModel;

const COL_SIZES: Record<number, ExtendedFeaturesBlockModel> = {
    0: {
        ...data.default.content,
        ...data.colSizes?.four,
    } as unknown as ExtendedFeaturesBlockModel,
    1: {
        ...data.default.content,
        ...data.colSizes?.three,
    } as unknown as ExtendedFeaturesBlockModel,
    2: {
        ...data.default.content,
        ...data.colSizes?.two,
    } as unknown as ExtendedFeaturesBlockModel,
};

Default.args = DEFAULT_BLOCK;
WithLabel.args = WITH_LABEL_BLOCK;
ColSizes.args = COL_SIZES;

ColSizes.parameters = {
    controls: {
        include: Object.keys(COL_SIZES),
    },
};
