import {Meta, StoryFn} from '@storybook/react';

import {blockListTransform, blockTransform} from '../../../../.storybook/utils';
import CardLayout from '../../../blocks/CardLayout/CardLayout';
import {BlockBase} from '../../../components';
import {ConstructorRow} from '../../../containers/PageConstructor/components/ConstructorRow';
import {Grid} from '../../../grid';
import {PriceCardModel, PriceCardProps} from '../../../models';
import PriceCard from '../PriceCard';

import data from './data.json';

export default {
    component: PriceCard,
    title: 'Components/Cards/PriceCard',
    argTypes: {
        backgroundColor: {
            control: {type: 'color'},
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<PriceCardModel> = (args) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {type, ...priceCardProps} = blockTransform(args);
    return (
        <div style={{width: 400, margin: 20}}>
            <PriceCard {...(priceCardProps as PriceCardProps)} />
        </div>
    );
};

const DifferentContentTemplate: StoryFn<Record<number, PriceCardModel>> = (args) => {
    const items = blockListTransform(Object.values(args)) as PriceCardModel[];
    return (
        <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
            {items.map((itemArgs, index) => (
                <div key={index} style={{display: 'inline-table', width: 400, margin: 20}}>
                    <PriceCard {...itemArgs} />
                </div>
            ))}
        </div>
    );
};

const MultipleItemsTemplate: StoryFn<Record<number, PriceCardModel>> = (args) => {
    const items = blockListTransform(Object.values(args)) as PriceCardModel[];
    return (
        <Grid>
            <ConstructorRow>
                <BlockBase>
                    <CardLayout animated={false}>
                        {items.map((itemArgs, index) => (
                            <PriceCard key={index} {...itemArgs} />
                        ))}
                    </CardLayout>
                </BlockBase>
            </ConstructorRow>
        </Grid>
    );
};

export const Default = DefaultTemplate.bind({});
export const Link = DefaultTemplate.bind({});
export const DifferentContent = DifferentContentTemplate.bind({});
export const Themed = MultipleItemsTemplate.bind({});

Default.args = data.default as PriceCardModel;

Link.args = data.link as PriceCardModel;

DifferentContent.args = [
    data.default,
    {...data.link, description: undefined, priceDetails: undefined},
    data.minimal,
] as PriceCardModel[];
DifferentContent.parameters = {
    controls: {
        include: Object.keys(DifferentContent.args),
    },
};

Themed.args = [
    {...data.default, title: 'Default theme'},
    data.light,
    data.dark,
] as PriceCardModel[];
Themed.parameters = {
    controls: {
        include: Object.keys(DifferentContent.args),
    },
};
