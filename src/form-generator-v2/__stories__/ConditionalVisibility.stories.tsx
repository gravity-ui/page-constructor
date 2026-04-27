import {Meta, StoryFn} from '@storybook/react';

import {useResultPanel} from '../../../.storybook/addons/result-addon/useResultPanel';
import FormGenerator from '../FormGenerator';
import {Content, Fields} from '../types';

export default {
    title: 'FormGenerator/Conditional Visibility',
    component: FormGenerator,
    parameters: {
        layout: 'padded',
        resultPanel: true,
        docs: {
            description: {
                component:
                    'Field visibility is controlled by the `when` array on any field. ' +
                    'Conditions support `===`, `!==` (compare a field value), and `&&`, `||` (logical combinators between previous results). ' +
                    'When a hidden field had a value, it is automatically unset from content.',
            },
        },
    },
} as Meta<typeof FormGenerator>;

const Template: StoryFn<{blockConfig: Fields}> = ({blockConfig}) => {
    const [content, setContent] = useResultPanel<Content>({});
    return (
        <div style={{maxWidth: 600}}>
            <FormGenerator
                blockConfig={blockConfig}
                contentConfig={content}
                onUpdate={setContent}
            />
        </div>
    );
};

/**
 * Switch controls a whole group of fields.
 * Any field type supports `when` — here a colorInput, a segmentedRadioGroup,
 * and a textInput all appear only when the switch is on.
 */
export const SwitchGate = Template.bind({});
SwitchGate.storyName = 'Switch gate (===)';
SwitchGate.args = {
    blockConfig: [
        {
            type: 'switch',
            name: 'showOverlay',
            title: 'Show overlay',
        },
        {
            type: 'colorInput',
            name: 'overlayColor',
            title: 'Overlay Color',
            when: [{field: 'showOverlay', operator: '===', value: true}],
        },
        {
            type: 'segmentedRadioGroup',
            name: 'overlayOpacity',
            title: 'Opacity',
            defaultValue: '50',
            when: [{field: 'showOverlay', operator: '===', value: true}],
            options: [
                {value: '25', content: '25%'},
                {value: '50', content: '50%'},
                {value: '75', content: '75%'},
                {value: '100', content: '100%'},
            ],
        },
        {
            type: 'textInput',
            name: 'overlayText',
            title: 'Overlay Text',
            defaultValue: 'This text is visible only when the overlay is shown',
            when: [{field: 'showOverlay', operator: '===', value: true}],
        },
    ] as Fields,
};

/**
 * Select drives which branch of fields is shown.
 * `text` → only text fields; `media` → only media fields; `mixed` → both.
 * Achieved with `||` between two `===` conditions.
 */
export const SelectBranching = Template.bind({});
SelectBranching.storyName = 'Select branching (=== + ||)';
SelectBranching.args = {
    blockConfig: [
        {
            type: 'segmentedRadioGroup',
            name: 'contentType',
            title: 'Content type',
            defaultValue: 'text',
            options: [
                {value: 'text', content: 'Text'},
                {value: 'media', content: 'Media'},
                {value: 'mixed', content: 'Mixed'},
            ],
        },
        {
            type: 'textInput',
            name: 'text',
            title: 'Text',
            defaultValue: 'This text is visible only when the content type is text',
            when: [
                {field: 'contentType', operator: '===', value: 'text'},
                {operator: '||'},
                {field: 'contentType', operator: '===', value: 'mixed'},
            ],
        },
        {
            type: 'textArea',
            name: 'caption',
            title: 'Caption',
            when: [
                {field: 'contentType', operator: '===', value: 'text'},
                {operator: '||'},
                {field: 'contentType', operator: '===', value: 'mixed'},
            ],
        },
        {
            type: 'textInput',
            name: 'mediaUrl',
            title: 'Media URL',
            when: [
                {field: 'contentType', operator: '===', value: 'media'},
                {operator: '||'},
                {field: 'contentType', operator: '===', value: 'mixed'},
            ],
        },
        {
            type: 'select',
            name: 'mediaFit',
            title: 'Media Fit',
            hasClear: true,
            defaultValue: 'cover',
            when: [
                {field: 'contentType', operator: '===', value: 'media'},
                {operator: '||'},
                {field: 'contentType', operator: '===', value: 'mixed'},
            ],
            options: [
                {value: 'cover', content: 'Cover'},
                {value: 'contain', content: 'Contain'},
                {value: 'fill', content: 'Fill'},
            ],
        },
    ] as Fields,
};

/**
 * Two independent conditions combined with `&&`.
 * The advanced field is only shown when mode is "advanced" AND the feature is enabled.
 */
export const AndCondition = Template.bind({});
AndCondition.storyName = 'AND condition (&&)';
AndCondition.args = {
    blockConfig: [
        {
            type: 'switch',
            name: 'featureEnabled',
            title: 'Enable feature',
        },
        {
            type: 'segmentedRadioGroup',
            name: 'mode',
            title: 'Mode',
            defaultValue: 'simple',
            options: [
                {value: 'simple', content: 'Simple'},
                {value: 'advanced', content: 'Advanced'},
            ],
        },
        {
            type: 'text',
            text: 'Advanced settings appear only when the feature is enabled AND mode is Advanced.',
        },
        {
            type: 'textInput',
            name: 'advancedConfig',
            title: 'Advanced Config',
            when: [
                {field: 'featureEnabled', operator: '===', value: true},
                {operator: '&&'},
                {field: 'mode', operator: '===', value: 'advanced'},
            ],
        },
        {
            type: 'colorInput',
            name: 'advancedColor',
            title: 'Advanced Color',
            when: [
                {field: 'featureEnabled', operator: '===', value: true},
                {operator: '&&'},
                {field: 'mode', operator: '===', value: 'advanced'},
            ],
        },
    ] as Fields,
};

/**
 * A field hidden with `!==` — shown for everything except the excluded value.
 */
export const NotEqual = Template.bind({});
NotEqual.storyName = 'Exclude value (!==)';
NotEqual.args = {
    blockConfig: [
        {
            type: 'select',
            name: 'theme',
            title: 'Theme',
            options: [
                {value: 'light', content: 'Light'},
                {value: 'dark', content: 'Dark'},
                {value: 'custom', content: 'Custom'},
            ],
        },
        {
            type: 'colorInput',
            name: 'customColor',
            title: 'Custom Color',
            when: [{field: 'theme', operator: '===', value: 'custom'}],
        },
        {
            type: 'textInput',
            name: 'subtitle',
            title: 'Subtitle',
            when: [{field: 'theme', operator: '!==', value: 'custom'}],
        },
    ] as Fields,
};
