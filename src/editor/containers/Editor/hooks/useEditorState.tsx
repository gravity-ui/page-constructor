import React, {useEffect, useMemo} from 'react';

import {BlockDecorationProps} from '../../../../models';
import {generateDefaultSchema} from '../../../../schema';
import EditBlock from '../../../components/EditBlock/EditBlock';
import {ErrorBoundary} from '../../../components/ErrorBoundary/ErrorBoundary';
import {NotFoundBlock} from '../../../components/NotFoundBlock/NotFoundBlock';
import {useCodeValidator} from '../../../hooks/useCodeValidator';
import {useMainState} from '../../../store/main';
import {useSettingsState} from '../../../store/settings';
import {EditModeItem, EditorProps, ViewModeItem} from '../../../types';
import {addCustomDecorator, checkIsMobile, getBlockId} from '../../../utils';

import {useCode} from './useCode';

// Editor business logic
export const useEditorState = ({
    customSchema,
    onChange,
    providerProps,
    transformContent,
    deviceEmulationSettings,
    theme: editorTheme,
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
        editMode,
        onEditModeUpdate,
        theme: constructorTheme,
        onViewModeUpdate,
        onThemeUpdate,
        codeFullscreeModeOn,
        onCodeFullscreeModeOnUpdate,
    } = useSettingsState();

    const isCodeEditMode = editMode === EditModeItem.Code;
    const isDesktopViewMode = viewMode === ViewModeItem.Desktop;
    const isCodeOnlyMode = codeFullscreeModeOn && isCodeEditMode;

    const transformedContent = useMemo(
        () => (transformContent ? transformContent(content, {viewMode}) : content),
        [content, transformContent, viewMode],
    );
    const schema = useMemo(() => generateDefaultSchema(customSchema), [customSchema]);
    const codeValidator = useCodeValidator(schema);

    const outgoingProps = useMemo(() => {
        const custom = isCodeEditMode
            ? rest.custom
            : addCustomDecorator(
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
              );

        return {
            content: transformedContent,
            custom,
            viewMode,
        };
    }, [
        injectEditBlockProps,
        errorBoundaryState,
        viewMode,
        transformedContent,
        rest.custom,
        isCodeEditMode,
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
                theme: constructorTheme,
            },
            deviceEmulationSettings,
            theme: editorTheme,
        }),
        [
            providerProps,
            rest.custom,
            viewMode,
            transformedContent,
            deviceEmulationSettings,
            constructorTheme,
            editorTheme,
        ],
    );

    useEffect(() => {
        onChange?.(content);
    }, [content, onChange]);

    const code = useCode({isCodeEditMode, content, codeFullscreeModeOn});

    return {
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
    };
};
