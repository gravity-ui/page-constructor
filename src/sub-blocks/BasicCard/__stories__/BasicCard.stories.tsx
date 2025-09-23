import {Meta, StoryFn} from '@storybook/react';

import {blockListTransform, blockTransform} from '../../../../.storybook/utils';
import CardLayout from '../../../blocks/CardLayout/CardLayout';
import {BlockBase} from '../../../components';
import {ConstructorRow} from '../../../containers/PageConstructor/components/ConstructorRow';
import {Grid} from '../../../grid';
import {BasicCardModel, BasicCardProps, CardLayoutBlockModel} from '../../../models';
import {IconPosition} from '../../../models/constructor-items/sub-blocks';
import BasicCard from '../BasicCard';

import data from './data.json';

const getCardWithBorderTitle = (border: string) =>
    data.withBorder.title.replace('{{border}}', border);

const getCardWithIconTitle = (border: string) =>
    data.withIcon.title.replace('{{position}}', border);

export default {
    component: BasicCard,
    title: 'Components/Cards/BasicCard',
} as Meta;

const DefaultTemplate: StoryFn<BasicCardModel> = (args) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {type, ...props} = blockTransform(args);
    return (
        <div style={{maxWidth: '400px'}}>
            <BasicCard {...(props as BasicCardProps)} target="_blank" />
        </div>
    );
};

const ListTemplate: StoryFn<Record<number, BasicCardModel>> = (args) => {
    const items = blockListTransform(Object.values(args)) as BasicCardModel[];
    return (
        <div style={{display: 'flex'}}>
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {items.map(({type, ...itemArgs}, index) => (
                <div key={index} style={{maxWidth: '400px', padding: '0 8px'}}>
                    <BasicCard {...itemArgs} />
                </div>
            ))}
        </div>
    );
};

const WithContentListTemplate: StoryFn<Record<number, BasicCardModel>> = (args) => {
    const items = blockListTransform(Object.values(args)) as BasicCardModel[];
    return (
        <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start'}}>
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {items.map(({type, ...itemArgs}, index) => (
                <div
                    key={index}
                    style={{
                        maxWidth: '400px',
                        padding: '0 8px',
                        marginBottom: '24px',
                        marginTop: '8px',
                    }}
                >
                    <BasicCard {...itemArgs} />
                </div>
            ))}
        </div>
    );
};

const VariousTemplate: StoryFn<Record<number, BasicCardModel>> = (args) => (
    <div style={{display: 'flex', padding: '40px 0', flexWrap: 'wrap'}}>
        {Object.values(args).map((arg, index) => (
            <div
                key={index}
                style={{
                    display: 'inline-table',
                    minWidth: '300px',
                    padding: '8px',
                    width: '33%',
                    flexGrow: 1,
                }}
            >
                <BasicCard {...(blockTransform(arg) as BasicCardProps)} />
            </div>
        ))}
    </div>
);

interface LayoutItemWithCards extends CardLayoutBlockModel {
    children: BasicCardModel[];
}

const ControlPositionTemplate: StoryFn<Record<number, LayoutItemWithCards>> = (args) => {
    const cardLayouts = Object.values(args);

    return (
        <Grid>
            <ConstructorRow>
                {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                {cardLayouts.map(({type, children, ...cardLayoutProps}, index) => (
                    <BlockBase key={index}>
                        <CardLayout {...cardLayoutProps}>
                            {children.map((itemArgs, itemIndex) => (
                                <BasicCard
                                    key={itemIndex}
                                    {...(blockTransform(itemArgs) as BasicCardProps)}
                                />
                            ))}
                        </CardLayout>
                    </BlockBase>
                ))}
            </ConstructorRow>
        </Grid>
    );
};

export const Default = DefaultTemplate.bind({});
export const WithIcon = ListTemplate.bind({});
export const WithBorder = ListTemplate.bind({});
export const WithUrl = ListTemplate.bind({});
export const WithContentList = WithContentListTemplate.bind({});
export const ControlPosition = ControlPositionTemplate.bind({});
export const Sizes = VariousTemplate.bind([]);
export const GravityIcons = VariousTemplate.bind([]);

const DefaultArgs = data.default as BasicCardModel;

Default.args = DefaultArgs;

WithIcon.args = [
    {
        ...DefaultArgs,
        icon: data.withIcon.icons[0],
        title: getCardWithIconTitle('top'),
    },
    {
        ...DefaultArgs,
        icon: data.withIcon.icons[1],
        iconPosition: IconPosition.Left,
        title: getCardWithIconTitle('left'),
    },
];
WithIcon.parameters = {
    controls: {
        include: Object.keys(WithIcon.args),
    },
};

WithBorder.args = [
    {
        ...DefaultArgs,
        title: getCardWithBorderTitle('shadow'),
    },
    {
        ...DefaultArgs,
        border: 'line',
        title: getCardWithBorderTitle('line'),
    },
    {
        ...DefaultArgs,
        border: 'none',
        title: getCardWithBorderTitle('none'),
    },
];
WithBorder.parameters = {
    controls: {
        include: Object.keys(WithBorder.args),
    },
};

WithUrl.args = [
    {
        ...DefaultArgs,
        url: data.url,
        title: getCardWithBorderTitle('shadow'),
    },
    {
        ...DefaultArgs,
        border: 'line',
        title: getCardWithBorderTitle('line'),
        url: data.url,
    },
    {
        ...DefaultArgs,
        border: 'none',
        title: getCardWithBorderTitle('none'),
        url: data.url,
    },
];
WithUrl.parameters = {
    controls: {
        include: Object.keys(WithUrl.args),
    },
};

WithContentList.args = [
    {
        ...DefaultArgs,
        ...data.withContentList,
    },
    {
        ...DefaultArgs,
        ...data.withContentListShort,
    },
];
WithContentList.parameters = {
    controls: {
        include: Object.keys(WithContentList.args),
    },
};

ControlPosition.args = data.cardLayout as LayoutItemWithCards[];
ControlPosition.parameters = {
    controls: {
        include: Object.keys(ControlPosition.args),
    },
};

Sizes.args = data.sizesContent.reduce(
    (acc, sizeContent) => [
        ...acc,
        ...data.sizes.map(
            (size) =>
                ({
                    ...size,
                    ...sizeContent,
                }) as unknown as BasicCardModel,
        ),
    ],
    [] as BasicCardModel[],
);
Sizes.parameters = {
    controls: {
        include: Object.keys(Sizes.args),
    },
};

GravityIcons.args = data.gravityIcons.reduce(
    (acc, sizeContent) => [
        ...acc,
        ...data.sizes.map(
            (size) =>
                ({
                    ...size,
                    ...sizeContent,
                }) as unknown as BasicCardModel,
        ),
    ],
    [] as BasicCardModel[],
);
GravityIcons.parameters = {
    controls: {
        include: Object.keys(GravityIcons.args),
    },
};
