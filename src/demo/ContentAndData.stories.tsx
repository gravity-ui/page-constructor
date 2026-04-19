import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../.storybook/utils';
import {PageConstructorProvider, PageConstructor} from '../containers/PageConstructor';
import {CustomConfig, NavigationData, PageContent} from '../models';
import {CustomComponent} from '../navigation/__stories__/CustomComponent/CustomComponent';
import {GravityBlocksProvider, GravityBlocksExtension} from '../blocks/settings';

import contentLayoutData from '../blocks/ContentLayout/__stories__/data.json';
import foldableListData from '../blocks/FoldableList/__stories__/data.json';
import questionsData from '../blocks/Questions/__stories__/data.json';
import tableData from '../blocks/Table/__stories__/data.json';
import tabsData from '../blocks/Tabs/__stories__/data.json';
import navData from '../navigation/__stories__/data.json';

export default {
    title: 'Lab/Tokenization/Blocks/ContentAndData',
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
                            // content-layout-block: default text only
                            blockTransform(contentLayoutData.default),
                            // content-layout-block: centered
                            blockTransform(contentLayoutData.textAlignCenter),
                            // content-layout-block: with background color
                            blockTransform(contentLayoutData.withBackgroundColor),
                            // content-layout-block: with background image + color
                            blockTransform(contentLayoutData.withImageAndBackgroundColor),
                            // content-layout-block: dark monochrome theme
                            blockTransform(contentLayoutData.theme[0]),
                            // content-layout-block: light monochrome theme
                            blockTransform(contentLayoutData.theme[1]),
                            // content-layout-block variants with list/links/buttons
                            ...contentLayoutData.contentVariables.map(blockTransform),

                            // tabs-block: default (all tab types: image, video, youtube)
                            blockTransform(tabsData.default.content),

                            // questions-block: default with links
                            blockTransform(questionsData.default.content),
                            // questions-block: with bullet list items
                            blockTransform(questionsData.textWithListBullet.content),

                            // foldable-list-block: default
                            blockTransform(foldableListData.default),
                            // foldable-list-block: with bullet list items
                            blockTransform(foldableListData.textWithListBullet),
                            // foldable-list-block: with dash list items
                            blockTransform(foldableListData.textWithListDash),

                            // table-block: numeric values (0/1)
                            blockTransform(tableData.default.content),
                            // table-block: tick markers
                            blockTransform(tableData.tick.content),
                        ],
                    } as PageContent
                }
            />
        </GravityBlocksProvider>
    </PageConstructorProvider>
);

export const Default = Template.bind({});
Default.args = {
    custom: {
        navigation: {
            'custom-item': CustomComponent,
        },
    },
    navigation: {
        ...navData.navigation,
        header: {
            ...navData.navigation.header,
            rightItems: [
                ...navData.navigation.header.rightItems,
                {
                    type: 'custom-item',
                },
            ],
        },
    } as NavigationData,
};
