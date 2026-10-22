import {Meta, StoryFn} from '@storybook/react';

import {useTheme} from '../../../context/theme';
import {PlayButtonThemes} from '../../../models';
import {PageConstructor, PageConstructorProps} from '../PageConstructor';
import {PageConstructorProvider, PageConstructorProviderProps} from '../Provider';

import {CustomBlocksTemplate} from './components/CustomBlocksTemplate';

import data from './data.json';
import projectSettingsData from './projectSettingsData.json';

export default {
    title: 'Containers/PageConstructor',
    component: PageConstructor,
} as Meta;

const DefaultTemplate: StoryFn<PageConstructorProps> = (args) => <PageConstructor {...args} />;

type ProjectSettingsStoryProps = PageConstructorProps & {
    projectSettings: NonNullable<PageConstructorProviderProps['projectSettings']>;
};

const ProjectSettingsTemplate: StoryFn<ProjectSettingsStoryProps> = (
    {projectSettings, ...args},
    context,
) => {
    const inheritedTheme = useTheme();

    return (
        <PageConstructorProvider
            isMobile={context.globals.platform === 'mobile'}
            locale={{lang: context.globals.lang}}
            projectSettings={projectSettings}
            theme={context.globals.theme || inheritedTheme}
        >
            <PageConstructor {...args} />
        </PageConstructorProvider>
    );
};

export const Default = DefaultTemplate.bind({});
export const WithNavigation = DefaultTemplate.bind({});
export const WithFullWidthBackgroundMedia = DefaultTemplate.bind({});
export const Branded = DefaultTemplate.bind({});
export const CustomBlocks = CustomBlocksTemplate.bind({});
export const WithProjectVideoButtonSettings = ProjectSettingsTemplate.bind({});

Default.args = data.default as PageConstructorProps;

WithNavigation.args = {
    content: {
        blocks: data.default.content.blocks,
    },
    navigation: data.navigation,
} as PageConstructorProps;

WithFullWidthBackgroundMedia.args = {
    content: {
        blocks: data.default.content.blocks,
        background: data.withFullWidthBackgroundMedia.background,
    },
} as PageConstructorProps;

Branded.args = {
    ...data.default,
    isBranded: true,
} as PageConstructorProps;

CustomBlocks.args = data.custom as unknown as PageConstructorProps;

WithProjectVideoButtonSettings.args = {
    ...projectSettingsData,
    projectSettings: {
        defaultVideoButtonSettings: {
            theme: PlayButtonThemes.Custom,
            colors: {
                light: {
                    circleColor: 'rgb(203 255 92)',
                    circleHoverColor: 'rgb(203 255 92)',
                    triangleColor: '#000000',
                    triangleHoverColor: '#000000',
                },
                dark: {
                    circleColor: 'rgb(203 255 92)',
                    circleHoverColor: 'rgb(203 255 92)',
                    triangleColor: '#000000',
                    triangleHoverColor: '#000000',
                },
            },
        },
    },
} as ProjectSettingsStoryProps;
