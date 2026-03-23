import * as React from 'react';

import {Button, Text, ThemeProvider} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import {Panel, PanelGroup, PanelResizeHandle} from 'react-resizable-panels';
import {useNavigate} from 'react-router';

import {FormBuilder, FormField} from '../../../../src/form-builder';
import DynamicForm from '../../../../src/form-generator-v2/FormGenerator';

import {FormOutput} from './components/FormOutput/FormOutput';

import './form.scss';

const b = block('form');

const hconfig = [
    {
        type: 'section',
        title: 'Main settings',
        opened: true,
        fields: [
            {
                title: 'Vertical offset',
                name: 'verticalOffset',
                type: 'select',
                options: [
                    {content: 'S', value: 's'},
                    {content: 'M', value: 'm'},
                ],
            },
        ],
    },
    {
        type: 'section',
        title: 'Breadcrumbs',
        fields: [
            {
                title: 'Item {{index}}',
                withAddButton: true,
                type: 'oneTypeGroup',
                index: 'index',
                fields: [
                    {
                        title: 'Text',
                        name: 'breadcrumbs[{{index}}].text',
                        type: 'textInput',
                    },
                    {
                        title: 'URL',
                        name: 'breadcrumbs[{{index}}].url',
                        type: 'textInput',
                    },
                ],
            },
        ],
    },
    {
        type: 'section',
        title: 'Text',
        opened: true,
        fields: [
            {
                title: 'Overtitle',
                name: 'overtitle',
                type: 'textInput',
            },
            {
                title: 'Title',
                name: 'title',
                type: 'textInput',
            },
            {
                title: 'Description',
                name: 'description',
                type: 'textArea',
            },
            {
                title: 'Width',
                name: 'width',
                options: [
                    {content: 'S', value: 's'},
                    {content: 'M', value: 'm'},
                ],
                type: 'select',
            },
            {
                title: 'Theme',
                name: 'theme',
                options: [
                    {content: 'Light', value: 'light'},
                    {content: 'Dark', value: 'dark'},
                ],
                type: 'segmentedRadioGroup',
                defaultValue: 'light',
            },
        ],
    },
    {
        type: 'section',
        title: 'Buttons',
        fields: [
            {
                title: 'Button {{index}}',
                withAddButton: true,
                type: 'oneTypeGroup',
                index: 'index',
                fields: [
                    {
                        type: 'section',
                        title: 'Main settings',
                        opened: true,
                        fields: [
                            {
                                title: 'Text',
                                type: 'textInput',
                                name: 'buttons[{{index}}].text',
                            },
                            {
                                title: 'URL',
                                type: 'textInput',
                                name: 'buttons[{{index}}].url',
                            },
                            {
                                title: 'URL title',
                                type: 'textInput',
                                name: 'buttons[{{index}}].urlTitle',
                            },
                            {
                                title: 'Style',
                                type: 'select',
                                name: 'buttons[{{index}}].theme',
                                options: [{value: 'accent', content: 'Accent'}],
                            },
                            {
                                title: 'Target',
                                type: 'select',
                                name: 'buttons[{{index}}].target',
                                options: [{value: '_blank'}],
                                hasClear: true,
                            },
                        ],
                    },
                    {
                        type: 'section',
                        title: 'Analytics tracking',
                        note: {
                            text: 'Only events for the counters listed in the input field will be sent.',
                            level: '',
                        },
                        fields: [
                            {
                                title: 'Analytics event {{index2}}',
                                type: 'oneTypeGroup',
                                withAddButton: true,
                                index: 'index2',
                                fields: [
                                    {
                                        title: 'Name',
                                        type: 'textInput',
                                        name: 'buttons[{{index}}].analyticsEvents[{{index2}}].name',
                                    },
                                    {
                                        title: 'Target',
                                        type: 'textInput',
                                        name: 'buttons[{{index}}].analyticsEvents[{{index2}}].target',
                                    },
                                    {
                                        title: 'Counter {{indexgoal}}',
                                        withAddButton: true,
                                        type: 'oneTypeGroup',
                                        index: 'indexgoal',
                                        fields: [
                                            {
                                                title: 'Counter',
                                                type: 'textInput',
                                                name: 'buttons[{{index}}].analyticsEvents[{{index2}}].counters[{{indexgoal}}].includes',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        type: 'section',
        title: 'Background',
        opened: true,
        fields: [
            {
                title: 'Color HEX',
                type: 'textInput',
                name: 'background.color',
            },
            {
                title: 'Type',
                name: '_mediaType',
                options: [
                    {content: 'Image', value: 'image'},
                    {content: 'Video', value: 'video'},
                ],
                type: 'segmentedRadioGroup',
            },
            {
                type: 'text',
                text: 'Light theme',
                when: [
                    {
                        field: '_mediaType',
                        operator: '!==',
                        value: undefined,
                    },
                ],
            },
            {
                title: 'Desktop',
                type: 'textInput',
                name: 'background.light.image.desktop',
                when: [
                    {
                        field: '_mediaType',
                        operator: '===',
                        value: 'image',
                    },
                ],
            },
            {
                title: 'Tablet',
                type: 'textInput',
                name: 'background.light.image.tablet',
                when: [
                    {
                        field: '_mediaType',
                        operator: '===',
                        value: 'image',
                    },
                ],
            },
            {
                title: 'Mobile',
                type: 'textInput',
                name: 'background.light.image.mobile',
                when: [
                    {
                        field: '_mediaType',
                        operator: '===',
                        value: 'image',
                    },
                ],
            },
            {
                title: 'URL',
                type: 'textInput',
                name: 'background.light.video.src',
                when: [
                    {
                        field: '_mediaType',
                        operator: '===',
                        value: 'video',
                    },
                ],
            },
            {
                type: 'text',
                text: 'Dark theme',
                when: [
                    {
                        field: '_mediaType',
                        operator: '!==',
                        value: undefined,
                    },
                ],
            },
            {
                title: 'Desktop',
                type: 'textInput',
                name: 'background.dark.image.desktop',
                when: [
                    {
                        field: '_mediaType',
                        operator: '===',
                        value: 'image',
                    },
                ],
            },
            {
                title: 'Tablet',
                type: 'textInput',
                name: 'background.dark.image.tablet',
                when: [
                    {
                        field: '_mediaType',
                        operator: '===',
                        value: 'image',
                    },
                ],
            },
            {
                title: 'Mobile',
                type: 'textInput',
                name: 'background.dark.image.mobile',
                when: [
                    {
                        field: '_mediaType',
                        operator: '===',
                        value: 'image',
                    },
                ],
            },
            {
                title: 'URL',
                type: 'textInput',
                name: 'background.dark.video.src',
                when: [
                    {
                        field: '_mediaType',
                        operator: '===',
                        value: 'video',
                    },
                ],
            },
        ],
    },
];

const FormContent = () => {
    // @ts-ignore
    const [formFields, setFormFields] = React.useState<FormField[]>(hconfig);
    const [contentConfig, setContentConfig] = React.useState(() => ({
        buttons: [{text: 'conatct'}, {text: 'right'}],
        overtitle: 'over',
        theme: 'dark',
    }));

    const resetForm = React.useCallback(() => {
        setFormFields([]);
    }, []);

    const navigate = useNavigate();

    return (
        <div className={b()}>
            <PanelGroup direction="horizontal" className={b('panel-group')}>
                {/* Left Panel Group */}
                <Panel minSize={30} defaultSize={50}>
                    <PanelGroup direction="vertical" className={b('panel-group')}>
                        {/* Form Builder Panel */}
                        <Panel minSize={30} defaultSize={60}>
                            <div className={b('panel-content')}>
                                <div className={b('header')}>
                                    <Text variant="header-1">Form Builder</Text>
                                    <div className={b('header-buttons')}>
                                        <Button onClick={resetForm} view="outlined-danger" size="m">
                                            Reset Form
                                        </Button>
                                        <Button onClick={() => navigate('/')} size="m">
                                            Go to Editor
                                        </Button>
                                    </div>
                                </div>
                                <div className={b('form')}>
                                    <FormBuilder formFields={formFields} onChange={setFormFields} />
                                </div>
                            </div>
                        </Panel>

                        {/* Resize Handle */}
                        <PanelResizeHandle className={b('resize-handle', {horizontal: true})} />

                        {/* Form Output Panel */}
                        <Panel minSize={20} defaultSize={20}>
                            <div className={b('panel-content')}>
                                <FormOutput
                                    title="Form Output:"
                                    data={formFields.map(({id: _id, ...rest}) => rest)}
                                />
                            </div>
                        </Panel>
                    </PanelGroup>
                </Panel>

                {/* Resize Handle */}
                <PanelResizeHandle className={b('resize-handle', {vertical: true})} />

                {/* Right Panel Group */}
                <Panel minSize={30} defaultSize={30}>
                    <PanelGroup direction="vertical" className={b('panel-group')}>
                        {/* Form Preview Panel */}
                        <Panel minSize={30} defaultSize={60}>
                            <div className={b('panel-content')}>
                                <Text variant="header-1">Form Preview</Text>
                                <DynamicForm
                                    contentConfig={contentConfig}
                                    // @ts-ignore
                                    blockConfig={formFields}
                                    // @ts-ignore
                                    onUpdate={setContentConfig}
                                />
                            </div>
                        </Panel>

                        {/* Resize Handle */}
                        <PanelResizeHandle className={b('resize-handle', {horizontal: true})} />

                        {/* Form Output Panel */}
                        <Panel minSize={20} defaultSize={20}>
                            <div className={b('panel-content')}>
                                <FormOutput title="Form Output:" data={contentConfig} />
                            </div>
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>
        </div>
    );
};

// Главный компонент формы, оборачивающий содержимое в провайдер
export default function FormPage() {
    return (
        <ThemeProvider>
            <FormContent />
        </ThemeProvider>
    );
}
