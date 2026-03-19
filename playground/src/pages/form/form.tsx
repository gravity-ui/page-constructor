import * as React from 'react';
import {Button, Text, ThemeProvider} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import {Panel, PanelGroup, PanelResizeHandle} from 'react-resizable-panels';
import {useNavigate} from 'react-router';
import DynamicForm from '../../../../src/form-generator-v2/FormGenerator';
import {FormOutput} from './components/FormOutput/FormOutput';
import {FormBuilder, FormField} from '../../../../src/form-builder';

import './form.scss';

const b = block('form');

const hconfig = [
    {
        type: 'section',
        title: 'Main settings',
        opened: true,
        fields: [
            {
                title: 'Header type',
                name: 'headerType',
                type: 'select',
                options: [
                    {
                        value: 'full-width-media-bg',
                    },
                    {
                        value: 'full-width-bg',
                    },
                    {
                        value: 'bg',
                    },
                    {
                        value: 'image',
                    },
                    {
                        value: 'without-image',
                    },
                ],
            },
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
        fields: [
            {
                title: 'Overtitle',
                name: 'overtitle',
                type: 'textInput',
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
                        ],
                    },
                    {
                        type: 'section',
                        title: 'Analytics tracking',
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
        when: [
            {
                field: 'headerType',
                operator: '!=',
                value: 'without-image',
            },
        ],
        fields: [
            {
                title: 'Color HEX',
                type: 'textInput',
                name: 'background.color',
                when: [
                    {
                        field: 'headerType',
                        operator: '===',
                        value: 'full-width-media-bg',
                    },
                    {
                        operator: '||',
                    },
                    {
                        field: 'headerType',
                        operator: '===',
                        value: 'full-width-bg',
                    },
                ],
            },
        ],
    },
];

const FormContent = () => {
    const [formFields, setFormFields] = React.useState<FormField[]>(hconfig);
    const [contentConfig, setContentConfig] = React.useState({});

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
                                    blockConfig={formFields}
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
