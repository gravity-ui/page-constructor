import {ArrowLeftFromLine, ArrowRightFromLine, Grip} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';
import React, {ReactElement, useRef} from 'react';
import {ImperativePanelHandle, Panel, PanelGroup, PanelResizeHandle} from 'react-resizable-panels';

import {editorCn} from '../../utils/cn';

import './Panels.scss';

const b = editorCn('panels');

interface PanelsProps {
    left: ReactElement;
    middle: ReactElement;
    right: ReactElement;
}

export const Panels = ({left, right, middle}: PanelsProps) => {
    const leftPanel = useRef<ImperativePanelHandle>(null);
    const rightPanel = useRef<ImperativePanelHandle>(null);

    const expandPanel = (reference: React.RefObject<ImperativePanelHandle>) => {
        const panel = reference.current;
        if (panel) {
            panel.expand();
        }
    };

    const isCollapsed = {
        left: leftPanel.current?.isCollapsed() || false,
        right: rightPanel.current?.isCollapsed() || false,
    };

    return (
        <PanelGroup
            className={b('panel')}
            autoSaveId="page-constructor-editor"
            direction="horizontal"
        >
            <Panel ref={leftPanel} collapsible defaultSize={25} minSize={15}>
                {left}
            </Panel>
            <PanelResizeHandle className={b('draggable')}>
                <Grip className={b('grip')} />
                {isCollapsed.left && (
                    <div className={b('button-wrap', {left: true})}>
                        <Button
                            className={b('button')}
                            view="action"
                            onClick={() => expandPanel(leftPanel)}
                        >
                            <Icon data={ArrowRightFromLine} />
                        </Button>
                    </div>
                )}
            </PanelResizeHandle>
            <Panel minSize={20}>{middle}</Panel>
            <PanelResizeHandle className={b('draggable')}>
                <Grip className={b('grip')} />
                {isCollapsed.right && (
                    <div className={b('button-wrap', {right: true})}>
                        <Button
                            className={b('button')}
                            view="action"
                            onClick={() => expandPanel(rightPanel)}
                        >
                            <Icon data={ArrowLeftFromLine} />
                        </Button>
                    </div>
                )}
            </PanelResizeHandle>
            <Panel ref={rightPanel} collapsible minSize={15} defaultSize={25}>
                {right}
            </Panel>
        </PanelGroup>
    );
};
