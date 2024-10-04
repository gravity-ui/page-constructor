import React, {useCallback} from 'react';

import {Grip} from '@gravity-ui/icons';
import {Panel, PanelGroup, PanelResizeHandle} from 'react-resizable-panels';

import {ActionTypes} from '../../../common/types';
import {PageContent} from '../../../models';
import {block} from '../../../utils';
import BigOverlay from '../../components/BigOverlay/BigOverlay';
import MiddleScreen from '../../components/MiddleScreen/MiddleScreen';
import {Sidebar} from '../../components/Sidebar/Sidebar';
import {ContentConfigProvider} from '../../context/contentConfig';
import {EditorProvider, useEditorStore} from '../../context/editorContext';
import {IframeProvider} from '../../context/iframeContext';
import {PostMessageProvider} from '../../context/messagesContext';
import {useMessageSender} from '../../context/messagesContext/hooks/useMessageSender';

import useAdminInitialize from './hooks/useAdminInitialize';

import './Editor.scss';

const b = block('editor');

interface EditorViewProps {
    content: PageContent;
    onUpdate?: (pageContent: PageContent) => void;
    initialUrl: string;
    disableUrlField?: boolean;
}

const EditorView = (_props: EditorViewProps) => {
    const {manipulateOverlayMode} = useEditorStore();
    const sendMessage = useMessageSender();

    useAdminInitialize();

    // Disable insert mode on any MouseUp event
    // Maybe should be attached to body
    const onMouseUp = useCallback(
        (e: React.MouseEvent) => {
            if (manipulateOverlayMode === 'insert') {
                e.preventDefault();
                sendMessage({type: ActionTypes.InsertModeDisable, payload: undefined});
            }
            if (manipulateOverlayMode === 'reorder') {
                e.preventDefault();
                sendMessage({type: ActionTypes.ReorderModeDisable, payload: undefined});
            }
        },
        [manipulateOverlayMode, sendMessage],
    );

    const onMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (manipulateOverlayMode) {
                sendMessage({
                    type: ActionTypes.OverlayModeOnMove,
                    payload: {cursor: {x: e.clientX, y: e.clientY}},
                });
            }
        },
        [manipulateOverlayMode, sendMessage],
    );

    return (
        <div className={b()} onMouseUp={onMouseUp} onMouseMove={onMouseMove}>
            <div className={b('body')}>
                <PanelGroup
                    className={b('panel')}
                    autoSaveId="page-constructor-editor"
                    direction="horizontal"
                >
                    <Panel collapsible defaultSize={25} minSize={15}>
                        <Sidebar position={'left'} />
                    </Panel>
                    <PanelResizeHandle className={b('draggable')}>
                        <Grip className={b('grip')} />
                    </PanelResizeHandle>
                    <Panel minSize={20}>
                        <MiddleScreen />
                    </Panel>
                    <PanelResizeHandle className={b('draggable')}>
                        <Grip className={b('grip')} />
                    </PanelResizeHandle>
                    <Panel collapsible minSize={15} defaultSize={25}>
                        <Sidebar position={'right'} startMenu="block-config" />
                    </Panel>
                </PanelGroup>
            </div>
            <BigOverlay className={b('overlay')} />
        </div>
    );
};

export const Editor = (props: EditorViewProps) => {
    return (
        <EditorProvider>
            <IframeProvider initialUrl={props.initialUrl} disableUrlField={props.disableUrlField}>
                <ContentConfigProvider onUpdate={props.onUpdate} content={props.content}>
                    <PostMessageProvider>
                        <EditorView {...props} />
                    </PostMessageProvider>
                </ContentConfigProvider>
            </IframeProvider>
        </EditorProvider>
    );
};
