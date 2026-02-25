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

const VariantsTemplate: StoryFn<Record<string, FooterBlockModel>> = (args) => (
    <React.Fragment>
        {Object.values(args).map((arg, index) => (
            <div key={index} style={{marginBottom: '48px'}}>
                <Footer {...(blockTransform(arg) as FooterBlockProps)} />
            </div>
        ))}
    </React.Fragment>
);

export const Full = DefaultTemplate.bind({});
export const Default = DefaultTemplate.bind({});
export const WithBackground = DefaultTemplate.bind({});
export const ColumnsOnly = DefaultTemplate.bind({});
export const AllVariants = VariantsTemplate.bind({});

Full.args = data.full as FooterBlockModel;
Full.parameters = {
    docs: {
        description: {
            story: 'Full 5-floor footer: (1) logo + link columns + additional row, (2) Join Us + social icons, (3) legal disclaimer, (4) privacy/terms + language + copyright, (5) attribution.',
        },
    },
};
Default.args = data.default as FooterBlockModel;
WithBackground.args = data.withBackground as FooterBlockModel;
ColumnsOnly.args = data.columnsOnly as FooterBlockModel;
AllVariants.args = data as Record<string, FooterBlockModel>;
AllVariants.parameters = {
    controls: {
        include: Object.keys(data),
    },
};
