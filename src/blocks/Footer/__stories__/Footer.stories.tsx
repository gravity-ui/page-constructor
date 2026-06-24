import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {blockMap, navItemMap, subBlockMap} from '../../../constructor-items';
import {InnerContext} from '../../../context/innerContext';
import {
    BlockTypes,
    FooterBlockModel,
    FooterBlockProps,
    HeaderBlockTypes,
    NavigationItemTypes,
    SubBlockTypes,
} from '../../../models';
import Footer from '../Footer';

import columnLayoutData from './data/column-layout.json';
import contactsIconsSizeData from './data/contacts-icons-size.data.json';
import contactsPositionsData from './data/contacts-positions.data.json';
import contactsUrlTitlesData from './data/contacts-url-titles.data.json';
import copyrightLogoData from './data/copyright-logo.data.json';
import floorsCustomizationData from './data/floors-customization.json';
import linksOverflowStrategyData from './data/links-overflow-strategy.data.json';
import showcaseData from './data/showcase.json';

export default {
    title: 'Blocks/Footer',
    component: Footer,
} as Meta;

const INNER_CONTEXT_VALUE = {
    navItemMap: {
        ...navItemMap,
    },
    itemMap: {
        ...blockMap,
        ...subBlockMap,
    },
    blockTypes: [...BlockTypes],
    subBlockTypes: [...SubBlockTypes],
    headerBlockTypes: [...HeaderBlockTypes],
    navigationBlockTypes: [...NavigationItemTypes],
    shouldRenderBlock: () => true,
    customization: {},
};

const DefaultTemplate: StoryFn<FooterBlockModel> = (args) => {
    return (
        <InnerContext.Provider value={INNER_CONTEXT_VALUE}>
            <Footer {...(blockTransform(args) as FooterBlockProps)} />
        </InnerContext.Provider>
    );
};

const VariantsTemplate: StoryFn<Record<number, FooterBlockModel>> = (args) => (
    <InnerContext.Provider value={INNER_CONTEXT_VALUE}>
        {Object.values(args).map((arg, index) => (
            <div key={index} style={{marginBottom: '120px'}}>
                <Footer {...(blockTransform(arg) as FooterBlockProps)} />
            </div>
        ))}
    </InnerContext.Provider>
);

export const ShowcaseData = DefaultTemplate.bind({});

ShowcaseData.args = showcaseData as unknown as FooterBlockModel;
ShowcaseData.parameters = {
    docs: {
        description: {
            story: 'Full 5-floor footer: (1) logo + link columns + additional row, (2) Join Us + social icons, (3) legal disclaimer, (4) privacy/terms + language + copyright, (5) attribution.',
        },
    },
};

export const FloorsCustomization = VariantsTemplate.bind({});
export const ContactsPositions = VariantsTemplate.bind({});
export const ContactsIconsSize = VariantsTemplate.bind({});
export const ContactsUrlTitles = VariantsTemplate.bind({});
export const ColumnsLayout = VariantsTemplate.bind({});
export const CopyrightLogo = VariantsTemplate.bind({});
export const LinksOverflowStrategy = VariantsTemplate.bind({});

FloorsCustomization.args = floorsCustomizationData.variants as FooterBlockModel[];
FloorsCustomization.parameters = {
    controls: {
        include: Object.keys(FloorsCustomization.args),
    },
    docs: {
        description: {
            story: 'Floors customization.',
        },
    },
};

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

ColumnsLayout.args = columnLayoutData.variants as FooterBlockModel[];
ColumnsLayout.parameters = {
    controls: {
        include: Object.keys(ColumnsLayout.args),
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
