import {Meta, StoryFn} from '@storybook/react';

import {AuthorProps, AuthorType} from '../../../models';
import Author from '../Author';

import data from './data.json';

export default {
    component: Author,
    title: 'Components/Author',
} as Meta;

const DefaultTemplate: StoryFn<AuthorProps> = (args) => <Author {...args} />;

const TypesTemplate: StoryFn<AuthorProps> = (args) => (
    <div>
        <div style={{paddingBottom: '32px'}}>
            <h3>Type Column</h3>
            <Author {...args} />
        </div>
        <div>
            <h3>Type Line</h3>
            <Author {...args} type={AuthorType.Line} />
        </div>
    </div>
);

export const Default = DefaultTemplate.bind({});
export const Types = TypesTemplate.bind({});

Default.args = data.default.content as AuthorProps;
Types.args = data.default.content as AuthorProps;
