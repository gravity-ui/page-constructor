import React, {useContext, useState} from 'react';

import {Stop} from '@gravity-ui/icons';

import {
    ActionTypes,
    InsertModeDisableAction,
    OverlayModeOnMoveAction,
    ReorderModeDisableAction,
} from '../../../common/types';
import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import {IframeContext, useIframeStore} from '../../context/iframeContext';
import {useMessageObserver} from '../../context/messagesContext';

import './BigOverlay.scss';

const b = block('big-overlay');

interface BigOverlayProps extends ClassNameProps {}

const BigOverlay: React.FC<BigOverlayProps> = ({className}) => {
    const {zoom} = useIframeStore();
    const {iframeElement} = useContext(IframeContext);
    const [mousePosition, setMousePosition] = useState<{x: number; y: number} | undefined>(
        undefined,
    );

    useMessageObserver<OverlayModeOnMoveAction>(
        ActionTypes.OverlayModeOnMove,
        (payload, meta) => {
            if (payload && payload.cursor) {
                const {x, y} = payload.cursor;
                const iframeRect = iframeElement?.getClientRects().item(0);
                if (iframeRect) {
                    const zoomedX = (x * zoom) / 100;
                    const zoomedY = (y * zoom) / 100;
                    const newX = meta.source === 'editor' ? x : zoomedX + iframeRect.x;
                    const newY = meta.source === 'editor' ? y : zoomedY + iframeRect.y;
                    setMousePosition({x: newX, y: newY});
                }
            }
        },
        [iframeElement, zoom],
    );

    useMessageObserver<InsertModeDisableAction>(ActionTypes.InsertModeDisable, () => {
        setMousePosition(undefined);
    });

    useMessageObserver<ReorderModeDisableAction>(ActionTypes.ReorderModeDisable, () => {
        setMousePosition(undefined);
    });

    return (
        <div className={b(null, className)}>
            {mousePosition ? (
                <div
                    className={b('border')}
                    style={{
                        top: mousePosition.y,
                        left: mousePosition.x,
                    }}
                >
                    <Stop height={20} width={20} />
                </div>
            ) : null}
        </div>
    );
};

export default BigOverlay;
