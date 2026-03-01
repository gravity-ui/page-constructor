import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {QuoteModel, QuoteProps, QuoteType} from '../../../models';
import Quote from '../Quote';

import data from './data.json';

export default {
    title: 'Components/Cards/Quote',
    component: Quote,
    argTypes: {
        color: {control: 'color'},
    },
} as Meta;

const DefaultTemplate: StoryFn<QuoteModel> = (args) => (
    <div style={{maxWidth: '1248px'}}>
        <Quote {...(blockTransform(args) as QuoteProps)} />
    </div>
);

const QuoteTypesTemplate: StoryFn<Record<string, QuoteModel>> = (args) => (
    <div style={{maxWidth: '1248px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
        {Object.entries(args)
            .map(([key, item]) => {
                const transformedArgs = blockTransform(item) as QuoteProps;
                return <Quote key={key} {...transformedArgs} />;
            })
            .filter(Boolean)}
    </div>
);

export const Default = DefaultTemplate.bind({});
export const QuoteTypes = QuoteTypesTemplate.bind({});
export const BorderLine = DefaultTemplate.bind({});
export const DarkTheme = DefaultTemplate.bind({});

Default.args = data.default.content as QuoteModel;

BorderLine.args = {
    ...data.default.content,
    ...data.borderLine.content,
} as QuoteModel;

DarkTheme.args = data.darkTheme.content as QuoteModel;

const QUOTE_TYPES: Record<string, QuoteModel> = {
    0: {
        ...data.default.content,
        quoteType: QuoteType.Chevron,
    } as QuoteModel,
    1: {
        ...data.default.content,
        quoteType: QuoteType.EnglishDouble,
    } as QuoteModel,
};

QuoteTypes.args = QUOTE_TYPES;
QuoteTypes.parameters = {
    controls: {
        include: Object.keys(QUOTE_TYPES),
    },
};
