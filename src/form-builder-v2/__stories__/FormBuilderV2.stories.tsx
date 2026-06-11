import * as React from 'react';

import {ThemeProvider} from '@gravity-ui/uikit';
import {Meta, StoryFn} from '@storybook/react';

import {FormBuilderDensity, FormBuilderV2} from '../FormBuilderV2';
import {FormField} from '../types';

export default {
    title: 'FormBuilder/v2',
    component: FormBuilderV2,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'FormBuilderV2 — visual editor for FormGenerator v2 schemas. ' +
                    'Two density modes: `full` (default — roomy 220px palette with ' +
                    'labeled tiles, palette is user-resizable) and `compact` (narrow ' +
                    'icon-only strip for embedding into limited-width host UI). ' +
                    'Inspector and canvas behave identically in both — no drawer, ' +
                    'no overlap.',
            },
        },
    },
} as Meta<typeof FormBuilderV2>;

const SAMPLE_FIELDS: FormField[] = [
    {id: 'fb2_1', type: 'textInput', name: 'shipName', title: 'Ship name'},
    {id: 'fb2_2', type: 'textArea', name: 'missionLog', title: 'Mission log'},
    {
        id: 'fb2_3',
        type: 'segmentedRadioGroup',
        name: 'shipClass',
        title: 'Ship class',
        options: [
            {value: 'ranger', content: 'Ranger'},
            {value: 'lander', content: 'Lander'},
            {value: 'station', content: 'Station'},
        ],
    },
    {id: 'fb2_4', type: 'switch', name: 'armed', title: 'Armed'},
    {id: 'fb2_5', type: 'colorInput', name: 'hullColor', title: 'Hull color'},
];

interface TemplateArgs {
    initialFields: FormField[];
    density?: FormBuilderDensity;
}

const Template: StoryFn<TemplateArgs> = ({initialFields, density}) => {
    const [fields, setFields] = React.useState<FormField[]>(initialFields);

    return (
        <ThemeProvider theme="light">
            <div
                style={{
                    padding: 24,
                    minHeight: '100vh',
                    background: 'var(--g-color-base-background)',
                    boxSizing: 'border-box',
                }}
            >
                <FormBuilderV2 formFields={fields} onChange={setFields} density={density} />
            </div>
        </ThemeProvider>
    );
};

export const Full = Template.bind({});
Full.args = {
    initialFields: SAMPLE_FIELDS,
    density: 'full',
};
Full.parameters = {
    docs: {
        description: {
            story:
                'Default mode. Palette is 220px wide with two columns of labeled ' +
                'square tiles, and is user-resizable via the bar between palette ' +
                'and canvas. Roomy variant for standalone usage where there is ' +
                'plenty of horizontal space.',
        },
    },
};

export const Compact = Template.bind({});
Compact.args = {
    initialFields: SAMPLE_FIELDS,
    density: 'compact',
};
Compact.parameters = {
    docs: {
        description: {
            story:
                'Narrow palette mode (`density="compact"`). Palette shrinks to a ' +
                '~56px icon-only strip; labels are visually hidden but kept for ' +
                'screen readers and shown as hover tooltips. Use when embedding ' +
                'the builder into a sidebar, modal, or settings tab on a host site.',
        },
    },
};

export const Empty = Template.bind({});
Empty.args = {
    initialFields: [],
    density: 'full',
};
