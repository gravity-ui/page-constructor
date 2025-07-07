import {Meta, StoryFn} from '@storybook/react';

import {blockTransform, yfmTransform} from '../../../../.storybook/utils';
import CardLayout from '../../../blocks/CardLayout/CardLayout';
import {BlockBase} from '../../../components';
import {ConstructorRow} from '../../../containers/PageConstructor/components/ConstructorRow';
import {Grid} from '../../../grid';
import {BasicCardModel, BasicCardProps, ContentItemProps} from '../../../models';
import {IconPosition} from '../../../models/constructor-items/sub-blocks';
import BasicCard from '../BasicCard';

import data from './data.json';

const transformedContentList = data.list.map((item) => {
    return {
        ...item,
        text: item?.text && yfmTransform(item.text),
    };
}) as ContentItemProps[];

const transformedShortContentList = data.shortList.map((item) => {
    return {
        ...item,
        text: item?.text && yfmTransform(item.text),
    };
}) as ContentItemProps[];

const getCardWithBorderTitle = (border: string) =>
    data.withBorder.title.replace('{{border}}', border);

const getCardWithIconTitle = (border: string) =>
    data.withIcon.title.replace('{{position}}', border);

export default {
    component: BasicCard,
    title: 'Components/Cards/BasicCard',
} as Meta;

const DefaultTemplate: StoryFn<BasicCardProps> = (args) => (
    <div style={{maxWidth: '400px'}}>
        <BasicCard {...args} target="_blank" />
    </div>
);

const WithIconTemplate: StoryFn<BasicCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard
                {...args}
                icon={data.withIcon.icons[0]}
                title={getCardWithIconTitle('top')}
            />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard
                {...args}
                icon={data.withIcon.icons[1]}
                iconPosition={IconPosition.Left}
                title={getCardWithIconTitle('left')}
            />
        </div>
    </div>
);

const WithBorderTemplate: StoryFn<BasicCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} title={getCardWithBorderTitle('shadow')} />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} border="line" title={getCardWithBorderTitle('line')} />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} border="none" title={getCardWithBorderTitle('none')} />
        </div>
    </div>
);

const WithContentListTemplate: StoryFn<BasicCardProps> = (args) => (
    <div>
        <div style={{maxWidth: '400px', padding: '0 8px', marginBottom: '24px', marginTop: '8px'}}>
            <BasicCard
                {...args}
                target="_blank"
                list={transformedContentList}
                title={data.withContentList.titleForLongList}
            />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard
                {...args}
                target="_blank"
                list={transformedShortContentList}
                title={data.withContentList.titleForShortList}
            />
        </div>
    </div>
);

const WithUrlTemplate: StoryFn<BasicCardProps> = (args) => (
    <div style={{display: 'flex', padding: '40px 0'}}>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} title={getCardWithBorderTitle('shadow')} />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} border="line" title={getCardWithBorderTitle('line')} />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} border="none" title={getCardWithBorderTitle('none')} />
        </div>
    </div>
);

const VariousTemplate: StoryFn<Record<number, BasicCardModel>> = (args) => (
    <div style={{display: 'flex', padding: '40px 0', flexWrap: 'wrap'}}>
        {Object.values(args).map((arg, index) => (
            <div
                key={index}
                style={{maxWidth: '33%', padding: '0 8px', flexGrow: 1, marginBottom: '100px'}}
            >
                <BasicCard {...(blockTransform(arg) as BasicCardProps)} />
            </div>
        ))}
    </div>
);

const ControlPositionTemplate: StoryFn<BasicCardProps> = (args) => (
    <Grid>
        <ConstructorRow>
            <BlockBase>
                <CardLayout title={data.cardLayout.contentTitle} animated={false}>
                    {data.cardLayout.items.map((item, index) => (
                        <BasicCard
                            key={index}
                            {...(item as Partial<BasicCardProps>)}
                            {...args}
                            controlPosition="content"
                        />
                    ))}
                </CardLayout>
            </BlockBase>
            <BlockBase>
                <CardLayout title={data.cardLayout.footerTitle} animated={false}>
                    {data.cardLayout.items.map((item, index) => (
                        <BasicCard
                            key={index}
                            {...(item as Partial<BasicCardProps>)}
                            {...args}
                            controlPosition="footer"
                        />
                    ))}
                </CardLayout>
            </BlockBase>
        </ConstructorRow>
    </Grid>
);

export const Default = DefaultTemplate.bind({});
export const WithIcon = WithIconTemplate.bind({});
export const WithBorder = WithBorderTemplate.bind({});
export const WithUrl = WithUrlTemplate.bind({});
export const WithContentList = WithContentListTemplate.bind({});
export const ControlPosition = ControlPositionTemplate.bind({});
export const Sizes = VariousTemplate.bind([]);

const DefaultArgs = {
    ...data.default.content,
    text: yfmTransform(data.default.content.text),
};

Default.args = {
    ...data.default.content,
    ...DefaultArgs,
} as BasicCardProps;
WithIcon.args = DefaultArgs as BasicCardProps;
WithBorder.args = DefaultArgs as BasicCardProps;
WithUrl.args = {
    url: data.url,
    ...DefaultArgs,
} as BasicCardProps;

WithContentList.args = {
    ...DefaultArgs,
} as BasicCardProps;

ControlPosition.argTypes = {
    controlPosition: {table: {disable: true}},
    url: {table: {disable: true}},
    urlTitle: {table: {disable: true}},
    analyticsEvents: {table: {disable: true}},
    title: {table: {disable: true}},
    text: {table: {disable: true}},
    titleId: {table: {disable: true}},
    textId: {table: {disable: true}},
    icon: {table: {disable: true}},
    list: {table: {disable: true}},
    links: {table: {disable: true}},
    buttons: {table: {disable: true}},
    target: {table: {disable: true}},
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
        include: Object.keys([0, 1, 2, 3, 4, 5, 6, 7, 8]),
    },
};
