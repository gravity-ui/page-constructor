import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {QuoteModel, QuoteProps, QuoteType} from '../../../models';
import Quote from '../Quote';

import data from './data.json';

export default {
    title: 'Components/Cards/Quote',
    component: Quote,
    args: {
        border: 'shadow',
        theme: 'light',
    },
    argTypes: {color: {control: 'color'}},
} as Meta;

const DefaultTemplate: StoryFn<QuoteModel> = (args) => (
    <div style={{maxWidth: '1248px'}}>
        <Quote {...(blockTransform(args) as QuoteProps)} />
    </div>
);

const QuoteTypesTemplate: StoryFn<Record<string, QuoteModel>> = (args) => {
    return (
        <div style={{maxWidth: '1248px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
            {Object.entries(args)
                .map(([key, quoteArgs]) => {
                    if (typeof quoteArgs !== 'object' || quoteArgs === null) {
                        return null;
                    }
                    const transformedArgs = blockTransform(quoteArgs) as QuoteProps;
                    return <Quote key={key} {...transformedArgs} />;
                })
                .filter(Boolean)}
        </div>
    );
};

export const Default = DefaultTemplate.bind({});
export const QuoteTypes = QuoteTypesTemplate.bind({});
export const BorderLine = DefaultTemplate.bind({});
export const DarkTheme = DefaultTemplate.bind({});

const DefaultArgs = data.default.content as unknown as QuoteModel;

Default.args = DefaultArgs;

// Use string keys to avoid conflicts with default args
const QUOTE_TYPES: Record<string, QuoteModel> = {
    chevron: {
        ...data.default.content,
        quoteType: QuoteType.Chevron,
    } as unknown as QuoteModel,
    englishDouble: {
        ...data.default.content,
        quoteType: QuoteType.EnglishDouble,
    } as unknown as QuoteModel,
};

QuoteTypes.args = QUOTE_TYPES;

BorderLine.args = {
    ...data.default.content,
    ...data.borderLine.content,
} as unknown as QuoteModel;

DarkTheme.args = data.darkTheme.content as unknown as QuoteModel;

QuoteTypes.parameters = {
    controls: {
        include: Object.keys(QUOTE_TYPES), // This will be ['chevron', 'englishDouble']
    },
};
