import * as React from 'react';

import {PageConstructorExtension} from '../../../../containers/PageConstructor/PageConstructor';
import {BlockWrapperDataProps} from '../../../../models';
import {generateDefaultSchema} from '../../../../gravity-blocks/schema';
import EditBlock from '../../../components/EditBlock/EditBlock';
import {ErrorBoundary} from '../../../components/ErrorBoundary/ErrorBoundary';
import {NotFoundBlock} from '../../../components/NotFoundBlock/NotFoundBlock';
import {useCodeValidator} from '../../../hooks/useCodeValidator';
import {useMainState} from '../../../store/main';
import {useSettingsState} from '../../../store/settings';
import {EditModeItem, EditorProps, ViewModeItem} from '../../../types';
import {checkIsMobile, getBlockId} from '../../../utils';

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
    const isViewEditMode = editMode === EditModeItem.View;
    const isFormEditMode = editMode === EditModeItem.Form;
    const isDesktopViewMode = viewMode === ViewModeItem.Desktop;
    const isCodeOnlyMode = codeFullscreeModeOn && isCodeEditMode;

    const transformedContent = React.useMemo(
        () => (transformContent ? transformContent(content, {viewMode, editMode}) : content),
        [content, transformContent, viewMode, editMode],
    );
    const schema = React.useMemo(() => generateDefaultSchema(customSchema), [customSchema]);
    const codeValidator = useCodeValidator(schema);

    const outgoingProps = React.useMemo(() => {
        const userExtensions = rest.extensions ?? [];

        if (isCodeEditMode || isViewEditMode) {
            return {
                content: transformedContent,
                custom: rest.custom,
                extensions: userExtensions,
                viewMode,
            };
        }

        const editorExtensions: PageConstructorExtension[] = [
            {
                name: 'Editor Not Found Block',
                id: '@gravity-ui/page-constructor/editor-not-found',
                settings: {
                    blockWrapper: ({
                        children,
                        type,
                    }: BlockWrapperDataProps & React.PropsWithChildren) => (
                        <NotFoundBlock type={type}>{children}</NotFoundBlock>
                    ),
                },
            },
            {
                name: 'Editor Edit Block',
                id: '@gravity-ui/page-constructor/editor-edit-block',
                settings: {
                    blockWrapper: (props: BlockWrapperDataProps & React.PropsWithChildren) => (
                        <EditBlock {...injectEditBlockProps(props)} />
                    ),
                },
            },
            {
                name: 'Editor Error Boundary',
                id: '@gravity-ui/page-constructor/editor-error-boundary',
                settings: {
                    blockWrapper: (props: BlockWrapperDataProps & React.PropsWithChildren) => (
                        <ErrorBoundary
                            {...props}
                            key={`${getBlockId(props)}-${errorBoundaryState}`}
                        />
                    ),
                },
            },
        ];

        return {
            content: transformedContent,
            custom: rest.custom,
            extensions: [...userExtensions, ...editorExtensions],
            viewMode,
        };
    }, [
        injectEditBlockProps,
        errorBoundaryState,
        viewMode,
        transformedContent,
        rest.custom,
        rest.extensions,
        isCodeEditMode,
        isViewEditMode,
    ]);

    const context = React.useMemo(
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

    React.useEffect(() => {
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
        isFormEditMode,
    };
};
