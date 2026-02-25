import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {FooterBlockModel, FooterBlockProps} from '../../../models';
import Footer from '../Footer';

import columnsColSizesData from './data/columns-col-sizes.data.json';
import contactsIconsSizeData from './data/contacts-icons-size.data.json';
import contactsPositionsData from './data/contacts-positions.data.json';
import contactsUrlTitlesData from './data/contacts-url-titles.data.json';
import copyrightLogoData from './data/copyright-logo.data.json';
import fullData from './data/full.json';
import linksOverflowStrategyData from './data/links-overflow-strategy.data.json';

export default {
    title: 'Blocks/Footer',
    component: Footer,
} as Meta;

const DefaultTemplate: StoryFn<FooterBlockModel> = (args) => (
    <Footer {...(blockTransform(args) as FooterBlockProps)} />
);

const VariantsTemplate: StoryFn<Record<number, FooterBlockModel>> = (args) => (
    <React.Fragment>
        {Object.values(args).map((arg, index) => (
            <div key={index} style={{marginBottom: '120px'}}>
                <Footer {...(blockTransform(arg) as FooterBlockProps)} />
            </div>
        ))}
    </React.Fragment>
);

export const Full = DefaultTemplate.bind({});

Full.args = fullData as unknown as FooterBlockModel;
Full.parameters = {
    docs: {
        description: {
            story: 'Full 5-floor footer: (1) logo + link columns + additional row, (2) Join Us + social icons, (3) legal disclaimer, (4) privacy/terms + language + copyright, (5) attribution.',
        },
    },
};

export const ContactsPositions = VariantsTemplate.bind({});
export const ContactsIconsSize = VariantsTemplate.bind({});
export const ContactsUrlTitles = VariantsTemplate.bind({});
export const ColumnsColSizes = VariantsTemplate.bind({});
export const CopyrightLogo = VariantsTemplate.bind({});
export const LinksOverflowStrategy = VariantsTemplate.bind({});

ContactsPositions.args = contactsPositionsData.variants as FooterBlockModel[];
ContactsPositions.parameters = {
    controls: {
        include: Object.keys(ContactsPositions.args),
    },
    docs: {
        description: {
            story: 'Contacts floor variations for each linksPosition/titlePosition combination.',
        },
    },
};

ContactsIconsSize.args = contactsIconsSizeData.variants as FooterBlockModel[];
ContactsIconsSize.parameters = {
    controls: {
        include: Object.keys(ContactsIconsSize.args),
    },
    docs: {
        description: {
            story: 'Contacts floor variations for iconsSize.',
        },
    },
};

ContactsUrlTitles.args = contactsUrlTitlesData.variants as FooterBlockModel[];
ContactsUrlTitles.parameters = {
    controls: {
        include: Object.keys(ContactsUrlTitles.args),
    },
    docs: {
        description: {
            story: 'Contacts floor variations with and without urlTitle labels.',
        },
    },
};

ColumnsColSizes.args = columnsColSizesData.variants as FooterBlockModel[];
ColumnsColSizes.parameters = {
    controls: {
        include: Object.keys(ColumnsColSizes.args),
    },
    docs: {
        description: {
            story: 'Navigation floor only: columns with different colSizes combinations.',
        },
    },
};

CopyrightLogo.args = copyrightLogoData.variants as unknown as FooterBlockModel[];
CopyrightLogo.parameters = {
    controls: {
        include: Object.keys(CopyrightLogo.args),
    },
    docs: {
        description: {
            story: 'Fourth floor variations with and without logo.',
        },
    },
};

LinksOverflowStrategy.args = linksOverflowStrategyData.variants as unknown as FooterBlockModel[];
LinksOverflowStrategy.parameters = {
    controls: {
        include: Object.keys(LinksOverflowStrategy.args),
    },
    docs: {
        description: {
            story: 'Copyright floor variations for linksOverflowStrategy.',
        },
    },
};
