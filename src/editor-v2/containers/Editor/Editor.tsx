import * as React from 'react';

import {usePostMessageAPIListener} from '../../../common/postMessage';
import {PageContent} from '../../../models';
import {Panels} from '../../components/Panels/Panels';
import {Sidebar} from '../../components/Sidebar/Sidebar';
import BigOverlay from '../../containers/BigOverlay/BigOverlay';
import MiddleScreen from '../../containers/MiddleScreen/MiddleScreen';
import {MainEditorStoreProvider} from '../../context/editorStore';
import {IframeProvider} from '../../context/iframeContext';
import {useEditorTabs} from '../../hooks/useEditorTabs';
import useMainEditorInitialize from '../../hooks/useMainEditorInitialize';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {editorCn} from '../../utils/cn';
import Source from '../Source/Source';
import ViewSwitches from '../ViewSwitches/ViewSwitches';

import './Editor.scss';

const b = editorCn('editor');

interface SidebarTabComponent {
    id: string;
    title: string;
    component: React.ElementType;
}

interface ComponentsConfig {
    middleTop?: React.ElementType;
    leftTop?: React.ElementType[];
    rightTop?: React.ElementType[];
    leftTabs?: SidebarTabComponent[];
    rightTabs?: SidebarTabComponent[];
}

export interface EditorProviderProps {
    initialUrl: string;
    disableUrlField?: boolean;
    children: React.ReactNode;
}

export interface EditorViewProps {
    onUpdate?: (pageContent: PageContent) => void;
    initialContent?: PageContent;
    componentsConfig?: ComponentsConfig;
}

type EditorProps = Omit<EditorProviderProps, 'children'> & EditorViewProps;

const EditorViewInternal = ({componentsConfig = {}, initialContent}: EditorViewProps) => {
    const store = useMainEditorStore();
    const {manipulateOverlayMode, disableMode, undo, redo} = store;

    useMainEditorInitialize(initialContent);

    usePostMessageAPIListener(
        'ON_EDITOR_UNDO',
        () => {
            undo();
        },
        [undo],
    );
    usePostMessageAPIListener(
        'ON_EDITOR_REDO',
        () => {
            redo();
        },
        [redo],
    );

    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (!(e.metaKey || e.ctrlKey)) {
                return;
            }

            if (e.key.toLowerCase() !== 'z') {
                return;
            }

            const target = e.target as HTMLElement | null;
            if (target?.closest('input, textarea, select, [contenteditable="true"]')) {
                return;
            }

            e.preventDefault();

            if (e.shiftKey) {
                redo();
            } else {
                undo();
            }
        };

        window.addEventListener('keydown', onKeyDown, true);

        return () => window.removeEventListener('keydown', onKeyDown, true);
    }, [redo, undo]);

    // Disable insert mode on any MouseUp event
    // Maybe should be attached to body
    const onMouseUp = React.useCallback(
        (e: React.MouseEvent) => {
            if (manipulateOverlayMode) {
                e.preventDefault();
                disableMode();
            }
        },
        [disableMode, manipulateOverlayMode],
    );
    const {left, right} = useEditorTabs(componentsConfig);

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className={b()} onMouseUp={onMouseUp}>
            <div className={b('body')}>
                <Panels
                    left={<Sidebar tabs={left} top={componentsConfig.leftTop} />}
                    right={
                        <Sidebar
                            tabs={right}
                            top={[...(componentsConfig.rightTop || []), Source, ViewSwitches]}
                            defaultTab="block-config"
                        />
                    }
                    middle={<MiddleScreen CustomTop={componentsConfig.middleTop} />}
                />
            </div>
            <BigOverlay className={b('overlay')} />
        </div>
    );
};

export const EditorProvider = ({initialUrl, disableUrlField, children}: EditorProviderProps) => {
    return (
        <IframeProvider initialUrl={initialUrl} disableUrlField={disableUrlField}>
            <MainEditorStoreProvider>{children}</MainEditorStoreProvider>
        </IframeProvider>
    );
};

export const EditorView = (props: EditorViewProps) => <EditorViewInternal {...props} />;

export const Editor = (props: EditorProps) => {
    return (
        <EditorProvider initialUrl={props.initialUrl} disableUrlField={props.disableUrlField}>
            <EditorView {...props} />
        </EditorProvider>
    );
};
