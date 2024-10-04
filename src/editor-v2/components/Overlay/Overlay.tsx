import React, {useCallback, useState} from 'react';

import {Copy, Grip, TrashBin} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';

import {
    ActionTypes,
    InsertModeDisableAction,
    OverlayModeOnMoveAction,
    ReorderModeDisableAction,
} from '../../../common/types';
import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import {useContentConfigStore} from '../../context/contentConfig';
import {useEditorStore} from '../../context/editorContext';
import {useIframeStore} from '../../context/iframeContext';
import {useMessageObserver, useMessageSender} from '../../context/messagesContext';

import './Overlay.scss';

const b = block('overlay');

interface OverlayProps extends ClassNameProps {}

interface InsertLineProps {
    top: number;
    left: number;
    height: number;
    width: number;
    position: string;
}

const Overlay: React.FC<OverlayProps> = ({className}) => {
    const {selectedBlock} = useEditorStore();
    const [insertLineBox, setInsertLineBox] = useState<InsertLineProps | undefined>(undefined);
    const {height} = useIframeStore();
    const {deleteBlock, duplicateBlock} = useContentConfigStore();
    const sendMessage = useMessageSender();

    const margin = 0;

    useMessageObserver<OverlayModeOnMoveAction>(ActionTypes.OverlayModeOnMove, (payload) => {
        if (payload && payload.block) {
            const {rect, cursorPosition} = payload.block;
            setInsertLineBox({
                left: rect.x,
                top: rect.y,
                height: rect.height,
                width: rect.width,
                position: cursorPosition,
            });
        }
    });

    useMessageObserver<InsertModeDisableAction>(ActionTypes.InsertModeDisable, () => {
        setInsertLineBox(undefined);
    });

    useMessageObserver<ReorderModeDisableAction>(ActionTypes.ReorderModeDisable, () => {
        setInsertLineBox(undefined);
    });

    const onMouseDown = useCallback(() => {
        if (selectedBlock) {
            sendMessage({
                type: ActionTypes.ReorderModeEnable,
                payload: {path: selectedBlock.path},
            });
        }
    }, [selectedBlock, sendMessage]);

    return (
        <div className={b(null, className)} style={{height: `${height}px`}}>
            {selectedBlock ? (
                <div
                    className={b('border')}
                    style={{
                        top: selectedBlock.rect.top - margin,
                        left: selectedBlock.rect.left - margin,
                        width: selectedBlock.rect.width + margin * 2,
                        height: selectedBlock.rect.height + margin * 2,
                    }}
                >
                    <div className={b('actions')}>
                        <div onMouseDown={onMouseDown}>
                            <Button
                                pin={'round-clear'}
                                className={`${b('action-button', {grip: true})}`}
                                size={'m'}
                                view={'action'}
                            >
                                <Icon data={Grip} size={18} />
                            </Button>
                        </div>
                        <Button
                            pin={'clear-clear'}
                            className={b('action-button')}
                            size={'m'}
                            view={'action'}
                            onClick={() => selectedBlock && deleteBlock(selectedBlock.path)}
                        >
                            <Icon data={TrashBin} size={18} />
                        </Button>
                        <Button
                            pin={'clear-round'}
                            className={b('action-button')}
                            size={'m'}
                            view={'action'}
                            onClick={() => selectedBlock && duplicateBlock(selectedBlock.path)}
                        >
                            <Icon data={Copy} size={18} />
                        </Button>
                    </div>
                </div>
            ) : null}
            {insertLineBox ? (
                <div
                    className={b('line', {
                        position: insertLineBox.position,
                    })}
                    style={{
                        top: insertLineBox.top,
                        left: insertLineBox.left,
                        width: insertLineBox.width,
                        height: insertLineBox.height,
                    }}
                />
            ) : null}
        </div>
    );
};

export default Overlay;
