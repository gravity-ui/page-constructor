import React, {ElementType, useCallback} from 'react';

import {Content} from '../../../src/models';
import BigOverlay from '../../components/BigOverlay/BigOverlay';
import MiddleScreen from '../../components/MiddleScreen/MiddleScreen';
import {Panels} from '../../components/Panels/Panels';
import {Sidebar} from '../../components/Sidebar/Sidebar';
import StoreViewer from '../../components/StoreViewer/StoreViewer';
import {MainEditorStoreProvider} from '../../context/editorStore';
import {IframeProvider} from '../../context/iframeContext';
import {useEditorTabs} from '../../hooks/useEditorTabs';
import useMainEditorInitialize from '../../hooks/useMainEditorInitialize';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {editorCn} from '../../utils/cn';

import './Editor.scss';

const b = editorCn('editor');

interface SidebarTabComponent {
    id: string;
    title: string;
    component: ElementType;
}
interface EditorViewProps {
    onUpdate?: (pageContent: Content) => void;
    initialUrl: string;
    disableUrlField?: boolean;
    componentsConfig?: {
        middleTop?: ElementType;
        leftTop?: ElementType[];
        rightTop?: ElementType[];
        leftTabs?: SidebarTabComponent[];
        rightTabs?: SidebarTabComponent[];
    };
}

const EditorView = ({componentsConfig = {}}: EditorViewProps) => {
    const store = useMainEditorStore();
    const {manipulateOverlayMode, disableMode} = store;

    useMainEditorInitialize();

    // Disable insert mode on any MouseUp event
    // Maybe should be attached to body
    const onMouseUp = useCallback(
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
                    left={<Sidebar tabs={left} />}
                    right={
                        <Sidebar
                            tabs={right}
                            top={componentsConfig.rightTop}
                            defaultTab="block-config"
                        />
                    }
                    middle={<MiddleScreen CustomTop={componentsConfig.middleTop} />}
                />
            </div>
            <BigOverlay className={b('overlay')} />
            <StoreViewer className={b('debug-store')} store={store} />
        </div>
    );
};

export const Editor = (props: EditorViewProps) => {
    return (
        <IframeProvider initialUrl={props.initialUrl} disableUrlField={props.disableUrlField}>
            <MainEditorStoreProvider>
                <EditorView {...props} />
            </MainEditorStoreProvider>
        </IframeProvider>
    );
};
