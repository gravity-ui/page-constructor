import React, {useEffect, useMemo} from 'react';

import {PageConstructor, PageConstructorProvider} from '../../../containers/PageConstructor';
import {BlockDecorationProps} from '../../../models';
import {generateDefaultSchema} from '../../../schema';
import AddBlock from '../../components/AddBlock/AddBlock';
import EditBlock from '../../components/EditBlock/EditBlock';
import {ErrorBoundary} from '../../components/ErrorBoundary/ErrorBoundary';
import Layout from '../../components/Layout/Layout';
import {NotFoundBlock} from '../../components/NotFoundBlock/NotFoundBlock';
import {EditorContext} from '../../context';
import {useCodeValidator} from '../../hooks/useCodeValidator';
import {useMainState} from '../../store/main';
import {useSettingsState} from '../../store/settings';
import {EditorProps, ViewModeItem} from '../../types';
import {addCustomDecorator, checkIsMobile, getBlockId} from '../../utils';
import {Form} from '../Form/Form';

export const Editor = ({
    customSchema,
    onChange,
    providerProps,
    transformContent,
    deviceEmulationSettings,
    ...rest
}: EditorProps) => {
    const {
        content,
        activeBlockIndex,
        errorBoundaryState,
        onContentUpdate,
        onAdd,
        onSelect,
        injectEditBlockProps,
    } = useMainState(rest);
    const {
        viewMode,
        theme,
        onViewModeUpdate,
        onThemeUpdate,
        formTab,
        onFormTabUpdate,
        codeFullscreeModeOn,
        onCodeFullscreeModeOnUpdate,
    } = useSettingsState();

    const isEditingMode = viewMode === ViewModeItem.Edititng;
    const transformedContent = useMemo(
        () => (transformContent ? transformContent(content, {viewMode}) : content),
        [content, transformContent, viewMode],
    );
    const schema = useMemo(() => generateDefaultSchema(customSchema), [customSchema]);
    const codeValidator = useCodeValidator(schema);

    const outgoingProps = useMemo(() => {
        const custom = isEditingMode
            ? addCustomDecorator(
                  [
                      (props: BlockDecorationProps) => <NotFoundBlock {...props} />,
                      (props: BlockDecorationProps) => (
                          <EditBlock {...injectEditBlockProps(props)} />
                      ),
                      // need errorBoundaryState flag to reset error on content update
                      (props: BlockDecorationProps) => (
                          <ErrorBoundary
                              {...props}
                              key={`${getBlockId(props)}-${errorBoundaryState}`}
                          />
                      ),
                  ],
                  rest.custom,
              )
            : rest.custom;

        return {
            content: transformedContent,
            custom,
            viewMode,
        };
    }, [
        injectEditBlockProps,
        errorBoundaryState,
        isEditingMode,
        viewMode,
        transformedContent,
        rest.custom,
    ]);

    const context = useMemo(
        () => ({
            constructorProps: {
                content: transformedContent,
                custom: rest.custom,
            },
            providerProps: {
                ...providerProps,
                isMobile: checkIsMobile(viewMode),
                theme,
            },
            deviceEmulationSettings,
        }),
        [providerProps, rest.custom, viewMode, transformedContent, deviceEmulationSettings, theme],
    );

    useEffect(() => {
        onChange?.(content);
    }, [content, onChange]);

    return (
        <EditorContext.Provider value={context}>
            <Layout
                mode={viewMode}
                onModeChange={onViewModeUpdate}
                theme={theme}
                onThemeChange={onThemeUpdate}
            >
                {isEditingMode && (
                    <Layout.Left>
                        <Form
                            content={content}
                            onChange={onContentUpdate}
                            activeBlockIndex={activeBlockIndex}
                            activeTab={formTab}
                            codeFullscreeModeOn={codeFullscreeModeOn}
                            schema={schema}
                            codeValidator={codeValidator}
                            onActiveTabUpdate={onFormTabUpdate}
                            onCodeFullscreeModeOnUpdate={onCodeFullscreeModeOnUpdate}
                            onSelect={onSelect}
                        />
                    </Layout.Left>
                )}
                <Layout.Right>
                    <ErrorBoundary key={errorBoundaryState}>
                        <PageConstructorProvider {...providerProps} theme={theme}>
                            <PageConstructor {...outgoingProps} />
                        </PageConstructorProvider>
                    </ErrorBoundary>
                    {isEditingMode && <AddBlock onAdd={onAdd} />}
                </Layout.Right>
            </Layout>
        </EditorContext.Provider>
    );
};
