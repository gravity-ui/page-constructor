import * as React from 'react';
import {Button, Text, ThemeProvider} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import {Panel, PanelGroup, PanelResizeHandle} from 'react-resizable-panels';
import {useNavigate} from 'react-router';
import DynamicForm from '../../../../src/editor-v2/components/DynamicForm/DynamicForm';
import {FormOutput} from './components/FormOutput/FormOutput';
import {FormBuilder, FormProvider, useFormContext} from '../../../../src/form-generator';

import './form.scss';

const b = block('form');

const FormContent = () => {
    const {formFields, resetForm} = useFormContext();
    const [contentConfig, setContentConfig] = React.useState({});

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
                                    <FormBuilder formFields={formFields} />
                                </div>
                            </div>
                        </Panel>

                        {/* Resize Handle */}
                        <PanelResizeHandle className={b('resize-handle', {horizontal: true})} />

                        {/* Form Output Panel */}
                        <Panel minSize={20} defaultSize={20}>
                            <div className={b('panel-content')}>
                                <Button onClick={() => navigate('/')}>Go to Editor</Button>
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
            <FormProvider>
                <FormContent />
            </FormProvider>
        </ThemeProvider>
    );
}
