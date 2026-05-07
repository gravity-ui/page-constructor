import {Meta, StoryFn} from '@storybook/react';

import {AuthorProps} from '../../../models';
import Author from '../Author';

import data from './data.json';

export default {
    component: Author,
    title: 'Components/Author',
} as Meta;

const DefaultTemplate: StoryFn<AuthorProps> = (args) => <Author {...args} />;

const TypesTemplate: StoryFn<Record<number, AuthorProps>> = (args) => (
    <div style={{display: 'flex', gap: '40px'}}>
        {Object.values(args).map((item, index) => (
            <div key={index}>
                <h3 style={{marginBottom: '16px'}}>Type: {item.type}</h3>
                <Author {...item} />
            </div>
        ))}
    </div>
);

export const Default = DefaultTemplate.bind({});
export const Types = TypesTemplate.bind({});

Default.args = data.default as AuthorProps;

Types.args = data.types as AuthorProps[];
Types.parameters = {
    controls: {
        include: Object.keys(data.types),
    },
};
