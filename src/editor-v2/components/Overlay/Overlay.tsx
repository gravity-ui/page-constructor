import React, {useCallback, useState} from 'react';

import {Copy, Grip, TrashBin} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';

import {usePostMessageAPIListener} from '../../../common/postMessage';
import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';

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
    const {
        height,
        selectedBlock,
        setSelectedBlock,
        deleteBlock,
        duplicateBlock,
        manipulateOverlayMode,
        enableReorderMode,
    } = useMainEditorStore();
    const [insertLineBox, setInsertLineBox] = useState<InsertLineProps | undefined>(undefined);
    const [hoverBorders, setHoverBorders] = useState<DOMRect | null>(null);
    const [blockBorders, setBlockBorders] = useState<DOMRect | null>(null);

    const margin = 0;

    usePostMessageAPIListener('ON_HOVER_BLOCK', ({rect, position}) => {
        setHoverBorders(rect || null);
        if (rect && position) {
            setInsertLineBox({
                left: rect.x,
                top: rect.y,
                height: rect.height,
                width: rect.width,
                position: position,
            });
        }
    });

    usePostMessageAPIListener('ON_CLICK_BLOCK', ({rect, path}) => {
        setSelectedBlock(path);
        setBlockBorders(rect || null);
    });

    usePostMessageAPIListener('ON_RESIZE_BLOCK', ({rect}) => {
        setBlockBorders(rect || null);
    });

    const onMouseDown = useCallback(() => {
        if (selectedBlock) {
            enableReorderMode(selectedBlock);
        }
    }, [enableReorderMode, selectedBlock]);

    return (
        <div className={b(null, className)} style={{height: `${height}px`}}>
            {blockBorders ? (
                <div
                    className={b('border')}
                    style={{
                        top: blockBorders.top - margin,
                        left: blockBorders.left - margin,
                        width: blockBorders.width + margin * 2,
                        height: blockBorders.height + margin * 2,
                    }}
                >
                    <div className={b('actions')}>
                        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
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
                            onClick={() => selectedBlock && deleteBlock(selectedBlock)}
                        >
                            <Icon data={TrashBin} size={18} />
                        </Button>
                        <Button
                            pin={'clear-round'}
                            className={b('action-button')}
                            size={'m'}
                            view={'action'}
                            onClick={() => selectedBlock && duplicateBlock(selectedBlock)}
                        >
                            <Icon data={Copy} size={18} />
                        </Button>
                    </div>
                </div>
            ) : null}
            {hoverBorders ? (
                <div
                    className={b('border', {hover: true})}
                    style={{
                        top: hoverBorders.top - margin,
                        left: hoverBorders.left - margin,
                        width: hoverBorders.width + margin * 2,
                        height: hoverBorders.height + margin * 2,
                    }}
                ></div>
            ) : null}
            {manipulateOverlayMode && hoverBorders && insertLineBox ? (
                <div
                    className={b('line', {
                        position: insertLineBox.position,
                    })}
                    style={{
                        top: hoverBorders.top,
                        left: hoverBorders.left,
                        width: hoverBorders.width,
                        height: hoverBorders.height,
                    }}
                />
            ) : null}
        </div>
    );
};

export default Overlay;
