import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../.storybook/utils';
import {PageConstructorProvider, PageConstructor} from '../containers/PageConstructor';
import {CustomConfig, NavigationData, PageContent} from '../models';
import {GravityBlocksExtension, GravityBlocksProvider} from '../blocks/settings';

import bannerData from '../blocks/Banner/__stories__/data.json';
import companiesData from '../blocks/Companies/__stories__/data.json';
import headerData from '../blocks/Header/__stories__/data.json';
import infoData from '../blocks/Info/__stories__/data.json';
import mediaData from '../blocks/Media/__stories__/data.json';
import navData from '../gravity-blocks/navigation/__stories__/data.json';

export default {
    title: 'Lab/Tokenization/Blocks/HeroAndMedia',
    component: PageConstructor,
} as Meta;

const Template: StoryFn<{navigation: NavigationData; custom?: CustomConfig}> = ({
    navigation,
    custom = {},
}) => (
    <PageConstructorProvider>
        <GravityBlocksProvider>
            <PageConstructor
                extensions={GravityBlocksExtension({
                    globalDefaults: {
                        navigation,
                    },
                })}
                custom={custom}
                content={
                    {
                        blocks: [
                            // header-block: default with action buttons
                            blockTransform(headerData.default),
                            // header-block: with breadcrumbs + light background
                            blockTransform(headerData.breadcrumbs[0]),
                            // header-block: with breadcrumbs + dark theme
                            blockTransform(headerData.breadcrumbs[1]),
                            // header-block: with image
                            blockTransform(headerData.image),
                            // header-block: with background image and color (media variant)
                            blockTransform({type: 'header-block', ...headerData.media.image}),

                            // banner-block: light theme with themed image
                            blockTransform(bannerData.default.content),
                            // banner-block: forced dark theme
                            blockTransform(bannerData.darkTheme.content),

                            // media-block: default with image
                            blockTransform(mediaData.default),
                            // media-block: image slider
                            blockTransform(mediaData.imageSlider),
                            // media-block: youtube embed
                            blockTransform({type: 'media-block', ...mediaData.video.youtube}),
                            // media-block: video with controls
                            blockTransform({
                                type: 'media-block',
                                ...mediaData.video.staticWithControls,
                            }),
                            // media-block: video with preview
                            blockTransform({
                                type: 'media-block',
                                ...mediaData.video.videoWithPreview,
                            }),

                            // companies-block: title only
                            blockTransform(companiesData.default.content),
                            // companies-block: with description
                            blockTransform(companiesData.withDescription.content),

                            // info-block: dark theme (default)
                            blockTransform(infoData.default),
                            // info-block: light theme with background color
                            blockTransform({type: 'info-block', ...infoData.light}),
                        ],
                    } as PageContent
                }
            />
        </GravityBlocksProvider>
    </PageConstructorProvider>
);

export const Default = Template.bind({});
Default.args = {
    navigation: navData.navigation as NavigationData,
};
