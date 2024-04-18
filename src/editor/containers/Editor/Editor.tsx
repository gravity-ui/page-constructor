import React from 'react';

import {PageConstructor, PageConstructorProvider} from '../../../containers/PageConstructor';
import {block} from '../../../utils';
import AddBlock from '../../components/AddBlock/AddBlock';
import {CodeEditor} from '../../components/CodeEditor/CodeEditor';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import {ErrorBoundary} from '../../components/ErrorBoundary/ErrorBoundary';
import Layout from '../../components/Layout/Layout';
import {PageSettings} from '../../components/PageSettings/PageSettings';
import {EditorContext} from '../../context';
import {EditorProps} from '../../types';
import {Form} from '../Form/Form';

import {useEditorState} from './hooks/useEditorState';

import './Editor.scss';

const b = block('editor');

export const Editor = (props: EditorProps) => {
    const {providerProps} = props;

    const {
        context,
        viewMode,
        editMode,
        constructorTheme,
        onThemeUpdate,
        onViewModeUpdate,
        onEditModeUpdate,
        isCodeEditMode,
        isDesktopViewMode,
        content,
        schema,
        onContentUpdate,
        code,
        codeValidator,
        codeFullscreeModeOn,
        onCodeFullscreeModeOnUpdate,
        activeBlockIndex,
        onSelect,
        isCodeOnlyMode,
        errorBoundaryState,
        outgoingProps,
        onAdd,
    } = useEditorState(props);

    return (
        <EditorContext.Provider value={context}>
            <ControlPanel
                viewMode={viewMode}
                onViewModeChange={onViewModeUpdate}
                editMode={editMode}
                onEditModeChange={onEditModeUpdate}
                theme={constructorTheme}
                className={b('panel')}
                onThemeChange={onThemeUpdate}
            />
            {!isCodeEditMode && isDesktopViewMode && (
                <PageSettings content={content} schema={schema} onChange={onContentUpdate} />
            )}
            {isCodeEditMode && (
                <CodeEditor
                    code={code}
                    onChange={onContentUpdate}
                    validator={codeValidator}
                    fullscreenModeOn={codeFullscreeModeOn}
                    onFullscreenModeOnUpdate={onCodeFullscreeModeOnUpdate}
                />
            )}
            <Layout editMode={editMode} viewMode={viewMode}>
                {!isCodeEditMode && isDesktopViewMode && (
                    <Layout.Left>
                        <Form
                            content={content}
                            onChange={onContentUpdate}
                            activeBlockIndex={activeBlockIndex}
                            schema={schema}
                            onSelect={onSelect}
                        />
                    </Layout.Left>
                )}
                {!isCodeOnlyMode && (
                    <Layout.Right>
                        <ErrorBoundary key={errorBoundaryState}>
                            <PageConstructorProvider {...providerProps} theme={constructorTheme}>
                                <PageConstructor {...outgoingProps} />
                            </PageConstructorProvider>
                        </ErrorBoundary>
                        {!isCodeEditMode && <AddBlock onAdd={onAdd} />}
                    </Layout.Right>
                )}
            </Layout>
        </EditorContext.Provider>
    );
};
