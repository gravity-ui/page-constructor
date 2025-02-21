import React, {useCallback} from 'react';

import {PageContent} from '../../../models';
import {block} from '../../../utils';
import BigOverlay from '../../components/BigOverlay/BigOverlay';
import MiddleScreen from '../../components/MiddleScreen/MiddleScreen';
import {Panels} from '../../components/Panels/Panels';
import {Sidebar} from '../../components/Sidebar/Sidebar';
import StoreViewer from '../../components/StoreViewer/StoreViewer';
import {MainEditorStoreProvider} from '../../context/editorStore';
import {IframeProvider} from '../../context/iframeContext';
import useMainEditorInitialize from '../../hooks/useMainEditorInitialize';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';

import './Editor.scss';

const b = block('editor');

interface EditorViewProps {
    onUpdate?: (pageContent: PageContent) => void;
    initialUrl: string;
    disableUrlField?: boolean;
}

const EditorView = (_props: EditorViewProps) => {
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

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className={b()} onMouseUp={onMouseUp}>
            <div className={b('body')}>
                <Panels
                    left={<Sidebar position={'left'} />}
                    right={<Sidebar position={'right'} startMenu="block-config" />}
                    middle={<MiddleScreen />}
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
