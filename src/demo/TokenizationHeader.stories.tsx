import {Meta, StoryFn} from '@storybook/react';

import {PageConstructor} from '../containers/PageConstructor';
import {HeaderBlockModel, NavigationData} from '../models';

import {createTokenizationLandingContent} from './tokenizationLanding';

import headerData from '../blocks/Header/__stories__/data.json';
import navData from '../navigation/__stories__/data.json';

interface StoryArgs {
    headerBlock: HeaderBlockModel;
    navigation: NavigationData;
}

export default {
    title: 'Lab/Tokenization/Blocks/Header',
    component: PageConstructor,
} as Meta;

const Template: StoryFn<StoryArgs> = ({headerBlock, navigation}) => (
    <PageConstructor
        navigation={navigation}
        content={createTokenizationLandingContent(headerBlock)}
    />
);

const navigation = navData.navigation as NavigationData;

export const Default = Template.bind({});
Default.args = {
    navigation,
    headerBlock: headerData.default as HeaderBlockModel,
};

export const BreadcrumbsLight = Template.bind({});
BreadcrumbsLight.args = {
    navigation,
    headerBlock: headerData.breadcrumbs[0] as HeaderBlockModel,
};

export const BreadcrumbsDark = Template.bind({});
BreadcrumbsDark.args = {
    navigation,
    headerBlock: headerData.breadcrumbs[1] as HeaderBlockModel,
};

export const Image = Template.bind({});
Image.args = {
    navigation,
    headerBlock: {
        ...headerData.image,
        title: headerData.image.title.replace('{{width}}', 'm'),
    } as HeaderBlockModel,
};

export const BackgroundMedia = Template.bind({});
BackgroundMedia.args = {
    navigation,
    headerBlock: {
        type: 'header-block',
        ...headerData.media.image,
    } as HeaderBlockModel,
};
