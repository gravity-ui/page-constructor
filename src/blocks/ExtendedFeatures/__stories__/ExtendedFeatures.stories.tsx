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

const ColSizesTemplate: StoryFn<Record<string, ExtendedFeaturesBlockModel>> = (args) => (
    <div style={{padding: '64px', display: 'flex', flexDirection: 'column', gap: 20}}>
        {Object.entries(args)
            .map(([key, item]) => {
                const transformed = blockTransform(item) as ExtendedFeaturesProps;
                return <ExtendedFeaturesBlock key={key} {...transformed} />;
            })
            .filter(Boolean)}
    </div>
);

export const Default = DefaultTemplate.bind({});
export const WithLabel = DefaultTemplate.bind({});
export const ColSizes = ColSizesTemplate.bind({});

Default.args = data.default.content as ExtendedFeaturesBlockModel;

WithLabel.args = {
    ...data.default.content,
    items: data.withLabel?.content?.items,
} as ExtendedFeaturesBlockModel;

const COL_SIZES: Record<string, ExtendedFeaturesBlockModel> = {
    four_columns: {
        ...data.default.content,
        ...data.colSizes?.four,
    } as ExtendedFeaturesBlockModel,
    three_columns: {
        ...data.default.content,
        ...data.colSizes?.three,
    } as ExtendedFeaturesBlockModel,
    two_columns: {
        ...data.default.content,
        ...data.colSizes?.two,
    } as ExtendedFeaturesBlockModel,
};

ColSizes.args = COL_SIZES;
ColSizes.parameters = {
    controls: {
        include: Object.keys(COL_SIZES),
    },
};
