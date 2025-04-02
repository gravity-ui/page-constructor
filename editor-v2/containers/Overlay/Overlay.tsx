import {ChevronDown, ChevronUp, Copy, TrashBin} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';
import * as React from 'react';

import {usePostMessageAPIListener} from '../../../common/postMessage';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {usePostMessageEvents} from '../../hooks/usePostMessageEvents';
import {editorCn} from '../../utils/cn';

import './Overlay.scss';

const b = editorCn('overlay');

interface OverlayProps {
    className?: string;
}
interface InsertLineProps {
    top: number;
    left: number;
    height: number;
    width: number;
    position: string;
}

const Overlay = ({className}: OverlayProps) => {
    const {requestPostMessage} = usePostMessageEvents();
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

    usePostMessageAPIListener(
        'ON_UPDATE_SELECTED_BLOCK',
        ({rect, path}) => {
            if (selectedBlock && JSON.stringify(selectedBlock) === JSON.stringify(path)) {
                setBlockBorders(rect || null);
            }
        },
        [selectedBlock],
    );

    // Update blockBorders when selectedBlock changes
    React.useEffect(() => {
        if (!selectedBlock) {
            setBlockBorders(null);
        } else {
            // If a block is selected, trigger the UPDATE_SELECTED_BLOCK action to update blockBorders
            requestPostMessage('UPDATE_SELECTED_BLOCK', {path: selectedBlock});
        }
    }, [selectedBlock]);

    const handleMoveUp = () => {
        if (!selectedBlock) return;
        const destination = [...selectedBlock];
        destination[destination.length - 1] = destination[destination.length - 1] - 1;
        reorderBlock(selectedBlock, destination, 'prepend');
        setSelectedBlock(undefined);
        // blockBorders will be set to null by the useEffect hook
    };

    const handleMoveDown = () => {
        if (!selectedBlock) return;
        const destination = [...selectedBlock];
        destination[destination.length - 1] = destination[destination.length - 1] + 1;
        reorderBlock(selectedBlock, destination, 'append');
        setSelectedBlock(undefined);
        // blockBorders will be set to null by the useEffect hook
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
