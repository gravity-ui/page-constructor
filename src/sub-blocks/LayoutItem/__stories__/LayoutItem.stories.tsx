import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
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

const DefaultTemplate: StoryFn<LayoutItemModel> = (args) => (
    <div style={{maxWidth: '500px', padding: 64}}>
        <LayoutItem {...(blockTransform(args) as LayoutItemProps)} />
    </div>
);

const WithIconTemplate: StoryFn<Record<string, LayoutItemModel>> = (args) => {
    return (
        <div style={{padding: 64}}>
            {Object.entries(args)
                .map(([key, item]) => {
                    if (typeof item !== 'object' || item === null) {
                        return null;
                    }
                    const title = key === 'iconTop' ? 'Icon: Top' : 'Icon: Left';
                    return (
                        <div key={key} style={{marginBottom: '100px'}}>
                            <h1>{title}</h1>
                            <div style={{maxWidth: '500px'}}>
                                <LayoutItem {...(blockTransform(item) as LayoutItemProps)} />
                            </div>
                        </div>
                    );
                })
                .filter(Boolean)}
        </div>
    );
};

const VariousContentTemplate: StoryFn<Record<string, LayoutItemModel>> = (args) => (
    <div style={{display: 'flex', flexWrap: 'wrap', padding: 64}}>
        {Object.entries(args)
            .map(([key, item]) => {
                if (typeof item !== 'object' || item === null) {
                    return null;
                }
                return (
                    <div
                        key={key}
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
                );
            })
            .filter(Boolean)}
    </div>
);

const ControlPositionTemplate: StoryFn<Record<string, LayoutItemModel>> = (args) => {
    const items = Object.entries(args)
        .filter(([_, item]) => typeof item === 'object' && item !== null)
        .map(([_, item]) => item as LayoutItemModel);

    return (
        <Grid>
            <ConstructorRow>
                <BlockBase>
                    <CardLayout title={data.cardLayout.contentTitle} animated={false}>
                        {items.map((item, index) => (
                            <LayoutItem
                                key={index}
                                {...(blockTransform(item) as LayoutItemProps)}
                                controlPosition="content"
                            />
                        ))}
                    </CardLayout>
                </BlockBase>
                <BlockBase>
                    <CardLayout title={data.cardLayout.footerTitle} animated={false}>
                        {items.map((item, index) => (
                            <LayoutItem
                                key={index}
                                {...(blockTransform(item) as LayoutItemProps)}
                                controlPosition="footer"
                            />
                        ))}
                    </CardLayout>
                </BlockBase>
            </ConstructorRow>
        </Grid>
    );
};

export const Default = DefaultTemplate.bind({});
export const WithContentList = DefaultTemplate.bind({});
export const Fullscreen = DefaultTemplate.bind({});
export const MetaInfo = DefaultTemplate.bind({});
export const Youtube = DefaultTemplate.bind({});
export const WithIcon = WithIconTemplate.bind({});
export const ControlPosition = ControlPositionTemplate.bind({});
export const Sizes = VariousContentTemplate.bind({});

Default.args = data.default.content as unknown as LayoutItemModel;

WithContentList.args = {
    ...data.default.content,
    content: {
        ...data.default.content.content,
        list: data.withList.content.list,
    },
} as unknown as LayoutItemModel;

Fullscreen.args = {
    ...data.default.content,
    ...data.fullscreen.content,
} as unknown as LayoutItemModel;

MetaInfo.args = {
    ...data.default.content,
    ...data.metaInfo.content,
} as unknown as LayoutItemModel;

Youtube.args = {
    ...data.default.content,
    ...data.youtube.content,
} as unknown as LayoutItemModel;

const WITH_ICON_ITEMS: Record<string, LayoutItemModel> = {
    iconTop: {
        ...data.default.content,
        media: undefined,
        icon: data.withIcon.iconTop,
    } as unknown as LayoutItemModel,
    iconLeft: {
        ...data.default.content,
        media: undefined,
        icon: data.withIcon.iconLeft,
    } as unknown as LayoutItemModel,
};

WithIcon.args = WITH_ICON_ITEMS;
WithIcon.parameters = {
    controls: {
        include: Object.keys(WITH_ICON_ITEMS),
    },
};

const CONTROL_POSITION_ITEMS: Record<string, LayoutItemModel> = {};
data.cardLayout.items.forEach((item, index) => {
    CONTROL_POSITION_ITEMS[`item_${index}`] = item as unknown as LayoutItemModel;
});

ControlPosition.args = CONTROL_POSITION_ITEMS;
ControlPosition.parameters = {
    controls: {
        include: Object.keys(CONTROL_POSITION_ITEMS),
    },
};

const SIZES_ITEMS: Record<string, LayoutItemModel> = {};
let sizeIndex = 0;

data.sizesContent.forEach((sizeContent) => {
    data.sizes.forEach((size) => {
        const key = `size_${sizeIndex}`;
        SIZES_ITEMS[key] = {
            ...size,
            ...sizeContent,
            content: {
                ...size.content,
                ...sizeContent.content,
            },
        } as unknown as LayoutItemModel;
        sizeIndex++;
    });
});

Sizes.args = SIZES_ITEMS;
Sizes.parameters = {
    controls: {
        include: Object.keys(SIZES_ITEMS),
    },
};
