import * as React from 'react';

import {usePostMessageAPIListener} from '../../common/postMessage';
import {usePostMessageEvents} from './usePostMessageEvents';

/**
 * Hook to track selected block borders and auto-scroll to the selected block
 * @param selectedBlock The currently selected block path
 * @param canvasElement The canvas element reference that contains the iframe
 * @returns The borders of the selected block
 */
export const useSelectedBlockBorders = (
    selectedBlock: any,
    canvasElement?: HTMLDivElement | null,
) => {
    const [blockBorders, setBlockBorders] = React.useState<DOMRect | null>(null);
    const {requestPostMessage} = usePostMessageEvents();

    // Listen for updates to the selected block's position
    usePostMessageAPIListener('ON_UPDATE_SELECTED_BLOCK', ({rect}) => {
        setBlockBorders(rect || null);
    });

    // Update blockBorders when selectedBlock changes
    React.useEffect(() => {
        if (!selectedBlock) {
            setBlockBorders(null);
        } else {
            // Only request an update if we haven't already done so for this block
            requestPostMessage('UPDATE_SELECTED_BLOCK', {path: selectedBlock});
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

    return blockBorders;
};
