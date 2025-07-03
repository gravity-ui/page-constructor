import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import CardLayout, {CardLayoutBlockProps} from '../../../blocks/CardLayout/CardLayout';
import {BlockBase} from '../../../components';
import {ConstructorRow} from '../../../containers/PageConstructor/components/ConstructorRow';
import {Grid} from '../../../grid';
import {BackgroundCardModel, BackgroundCardProps, CardLayoutBlockModel} from '../../../models';
import BackgroundCard from '../BackgroundCard';

import data from './data.json';

export default {
    component: BackgroundCard,
    title: 'Components/Cards/BackgroundCard',
    argTypes: {
        backgroundColor: {
            control: {type: 'color'},
        },
        theme: {
            control: {type: 'radio', labels: {undefined: 'default'}},
            options: [undefined, 'dark', 'light'],
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<BackgroundCardModel> = (args) => (
    <div style={{maxWidth: '400px'}}>
        <BackgroundCard {...(blockTransform(args) as BackgroundCardProps)} />
    </div>
);

const VariousContentTemplate: StoryFn<Record<number, BackgroundCardModel>> = (args) => (
    <div style={{display: 'flex'}}>
        {Object.values(args).map((item, index) => (
            <div key={index} style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
                <BackgroundCard {...(blockTransform(item) as BackgroundCardProps)} />
            </div>
        ))}
    </div>
);

const CardThemesTemplate: StoryFn<Record<number, BackgroundCardModel>> = (args) => (
    <div style={{display: 'flex'}}>
        {Object.values(args).map((item, index) => (
            <div style={{maxWidth: '400px', padding: '0 8px'}} key={index}>
                <BackgroundCard {...(blockTransform(item) as BackgroundCardProps)} />
            </div>
        ))}
    </div>
);

const ControlPositionTemplate: StoryFn<
    Record<number, CardLayoutBlockModel & {children: BackgroundCardModel[]}>
> = (args) => (
    <Grid>
        <ConstructorRow>
            {Object.values(args).map(({children, ...rest}, contentLayoutIndex) => (
                <BlockBase key={contentLayoutIndex}>
                    <CardLayout {...(blockTransform(rest) as CardLayoutBlockProps)}>
                        {children.map((item, index) => (
                            <BackgroundCard
                                key={index}
                                {...(blockTransform(item) as BackgroundCardProps)}
                            />
                        ))}
                    </CardLayout>
                </BlockBase>
            ))}
        </ConstructorRow>
    </Grid>
);

export const Default = DefaultTemplate.bind({});
export const VariousContent = VariousContentTemplate.bind([]);
export const WithBackgroundImage = VariousContentTemplate.bind([]);
export const Paddings = VariousContentTemplate.bind([]);
export const CardThemes = CardThemesTemplate.bind([]);
export const BorderLine = VariousContentTemplate.bind([]);
export const BackgroundColor = VariousContentTemplate.bind([]);
export const WithUrl = CardThemesTemplate.bind([]);
export const ControlPosition = ControlPositionTemplate.bind([]);

Default.args = data.default as BackgroundCardProps;

VariousContent.args = data.props as BackgroundCardModel[];
VariousContent.parameters = {
    controls: {
        include: Object.keys(data.props),
    },
};

WithBackgroundImage.args = data.props.map((item) => ({
    ...item,
    ...data.withBackgroundImage,
})) as BackgroundCardModel[];
WithBackgroundImage.parameters = {
    controls: {
        include: Object.keys(data.props),
    },
};

Paddings.args = data.withPaddings.map((item) => ({
    ...item,
    ...data.withBackgroundImage,
})) as BackgroundCardModel[];
Paddings.parameters = {
    controls: {
        include: Object.keys(data.withPaddings),
    },
};

CardThemes.args = data.cardThemes as BackgroundCardModel[];
CardThemes.parameters = {
    controls: {
        include: Object.keys(data.cardThemes),
    },
};

BorderLine.args = data.props.map((item) => ({
    ...item,
    ...data.withBackgroundImage,
    ...data.borderLine,
})) as BackgroundCardModel[];
BorderLine.parameters = {
    controls: {
        include: Object.keys(data.props),
    },
};

BackgroundColor.args = data.backgroundColor as BackgroundCardModel[];
BackgroundColor.parameters = {
    controls: {
        include: Object.keys(data.backgroundColor),
    },
};

WithUrl.args = data.withUrl as BackgroundCardModel[];
WithUrl.parameters = {
    controls: {
        include: Object.keys(data.withUrl),
    },
};

ControlPosition.args = data.controlPosition as unknown as (CardLayoutBlockModel & {
    children: BackgroundCardModel[];
})[];
ControlPosition.parameters = {
    controls: {
        include: Object.keys(data.controlPosition),
    },
};
