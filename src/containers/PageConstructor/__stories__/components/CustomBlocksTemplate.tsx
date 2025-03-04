import {StoryFn} from '@storybook/react';
import {CustomConfig} from '../../../../models';
import {PageConstructor, PageConstructorProps} from '../../PageConstructor';
import {CustomBlock} from './CustomBlock';
import {CustomCard} from './CustomCard';
import {CustomHeader} from './CustomHeader';
import {CustomNavigationItem} from './CustomNavigationItem';
import {CustomLoadableCard, loadCustomCardData} from './CustomLoadableCard';
import {customDecorator} from './CustomDecorator';

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
    decorators: {block: [customDecorator]},
    loadable: {
        ['custom-loadable-card']: {
            fetch: loadCustomCardData,
            component: CustomLoadableCard,
        },
    },
};

export const CustomBlocksTemplate: StoryFn<PageConstructorProps> = (args) => (
    <PageConstructor {...args} custom={customConfig} />
);
