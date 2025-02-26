import {Meta, StoryFn} from '@storybook/react';

import {ClassNameProps} from '../../../models';
import BrandFooter from '../BrandFooter';

export default {
    title: 'Components/BrandFooter',
    component: BrandFooter,
} as Meta;

export const Default: StoryFn<ClassNameProps> = (args) => <BrandFooter {...args} />;

Default.args = {};
