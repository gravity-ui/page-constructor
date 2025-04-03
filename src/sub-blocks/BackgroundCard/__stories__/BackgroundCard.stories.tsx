import {Meta, StoryFn} from '@storybook/react';

import {blockListTransform, blockTransform} from '../../../../.storybook/utils';
import CardLayout, {CardLayoutBlockProps} from '../../../blocks/CardLayout/CardLayout';
import {BlockBase} from '../../../components';
import {ConstructorRow} from '../../../containers/PageConstructor/components/ConstructorRow';
import {Grid} from '../../../grid';
import {BackgroundCardProps} from '../../../models';
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

const DefaultTemplate: StoryFn<BackgroundCardProps> = (args) => (
    <div style={{maxWidth: '400px'}}>
        <BackgroundCard {...args} />
    </div>
);

const PropsTemplate: StoryFn<Record<number, {}>> = (args) => (
    <div style={{display: 'flex'}}>
        {Object.values(args).map((item, index) => (
            <div key={index} style={{display: 'inline-table', maxWidth: '400px', padding: '0 8px'}}>
                <BackgroundCard {...item} />
            </div>
        ))}
    </div>
);

const CardThemesTemplate: StoryFn<Record<number, BackgroundCardProps>> = (args) => (
    <div style={{display: 'flex'}}>
        {Object.values(args).map((item, index) => (
            <div style={{maxWidth: '400px', padding: '0 8px'}} key={index}>
                <BackgroundCard {...item} />
            </div>
        ))}
    </div>
);

const ControlPositionTemplate: StoryFn<
    Record<number, CardLayoutBlockProps & {children: BackgroundCardProps[]}>
> = (args) => (
    <Grid>
        <ConstructorRow>
            {Object.values(args).map(({children, ...rest}, contentLayoutIndex) => (
                <BlockBase key={contentLayoutIndex}>
                    <CardLayout {...rest}>
                        {children.map((item, index) => (
                            <BackgroundCard key={index} {...item} />
                        ))}
                    </CardLayout>
                </BlockBase>
            ))}
        </ConstructorRow>
    </Grid>
);

export const Default = DefaultTemplate.bind({});
export const Props = PropsTemplate.bind([]);
export const WithBackgroundImage = PropsTemplate.bind([]);
export const Paddings = PropsTemplate.bind([]);
export const CardThemes = CardThemesTemplate.bind([]);
export const BorderLine = PropsTemplate.bind([]);
export const BackgroundColor = PropsTemplate.bind([]);
export const WithUrl = CardThemesTemplate.bind([]);
export const ControlPosition = ControlPositionTemplate.bind([]);

Default.args = blockTransform(data.default) as BackgroundCardProps;

Props.args = blockListTransform(data.props) as BackgroundCardProps[];
Props.parameters = {
    controls: {
        include: Object.keys(data.props),
    },
};

WithBackgroundImage.args = blockListTransform(
    data.props.map((item) => ({...item, ...data.withBackgroundImage})),
) as BackgroundCardProps[];
WithBackgroundImage.parameters = {
    controls: {
        include: Object.keys(data.props),
    },
};

Paddings.args = blockListTransform(
    data.withPaddings.map((item) => ({...item, ...data.withBackgroundImage})),
) as BackgroundCardProps[];
Paddings.parameters = {
    controls: {
        include: Object.keys(data.withPaddings),
    },
};

CardThemes.args = blockListTransform(data.cardThemes) as BackgroundCardProps[];
CardThemes.parameters = {
    controls: {
        include: Object.keys(data.cardThemes),
    },
};

BorderLine.args = blockListTransform(
    data.props.map((item) => ({
        ...item,
        ...data.withBackgroundImage,
        ...data.borderLine,
    })),
) as BackgroundCardProps[];
BorderLine.parameters = {
    controls: {
        include: Object.keys(data.props),
    },
};

BackgroundColor.args = blockListTransform(data.backgroundColor) as BackgroundCardProps[];
BackgroundColor.parameters = {
    controls: {
        include: Object.keys(data.backgroundColor),
    },
};

WithUrl.args = blockListTransform(data.withUrl) as BackgroundCardProps[];
WithUrl.parameters = {
    controls: {
        include: Object.keys(data.withUrl),
    },
};

ControlPosition.args = blockListTransform(data.controlPosition) as (CardLayoutBlockProps & {
    children: BackgroundCardProps[];
})[];
ControlPosition.parameters = {
    controls: {
        include: Object.keys(data.controlPosition),
    },
};
