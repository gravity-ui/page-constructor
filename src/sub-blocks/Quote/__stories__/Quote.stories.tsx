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
const QuoteTypesTemplate: StoryFn<QuoteModel> = (args) => {
    const transformedArgs = blockTransform(args) as QuoteProps;
    return (
        <div style={{maxWidth: '1248px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
            <Quote {...transformedArgs} quoteType={QuoteType.Chevron} />
            <Quote {...transformedArgs} quoteType={QuoteType.EnglishDouble} />
        </div>
    );
};

export const Default = DefaultTemplate.bind({});
export const QuoteTypes = QuoteTypesTemplate.bind({});
export const BorderLine = DefaultTemplate.bind({});
export const DarkTheme = DefaultTemplate.bind({});

const DefaultArgs = data.default.content;

Default.args = DefaultArgs as QuoteModel;
QuoteTypes.args = DefaultArgs as QuoteModel;
BorderLine.args = {
    ...DefaultArgs,
    ...data.borderLine.content,
} as QuoteProps;
DarkTheme.args = data.darkTheme.content as QuoteProps;
