import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {FooterBlockModel, FooterBlockProps} from '../../../models';
import Footer from '../Footer';

import data from './data.json';

export default {
    title: 'Blocks/Footer',
    component: Footer,
} as Meta;

const DefaultTemplate: StoryFn<FooterBlockModel> = (args) => (
    <Footer {...(blockTransform(args) as FooterBlockProps)} />
);

export const Full = DefaultTemplate.bind({});

Full.args = data.full as FooterBlockModel;
Full.parameters = {
    docs: {
        description: {
            story: 'Full 5-floor footer: (1) logo + link columns + additional row, (2) Join Us + social icons, (3) legal disclaimer, (4) privacy/terms + language + copyright, (5) attribution.',
        },
    },
};
