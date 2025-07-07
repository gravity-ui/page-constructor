import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import CardLayout from '../../../blocks/CardLayout/CardLayout';
import {BlockBase} from '../../../components';
import {ConstructorRow} from '../../../containers/PageConstructor/components/ConstructorRow';
import {Grid} from '../../../grid';
import {
    CardLayoutBlockModel,
    CardLayoutBlockProps,
    ImageCardModel,
    ImageCardProps,
} from '../../../models';
import ImageCard from '../ImageCard';

import data from './data.json';

export default {
    component: ImageCard,
    title: 'Components/Cards/ImageCard',
    argTypes: {
        backgroundColor: {
            control: {type: 'color'},
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<ImageCardModel> = (args) => (
    <div style={{width: 400, margin: 20}}>
        <ImageCard {...(blockTransform(args) as ImageCardProps)} />
    </div>
);

const VariousTemplate: StoryFn<Record<number, ImageCardModel>> = (args) => (
    <div
        style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start'}}
    >
        {Object.values(args).map((arg, i) => (
            <div key={i} style={{width: 400, margin: 20}}>
                <ImageCard {...(blockTransform(arg) as ImageCardProps)} />
            </div>
        ))}
    </div>
);

const ControlPositionTemplate: StoryFn<
    Record<number, CardLayoutBlockModel & {children: ImageCardModel[]}>
> = (args) => (
    <Grid>
        <ConstructorRow>
            {Object.values(args).map((cardLayout, i) => (
                <BlockBase key={i}>
                    <CardLayout {...(blockTransform(cardLayout) as CardLayoutBlockProps)}>
                        {cardLayout.children.map((item, index) => (
                            <ImageCard key={index} {...(blockTransform(item) as ImageCardProps)} />
                        ))}
                    </CardLayout>
                </BlockBase>
            ))}
        </ConstructorRow>
    </Grid>
);

export const Default = DefaultTemplate.bind({});
export const Margins = VariousTemplate.bind([]);
export const DirectionReverse = VariousTemplate.bind({});
export const Content = VariousTemplate.bind({});
export const BackgroundColor = VariousTemplate.bind({});
export const WithUrl = VariousTemplate.bind({});
export const WithUrlAndBackgroundColor = VariousTemplate.bind({});
export const Border = VariousTemplate.bind({});
export const BorderRadius = VariousTemplate.bind({});
export const ControlPosition = ControlPositionTemplate.bind([]);
export const Size = VariousTemplate.bind([]);

Default.args = data.default as ImageCardModel;

Margins.args = data.margins.map((marginData) => ({
    ...data.default,
    ...marginData,
})) as ImageCardModel[];
Margins.parameters = {
    controls: {
        include: Object.keys(Margins.args),
    },
};

Size.args = data.size.map((sizeData) => ({
    ...data.default,
    additionalInfo: data.content.additionalInfo,
    list: data.content.list,
    buttons: data.content.buttons,
    ...sizeData,
})) as ImageCardModel[];
Size.parameters = {
    controls: {
        include: Object.keys(Size.args),
    },
};

DirectionReverse.args = data.margins.map((marginData) => ({
    ...data.default,
    ...marginData,
    ...data.direction,
})) as ImageCardModel[];
DirectionReverse.parameters = {
    controls: {
        include: Object.keys(DirectionReverse.args),
    },
};

Content.args = [
    {
        title: data.default.title,
        type: data.default.type,
        text: data.default.text,
        image: data.default.image,
    },
    {
        title: data.default.title,
        type: data.default.type,
        image: data.default.image,
    },
    {
        image: data.default.image,
        type: data.default.type,
    },
    {
        title: 'With buttons',
        type: data.default.type,
        text: data.default.text,
        image: data.default.image,
        buttons: data.content.buttons,
    },
    {
        title: 'With links',
        type: data.default.type,
        text: data.default.text,
        image: data.default.image,
        links: data.content.links,
    },
    {
        title: 'With url and list',
        type: data.default.type,
        text: data.default.text,
        image: data.default.image,
        url: data.content.url,
        list: data.content.list,
    },
    {
        type: data.default.type,
        image: data.default.image,
        list: data.content.list,
    },
] as ImageCardModel[];
Content.parameters = {
    controls: {
        include: Object.keys(Content.args),
    },
};

BackgroundColor.args = data.margins.map((marginData) => ({
    ...data.default,
    ...marginData,
    ...data.backgroundColor,
})) as ImageCardModel[];
BackgroundColor.parameters = {
    controls: {
        include: Object.keys(BackgroundColor.args),
    },
};

WithUrl.args = data.margins.map((marginData) => ({
    ...data.default,
    ...marginData,
    ...data.withUrl,
})) as ImageCardModel[];
WithUrl.parameters = {
    controls: {
        include: Object.keys(WithUrl.args),
    },
};

WithUrlAndBackgroundColor.args = data.border.map((borderData) => ({
    ...data.default,
    ...borderData,
    ...data.withUrlAndBackgroundColor,
})) as ImageCardModel[];
WithUrlAndBackgroundColor.parameters = {
    controls: {
        include: Object.keys(WithUrlAndBackgroundColor.args),
    },
};

Border.args = data.border.map((borderData) => ({
    ...data.default,
    ...borderData,
})) as ImageCardModel[];
Border.parameters = {
    controls: {
        include: Object.keys(Border.args),
    },
};

BorderRadius.args = data.borderRadius.map((borderData) => ({
    ...data.default,
    ...borderData,
})) as ImageCardModel[];
BorderRadius.parameters = {
    controls: {
        include: Object.keys(BorderRadius.args),
    },
};

ControlPosition.args = data.cardLayout as (CardLayoutBlockModel & {children: ImageCardModel[]})[];
ControlPosition.parameters = {
    controls: {
        include: Object.keys(ControlPosition.args),
    },
};
