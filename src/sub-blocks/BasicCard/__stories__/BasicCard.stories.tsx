import {Meta, StoryFn} from '@storybook/react';

import {blockListTransform, blockTransform} from '../../../../.storybook/utils';
import CardLayout from '../../../blocks/CardLayout/CardLayout';
import {BlockBase} from '../../../components';
import {ConstructorRow} from '../../../containers/PageConstructor/components/ConstructorRow';
import {Grid} from '../../../grid';
import {BasicCardModel, BasicCardProps, CardLayoutBlockModel} from '../../../models';
import {IconPosition} from '../../../models/constructor-items/sub-blocks';
import {block} from '../../../utils/cn';
import BasicCard from '../BasicCard';

import data from './data.json';

import './colors.scss';

const colors = block('basic-card-colors-story');

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
export const HoverEffects = ListTemplate.bind({});

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

HoverEffects.args = data.hoverEffects as BasicCardModel[];
HoverEffects.parameters = {
    controls: {
        include: Object.keys(HoverEffects.args),
    },
};

// CSS variables belong to the site/section wrapper, not the card's JSON model.
export const ColorTokens: StoryFn = () => {
    const rows = [
        {title: 'Default colors', text: 'No hover.', custom: false, interactive: false},
        {
            title: 'Custom background + border',
            text: 'No hover.',
            custom: true,
            interactive: false,
        },
        {title: 'Default colors', text: 'Hover enabled.', custom: false, interactive: true},
        {
            title: 'Custom background + border',
            text: 'Hover enabled.',
            custom: true,
            interactive: true,
        },
    ];

    return (
        <div style={{overflowX: 'auto'}}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(240px, 1fr))',
                    maxWidth: 1200,
                    minWidth: 800,
                    margin: '0 auto',
                    gap: 24,
                    padding: 32,
                    background: 'var(--g-color-base-background)',
                }}
            >
                {(['shadow', 'line', 'none'] as const).map((border) => (
                    <section
                        key={border}
                        aria-label={border}
                        style={{display: 'grid', gap: 24, gridTemplateRows: 'auto repeat(4, 1fr)'}}
                    >
                        <h3 style={{margin: 0}}>{border}</h3>
                        {rows.map(({title, text, custom, interactive}, index) => (
                            <div key={index} className={colors('card', {custom})}>
                                <BasicCard
                                    title={title}
                                    text={text}
                                    border={border}
                                    url={interactive ? '#colors' : ''}
                                />
                            </div>
                        ))}
                    </section>
                ))}
            </div>
        </div>
    );
};

ColorTokens.parameters = {
    docs: {
        description: {
            story: 'Columns: shadow, line, none. Default and custom colors without hover, then with hover. Border colors only affect line cards.',
        },
    },
};

export const ColorTokensOverrides: StoryFn = () => (
    <div className={colors('site')}>
        <h3 className={colors('heading')}>Shared card colors</h3>
        <div className={colors('row')} data-qa="site-colors">
            {(['shadow', 'line'] as const).map((border) => (
                <BasicCard
                    key={border}
                    title={border}
                    text="Colors inherited from the story."
                    border={border}
                    url="#colors"
                />
            ))}
        </div>
        <section className={colors('section')}>
            <h3 className={colors('heading')}>Custom card colors</h3>
            <div className={colors('row')} data-qa="section-colors">
                {(['shadow', 'line'] as const).map((border) => (
                    <BasicCard
                        key={border}
                        title={border}
                        text="All colors overridden in this section."
                        border={border}
                        url="#colors"
                    />
                ))}
            </div>
        </section>
    </div>
);

ColorTokensOverrides.parameters = {
    docs: {
        description: {
            story: 'The story sets all six color variables. The nested section overrides them for its cards. Hover to compare states.',
        },
    },
};
