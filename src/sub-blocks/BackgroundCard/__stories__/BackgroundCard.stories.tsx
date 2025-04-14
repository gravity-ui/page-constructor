import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
import CardLayout from '../../../blocks/CardLayout/CardLayout';
import {BlockBase} from '../../../components';
import {ConstructorRow} from '../../../containers/PageConstructor/components/ConstructorRow';
import {Grid} from '../../../grid';
import {BackgroundCardProps, ButtonProps, ContentItemProps, LinkProps} from '../../../models';
import BackgroundCard from '../BackgroundCard';

import data from './data.json';

interface BackgroundCardStoryProps {
    items: BackgroundCardProps[];
}

const transformContentList = (list: ContentItemProps[]) =>
    list.map((item) => {
        return {
            ...item,
            text: item?.text && yfmTransform(item.text),
        };
    }) as ContentItemProps[];

const getPaddingBottomTitle = (padding: string) =>
    data.paddings.title.replace('{{padding}}', padding);

const getStoryArgs = (
    count: number,
    args: BackgroundCardProps,
    getExtra: (index: number) => Partial<BackgroundCardProps>,
): BackgroundCardStoryProps => ({
    items: new Array(count).fill(null).map((_, index) => ({...args, ...getExtra(index)})),
});

const getDefaultExtraArgs: Parameters<typeof getStoryArgs>[2] = (index) => {
    switch (index) {
        case 0:
            return {additionalInfo: yfmTransform(data.common.additionalInfo)};
        case 1:
            return {links: data.common.links as LinkProps[]};
        case 2:
            return {buttons: data.common.buttons as ButtonProps[]};
        case 3:
        default:
            return {list: transformContentList(data.common.list)};
    }
};

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

const DefaultTemplate: StoryFn<BackgroundCardStoryProps & BackgroundCardProps> = ({
    items,
    ...props
}) => (
    <div style={{display: 'flex'}}>
        {items.map((item, index) => (
            <div key={index} style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
                <BackgroundCard {...item} {...props} />
            </div>
        ))}
    </div>
);

const CardThemesTemplate: StoryFn<BackgroundCardStoryProps> = (args) => (
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
export const Paddings = DefaultTemplate.bind({});
export const CardThemes = CardThemesTemplate.bind([]);
export const BorderLine = DefaultTemplate.bind({});
export const BackgroundColor = DefaultTemplate.bind({});
export const WithUrl = DefaultTemplate.bind({});
export const ControlPosition = ControlPositionTemplate.bind({});

const DefaultArgs = {
    title: data.common.title,
    text: yfmTransform(data.common.text),
};

Default.args = getStoryArgs(4, DefaultArgs, getDefaultExtraArgs);

WithBackgroundImage.args = getStoryArgs(
    4,
    {
        ...DefaultArgs,
        ...data.withBackgroundImage.content,
    },
    getDefaultExtraArgs,
);

Paddings.args = getStoryArgs(
    4,
    {
        ...DefaultArgs,
        ...data.withBackgroundImage.content,
    },
    (index) => {
        switch (index) {
            case 0:
                return {title: getPaddingBottomTitle('S'), paddingBottom: 's'};
            case 1:
                return {title: getPaddingBottomTitle('M'), paddingBottom: 'm'};
            case 2:
                return {title: getPaddingBottomTitle('L'), paddingBottom: 'l'};
            case 3:
            default:
                return {title: getPaddingBottomTitle('XL'), paddingBottom: 'xl'};
        }
    },
);

CardThemes.args = {
    items: [...data.cardThemes.content].map((item) => ({
        ...DefaultArgs,
        ...item,
    })) as BackgroundCardProps[],
};

BorderLine.args = getStoryArgs(
    4,
    {
        ...DefaultArgs,
        ...data.borderLine.content,
        ...data.withBackgroundImage.content,
    } as BackgroundCardProps,
    getDefaultExtraArgs,
);

BackgroundColor.args = getStoryArgs(
    3,
    {
        ...DefaultArgs,
        ...data.backgroundColor.content,
    } as BackgroundCardProps,
    (index) => {
        switch (index) {
            case 0:
                return {additionalInfo: yfmTransform(data.common.additionalInfo)};
            case 1:
                return {links: data.common.links as LinkProps[]};
            case 2:
            default:
                return {buttons: data.cardThemes.content[1].buttons as ButtonProps[]};
        }
    },
);

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
