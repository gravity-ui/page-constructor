import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
import CardLayout from '../../../blocks/CardLayout/CardLayout';
import {BlockBase} from '../../../components';
import {ConstructorRow} from '../../../containers/PageConstructor/components/ConstructorRow';
import {Grid} from '../../../grid';
import {BackgroundCardProps, ButtonProps, ContentItemProps, LinkProps} from '../../../models';
import BackgroundCard from '../BackgroundCard';

import data from './data.json';

const transformContentList = (list: ContentItemProps[]) =>
    list.map((item) => {
        return {
            ...item,
            text: item?.text && yfmTransform(item.text),
        };
    }) as ContentItemProps[];

const getPaddingBottomTitle = (padding: string) =>
    data.paddings.title.replace('{{padding}}', padding);

export default {
    component: BackgroundCard,
    title: 'Components/Cards/BackgroundCard',
    argTypes: {
        backgroundColor: {
            control: {type: 'color'},
        },
        paddingBottom: {
            control: {type: 'radio', labels: {undefined: 'default'}},
            options: [undefined, 's', 'm', 'l', 'xl'],
        },
        theme: {
            control: {type: 'radio', labels: {undefined: 'default'}},
            options: [undefined, 'dark', 'light'],
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<BackgroundCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} additionalInfo={yfmTransform(data.common.additionalInfo)} />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} links={data.common.links as LinkProps[]} />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} buttons={data.common.buttons as ButtonProps[]} />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} list={transformContentList(data.common.list)} />
        </div>
    </div>
);

const PaddingsTemplate: StoryFn<BackgroundCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title={getPaddingBottomTitle('S')} paddingBottom="s" />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title={getPaddingBottomTitle('M')} paddingBottom="m" />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title={getPaddingBottomTitle('L')} paddingBottom="l" />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} title={getPaddingBottomTitle('XL')} paddingBottom="xl" />
        </div>
    </div>
);

const CardThemesTemplate: StoryFn<{items: BackgroundCardProps[]}> = (args) => (
    <div style={{display: 'flex'}}>
        {args.items.map((item, i) => (
            <div style={{maxWidth: '400px', padding: '0 8px'}} key={i}>
                <BackgroundCard
                    {...item}
                    list={transformContentList(
                        item.theme === 'dark'
                            ? data.common.themed.darkList
                            : data.common.themed.lightList,
                    )}
                />
            </div>
        ))}
    </div>
);

const BackgroundColorTemplate: StoryFn<BackgroundCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} additionalInfo={yfmTransform(data.common.additionalInfo)} />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard {...args} links={data.common.links as LinkProps[]} />
        </div>
        <div style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
            <BackgroundCard
                {...args}
                buttons={data.cardThemes.content[1].buttons as ButtonProps[]}
            />
        </div>
    </div>
);

const WithUrlTemplate: StoryFn<{items: BackgroundCardProps[]}> = (args) => (
    <div style={{display: 'flex'}}>
        {args.items.map((item, i) => (
            <div style={{maxWidth: '400px', padding: '0 8px'}} key={i}>
                <BackgroundCard {...item} />
            </div>
        ))}
    </div>
);

const ControlPositionTemplate: StoryFn<BackgroundCardProps> = (args) => (
    <Grid>
        <ConstructorRow>
            <BlockBase>
                <CardLayout title={data.cardLayout.contentTitle} animated={false}>
                    {data.cardLayout.items.map((item, index) => (
                        <BackgroundCard
                            key={index}
                            {...(item as Partial<BackgroundCardProps>)}
                            {...args}
                            controlPosition="content"
                        />
                    ))}
                </CardLayout>
            </BlockBase>
            <BlockBase>
                <CardLayout
                    title={data.cardLayout.footerTitle}
                    description={data.cardLayout.footerDescription}
                    animated={false}
                >
                    {data.cardLayout.items.map((item, index) => (
                        <BackgroundCard
                            key={index}
                            {...(item as Partial<BackgroundCardProps>)}
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
export const WithBackgroundImage = DefaultTemplate.bind({});
export const Paddings = PaddingsTemplate.bind({});
export const CardThemes = CardThemesTemplate.bind([]);
export const BorderLine = DefaultTemplate.bind({});
export const BackgroundColor = BackgroundColorTemplate.bind({});
export const WithUrl = WithUrlTemplate.bind({});
export const ControlPosition = ControlPositionTemplate.bind({});

const DefaultArgs = {
    title: data.common.title,
    text: yfmTransform(data.common.text),
};

Default.args = {
    ...DefaultArgs,
} as BackgroundCardProps;

WithBackgroundImage.args = {
    ...DefaultArgs,
    ...data.withBackgroundImage.content,
} as BackgroundCardProps;

Paddings.args = {
    ...DefaultArgs,
    ...data.withBackgroundImage.content,
} as BackgroundCardProps;

CardThemes.args = {
    items: [...data.cardThemes.content].map((item) => ({
        ...DefaultArgs,
        ...item,
    })) as BackgroundCardProps[],
};

BorderLine.args = {
    ...DefaultArgs,
    ...data.borderLine.content,
    ...data.withBackgroundImage.content,
} as BackgroundCardProps;

BackgroundColor.args = {
    ...DefaultArgs,
    ...data.backgroundColor.content,
} as BackgroundCardProps;

WithUrl.args = {
    items: [
        data.cardThemes.content[1],
        data.withBackgroundImage.content,
        data.borderLine.content,
        data.backgroundColor.content,
        data.borderNone.content,
    ].map((item) => ({
        ...DefaultArgs,
        ...item,
        url: data.url,
        urlTitle: data.urlTitle,
    })) as BackgroundCardProps[],
};

ControlPosition.argTypes = {
    controlPosition: {table: {disable: true}},
    url: {table: {disable: true}},
    urlTitle: {table: {disable: true}},
    analyticsEvents: {table: {disable: true}},
    title: {table: {disable: true}},
    text: {table: {disable: true}},
    titleId: {table: {disable: true}},
    textId: {table: {disable: true}},
    list: {table: {disable: true}},
    links: {table: {disable: true}},
    buttons: {table: {disable: true}},
};
