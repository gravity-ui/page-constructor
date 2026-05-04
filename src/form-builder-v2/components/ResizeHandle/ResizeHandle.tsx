import * as React from 'react';

import {formBuilderV2Cn} from '../../utils/cn';

import './ResizeHandle.scss';

const b = formBuilderV2Cn('resize-handle');

interface ResizeHandleProps {
    value: number;
    min: number;
    max: number;
    direction: 'left' | 'right';
    onChange: (next: number) => void;
}

export const ResizeHandle = ({value, min, max, direction, onChange}: ResizeHandleProps) => {
    const [dragging, setDragging] = React.useState(false);
    const onChangeRef = React.useRef(onChange);
    onChangeRef.current = onChange;

    const cleanupRef = React.useRef<(() => void) | null>(null);
    const mountedRef = React.useRef(true);

    React.useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
            cleanupRef.current?.();
        };
    }, []);

    const onMouseDown = React.useCallback(
        (event: React.MouseEvent) => {
            event.preventDefault();
            const startX = event.clientX;
            const startValue = value;
            setDragging(true);

            let rafId: number | null = null;
            let pendingValue = startValue;
            let cleanedUp = false;

            const flush = () => {
                rafId = null;
                onChangeRef.current(pendingValue);
            };

            const handleMove = (moveEvent: MouseEvent) => {
                const deltaRaw = moveEvent.clientX - startX;
                const delta = direction === 'left' ? deltaRaw : -deltaRaw;
                pendingValue = Math.max(min, Math.min(max, startValue + delta));
                if (rafId === null) {
                    rafId = requestAnimationFrame(flush);
                }
            };

            const cleanup = () => {
                if (cleanedUp) return;
                cleanedUp = true;
                if (rafId !== null) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
                document.removeEventListener('mousemove', handleMove);
                document.removeEventListener('mouseup', handleUp);
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
                cleanupRef.current = null;
            };

            const handleUp = () => {
                if (rafId !== null) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                    onChangeRef.current(pendingValue);
                }
                if (mountedRef.current) {
                    setDragging(false);
                }
                cleanup();
            };

            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';

            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleUp);

            cleanupRef.current = cleanup;
        },
        [direction, max, min, value],
    );

    const onKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            const STEP = event.shiftKey ? 32 : 8;
            const sign = direction === 'left' ? 1 : -1;
            let next: number | null = null;
            switch (event.key) {
                case 'ArrowLeft':
                    next = value + sign * -STEP;
                    break;
                case 'ArrowRight':
                    next = value + sign * STEP;
                    break;
                case 'Home':
                    next = direction === 'left' ? min : max;
                    break;
                case 'End':
                    next = direction === 'left' ? max : min;
                    break;
                default:
                    return;
            }
            event.preventDefault();
            onChangeRef.current(Math.max(min, Math.min(max, next)));
        },
        [direction, max, min, value],
    );

    return (
        <div
            className={b({dragging})}
            onMouseDown={onMouseDown}
            onKeyDown={onKeyDown}
            role="slider"
            aria-orientation="vertical"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-label={direction === 'left' ? 'Resize palette' : 'Resize inspector'}
            tabIndex={0}
        />
    );
};
