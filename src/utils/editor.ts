import * as React from 'react';

export const getCursorPositionOverElement = (
    elementRect: DOMRect,
    mouseEvent: React.MouseEvent,
) => {
    const cursorPositionY = elementRect.height - (mouseEvent.clientY - elementRect.y);
    const cursorPositionX = elementRect.width - (mouseEvent.clientX - elementRect.x);
    const cursorRatioY = elementRect.height / 2 / cursorPositionY;
    const cursorRatioX = elementRect.width / 2 / cursorPositionX;

    if (cursorRatioY > cursorRatioX) {
        if (cursorRatioY >= 1) {
            return 'bottom';
        } else {
            return 'left';
        }
    } else if (cursorRatioX >= 1) {
        return 'right';
    } else {
        return 'top';
    }
};
