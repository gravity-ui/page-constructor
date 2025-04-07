import {ChevronDown, ChevronUp, Copy, TrashBin} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';
import * as React from 'react';

import {usePostMessageAPIListener} from '../../../../common/postMessage';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {editorCn} from '../../utils/cn';

import './Overlay.scss';

const b = editorCn('overlay');

interface OverlayProps {
    className?: string;
    canvasElement?: HTMLDivElement | null;
}
interface InsertLineProps {
    top: number;
    left: number;
    height: number;
    width: number;
    position: string;
}

const Overlay = ({className, canvasElement}: OverlayProps) => {
    const {
        height,
        selectedBlock,
        setSelectedBlock,
        deleteBlock,
        duplicateBlock,
        manipulateOverlayMode,
        reorderBlock,
    } = useMainEditorStore();
    const [insertLineBox, setInsertLineBox] = React.useState<InsertLineProps | undefined>(
        undefined,
    );
    const [hoverBorders, setHoverBorders] = React.useState<DOMRect | null>(null);
    const [blockBorders, setBlockBorders] = React.useState<DOMRect | null>(null);

    // Listen for updates to the selected block's position
    usePostMessageAPIListener('ON_UPDATE_BLOCK_SELECTION', ({rect}) => {
        setBlockBorders(rect || null);
    });

    // Update blockBorders when selectedBlock changes
    React.useEffect(() => {
        if (!selectedBlock) {
            setBlockBorders(null);
        }
    }, [selectedBlock]);

    // Auto scroll to the selected block when blockBorders changes
    React.useEffect(() => {
        if (blockBorders && canvasElement) {
            // Calculate the scroll position to center the block in the viewport
            const canvasHeight = canvasElement.clientHeight;
            const scrollPosition = blockBorders.top - canvasHeight / 2 + blockBorders.height / 2;

            // Scroll the canvas element to the calculated position with smooth behavior
            canvasElement.scrollTo({
                top: Math.max(0, scrollPosition),
                behavior: 'smooth',
            });
        }
    }, [blockBorders, canvasElement]);

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

    usePostMessageAPIListener('ON_CLICK_BLOCK', ({path}) => {
        setSelectedBlock(path);
    });

    const handleMoveUp = () => {
        if (!selectedBlock) return;
        const destination = [...selectedBlock];
        destination[destination.length - 1] = destination[destination.length - 1] - 1;
        reorderBlock(selectedBlock, destination, 'prepend');
    };

    const handleMoveDown = () => {
        if (!selectedBlock) return;
        const destination = [...selectedBlock];
        destination[destination.length - 1] = destination[destination.length - 1] + 1;
        reorderBlock(selectedBlock, destination, 'append');
    };

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
                        <Button view="flat" size={'m'} onClick={handleMoveUp}>
                            <Icon data={ChevronUp} size={18} />
                        </Button>
                        <Button
                            pin={'round-clear'}
                            className={b('action-button')}
                            size={'m'}
                            view={'action'}
                            onClick={() => selectedBlock && duplicateBlock(selectedBlock)}
                        >
                            <Icon data={Copy} size={18} />
                        </Button>
                        <Button
                            pin={'clear-round'}
                            className={b('action-button')}
                            size={'m'}
                            view={'action'}
                            onClick={() => selectedBlock && deleteBlock(selectedBlock)}
                        >
                            <Icon data={TrashBin} size={18} />
                        </Button>
                        <Button view="flat" size={'m'} onClick={handleMoveDown}>
                            <Icon data={ChevronDown} size={18} />
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
