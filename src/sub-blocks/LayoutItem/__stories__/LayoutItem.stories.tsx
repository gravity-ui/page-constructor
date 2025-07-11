import {Meta, StoryFn} from '@storybook/react';

import {blockTransform, yfmTransform} from '../../../../.storybook/utils';
import CardLayout from '../../../blocks/CardLayout/CardLayout';
import {BlockBase} from '../../../components';
import {ConstructorRow} from '../../../containers/PageConstructor/components/ConstructorRow';
import {Grid} from '../../../grid';
import {LayoutItemModel, LayoutItemProps} from '../../../models';
import LayoutItem from '../LayoutItem';

import data from './data.json';

export default {
    title: 'Components/Cards/LayoutItem',
    component: LayoutItem,
} as Meta;

const DefaultTemplate: StoryFn<LayoutItemProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <LayoutItem {...args} />
    </div>
);

const WithIconTemplate: StoryFn<LayoutItemProps> = (args) => (
    <div>
        <div style={{marginBottom: '100px'}}>
            <h1>Icon: Top</h1>
            <DefaultTemplate {...args} />
        </div>
        <div>
            <h1>Icon: Left</h1>
            <DefaultTemplate {...args} icon={data.withIcon.iconLeft as LayoutItemProps['icon']} />
        </div>
    </div>
);

const VariousContentTemplate: StoryFn<Record<number, LayoutItemModel>> = (args) => (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {Object.values(args).map((item, index) => (
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
                <LayoutItem {...(blockTransform(item) as LayoutItemProps)} />
            </div>
        ))}
    </div>
);

const ControlPositionTemplate: StoryFn<LayoutItemProps> = (args) => (
    <Grid>
        <ConstructorRow>
            <BlockBase>
                <CardLayout title={data.cardLayout.contentTitle} animated={false}>
                    {data.cardLayout.items.map((item, index) => (
                        <LayoutItem
                            key={index}
                            {...(item as Partial<LayoutItemProps>)}
                            {...args}
                            controlPosition="content"
                        />
                    ))}
                </CardLayout>
            </BlockBase>
            <BlockBase>
                <CardLayout title={data.cardLayout.footerTitle} animated={false}>
                    {data.cardLayout.items.map((item, index) => (
                        <LayoutItem
                            key={index}
                            {...(item as Partial<LayoutItemProps>)}
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
export const WithContentList = DefaultTemplate.bind({});
export const Fullscreen = DefaultTemplate.bind({});
export const MetaInfo = DefaultTemplate.bind({});
export const Youtube = DefaultTemplate.bind({});
export const WithIcon = WithIconTemplate.bind({});
export const ControlPosition = ControlPositionTemplate.bind({});
export const Sizes = VariousContentTemplate.bind([]);

const DefaultArgs = {
    ...data.default.content,
    content: {
        ...data.default.content.content,
        text: yfmTransform(data.default.content.content.text),
    },
};

Default.args = DefaultArgs as LayoutItemProps;
WithContentList.args = {
    ...DefaultArgs,
    content: {
        ...DefaultArgs.content,
        list: data.withList.content.list.map((listItem) => ({
            ...listItem,
            text: yfmTransform(listItem.text || ''),
        })),
    },
} as LayoutItemProps;
Fullscreen.args = {...DefaultArgs, ...data.fullscreen.content} as LayoutItemProps;
MetaInfo.args = {
    ...DefaultArgs,
    ...data.metaInfo.content,
    metaInfo: data.metaInfo.content.metaInfo.map((item) => yfmTransform(item)),
} as LayoutItemProps;
Youtube.args = {...DefaultArgs, ...data.youtube.content} as LayoutItemProps;
WithIcon.args = {
    ...DefaultArgs,
    media: undefined,
    icon: data.withIcon.iconTop as LayoutItemProps['icon'],
};

ControlPosition.argTypes = {
    content: {table: {disable: true}},
    media: {table: {disable: true}},
    metaInfo: {table: {disable: true}},
    icon: {table: {disable: true}},
    className: {table: {disable: true}},
    controlPosition: {table: {disable: true}},
    analyticsEvents: {table: {disable: true}},
    contentMargin: {table: {disable: true}},
};

Sizes.args = data.sizesContent.reduce(
    (acc, sizeContent) => [
        ...acc,
        ...data.sizes.map(
            (size) =>
                ({
                    ...size,
                    ...sizeContent,
                    content: {...size.content, ...sizeContent.content},
                }) as LayoutItemModel,
        ),
    ],
    [] as LayoutItemModel[],
);
Sizes.parameters = {
    controls: {
        include: Object.keys([0, 1, 2, 3, 4, 5, 6, 7, 8]),
    },
};
