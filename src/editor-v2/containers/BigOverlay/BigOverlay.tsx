import * as React from 'react';

import {Stop} from '@gravity-ui/icons';

import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {editorCn} from '../../utils/cn';

import './BigOverlay.scss';

const b = editorCn('big-overlay');

const BigOverlay = ({className}: {className?: string}) => {
    const {manipulateOverlayMode} = useMainEditorStore();
    const [mousePosition, setMousePosition] = React.useState<{x: number; y: number} | undefined>(
        undefined,
    );
    const overlayRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const onMouseMove = (event: MouseEvent) => {
            const rect = overlayRef.current?.getBoundingClientRect();
            setMousePosition({
                x: event.clientX - (rect?.left ?? 0),
                y: event.clientY - (rect?.top ?? 0),
            });
        };

        const onMouseUp = () => {
            setMousePosition(undefined);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mousedown', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mousedown', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    return (
        <div ref={overlayRef} className={b(null, className)}>
            {mousePosition && manipulateOverlayMode ? (
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
