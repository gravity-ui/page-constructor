import {Meta, StoryFn} from '@storybook/react';

import {PageConstructor} from '../containers/PageConstructor';
import {HeroBlockModel, NavigationData} from '../models';

import {createTokenizationLandingContent} from './tokenizationLanding';

import heroData from '../blocks/Hero/__stories__/data.json';
import navData from '../navigation/__stories__/data.json';

interface StoryArgs {
    heroBlock: HeroBlockModel;
    navigation: NavigationData;
}

export default {
    title: 'Lab/Tokenization/Blocks/Hero',
    component: PageConstructor,
} as Meta;

const Template: StoryFn<StoryArgs> = ({heroBlock, navigation}) => (
    <PageConstructor
        navigation={navigation}
        content={createTokenizationLandingContent(heroBlock)}
    />
);

export const Default = Template.bind({});
Default.args = {
    navigation: navData.navigation as NavigationData,
    heroBlock: heroData.default as HeroBlockModel,
};
