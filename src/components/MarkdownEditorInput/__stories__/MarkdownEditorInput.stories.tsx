import * as React from 'react';

import {ThemeProvider} from '@gravity-ui/uikit';
import type {Meta, StoryFn} from '@storybook/react';

import {MarkdownEditorInput, MarkdownEditorInputProps} from '../MarkdownEditorInput';

import data from './data.json';

export default {
    title: 'Components/MarkdownEditorInput',
    component: MarkdownEditorInput,
    parameters: {layout: 'padded'},
} as Meta<typeof MarkdownEditorInput>;

const Template: StoryFn<MarkdownEditorInputProps & {theme?: 'light' | 'dark'; width?: number}> = ({
    theme = 'light',
    width = 640,
    ...args
}) => {
    const [value, setValue] = React.useState(args.value);
    React.useEffect(() => setValue(args.value), [args.value]);

    return (
        <ThemeProvider theme={theme}>
            <div style={{width, maxWidth: '100%', padding: 16, boxSizing: 'border-box'}}>
                <MarkdownEditorInput {...args} value={value} onUpdate={setValue} />
                <pre style={{whiteSpace: 'pre-wrap', overflowWrap: 'anywhere'}}>{value}</pre>
            </div>
        </ThemeProvider>
    );
};

export const Default = Template.bind({});
Default.args = data.default;

export const Empty = Template.bind({});
Empty.args = data.empty;

export const Dark = Template.bind({});
Dark.args = {...data.default, theme: 'dark'};

export const Narrow = Template.bind({});
Narrow.args = {...data.default, width: 270};
