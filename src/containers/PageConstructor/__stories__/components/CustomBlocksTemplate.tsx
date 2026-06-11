import {StoryFn} from '@storybook/react';

import {CustomConfig} from '../../../../models';
import {
    PageConstructor,
    PageConstructorExtension,
    PageConstructorProps,
} from '../../PageConstructor';

import {CustomBlock} from './CustomBlock';
import {CustomCard} from './CustomCard';
import {customDecoratorExtension} from './CustomDecorator';
import {CustomHeader} from './CustomHeader';
import {CustomLoadableCard, loadCustomCardData} from './CustomLoadableCard';
import {CustomNavigationItem} from './CustomNavigationItem';

const customConfig: CustomConfig = {
    blocks: {
        ['custom-block']: CustomBlock,
    },
    subBlocks: {
        ['custom-card']: CustomCard,
    },
    headers: {
        ['custom-header']: CustomHeader,
    },
    navigation: {
        ['custom-navigation-item']: CustomNavigationItem,
    },
    loadable: {
        ['custom-loadable-card']: {
            fetch: loadCustomCardData,
            component: CustomLoadableCard,
        },
    },
};

const customExtensions: PageConstructorExtension[] = [customDecoratorExtension()];

export const CustomBlocksTemplate: StoryFn<PageConstructorProps> = (args) => (
    <PageConstructor {...args} custom={customConfig} extensions={customExtensions} />
);
